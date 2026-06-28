<script lang="ts">
  // ── Types ──────────────────────────────────────────────────────────────────
  type ReplaceAction = { method: 'replace'; from: string; to: string };

  type ReplaceStep = {
    kind: 'replace';
    id: string;
    from: string;
    to: string;
  };

  type SearchStep = {
    kind: 'search';
    id: string;
    before: string;
    after: string;
    actions: (ReplaceAction & { id: string })[];
  };

  type Step = ReplaceStep | SearchStep;

  // ── State ──────────────────────────────────────────────────────────────────
  let input = $state('');
  let output = $state('');
  let hasResult = $state(false);
  let showImport = $state(false);
  let importText = $state('');
  let importError = $state('');

  let steps = $state<Step[]>([
    { kind: 'replace', id: crypto.randomUUID(), from: '', to: '' }
  ]);

  // ── Step mutations ─────────────────────────────────────────────────────────
  function addReplaceStep() {
    steps = [...steps, { kind: 'replace', id: crypto.randomUUID(), from: '', to: '' }];
  }

  function addSearchStep() {
    steps = [...steps, {
      kind: 'search',
      id: crypto.randomUUID(),
      before: '',
      after: '',
      actions: [{ id: crypto.randomUUID(), method: 'replace', from: '', to: '' }]
    }];
  }

  function removeStep(id: string) {
    steps = steps.filter(s => s.id !== id);
  }

  function addAction(stepId: string) {
    steps = steps.map(s =>
      s.id === stepId && s.kind === 'search'
        ? { ...s, actions: [...s.actions, { id: crypto.randomUUID(), method: 'replace' as const, from: '', to: '' }] }
        : s
    );
  }

  function removeAction(stepId: string, actionId: string) {
    steps = steps.map(s =>
      s.id === stepId && s.kind === 'search'
        ? { ...s, actions: s.actions.filter(a => a.id !== actionId) }
        : s
    );
  }

  // ── Execution ──────────────────────────────────────────────────────────────
  function applyStep(text: string, step: Step): string {
    if (step.kind === 'replace') {
      if (step.from === '') return text;
      return text.replaceAll(step.from, step.to);
    }
    // search step: build regex from before/after, apply actions to matched target
    const beforeRaw = step.before.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    const afterRaw  = step.after.replace(/\\n/g, '\n').replace(/\\t/g, '\t');

    const escapePart = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    let pattern: RegExp;
    if (beforeRaw && afterRaw) {
      pattern = new RegExp(`(?<=${escapePart(beforeRaw)})(.*?)(?=${escapePart(afterRaw)})`, 'gs');
    } else if (beforeRaw) {
      pattern = new RegExp(`(?<=${escapePart(beforeRaw)})(.*?)(?=\\n|$)`, 'gm');
    } else if (afterRaw) {
      pattern = new RegExp(`(?<=^|\\n)(.*?)(?=${escapePart(afterRaw)})`, 'gm');
    } else {
      return text;
    }

    return text.replace(pattern, (match) => {
      let result = match;
      for (const action of step.actions) {
        if (action.from === '') continue;
        result = result.replaceAll(action.from, action.to);
      }
      return result;
    });
  }

  function applySteps(text: string, upTo: number): string {
    let result = text;
    for (let i = 0; i <= upTo; i++) {
      result = applyStep(result, steps[i]);
    }
    return result;
  }

  function run() {
    let result = input;
    for (const step of steps) {
      result = applyStep(result, step);
    }
    output = result;
    hasResult = true;
  }

  // ── JSON export/import ─────────────────────────────────────────────────────
  function stepsToJson() {
    const payload = steps.map(s => {
      if (s.kind === 'replace') {
        return { method: 'replace', from: s.from, to: s.to };
      }
      return {
        method: 'search',
        before: s.before,
        after: s.after,
        actions: s.actions.map(a => ({ method: a.method, from: a.from, to: a.to }))
      };
    });
    return JSON.stringify({ steps: payload }, null, 2);
  }

  function downloadJson() {
    const blob = new Blob([stepsToJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rules.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyJson() {
    navigator.clipboard.writeText(stepsToJson());
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
  }

  function openImport() {
    importText = '';
    importError = '';
    showImport = true;
  }

  function applyImport() {
    try {
      const data = JSON.parse(importText);
      if (!Array.isArray(data.steps)) throw new Error();
      steps = data.steps.map((s: any): Step => {
        if (s.method === 'search') {
          return {
            kind: 'search',
            id: crypto.randomUUID(),
            before: s.before ?? '',
            after: s.after ?? '',
            actions: (s.actions ?? []).map((a: any) => ({
              id: crypto.randomUUID(),
              method: 'replace' as const,
              from: a.from ?? '',
              to: a.to ?? ''
            }))
          };
        }
        return { kind: 'replace', id: crypto.randomUUID(), from: s.from ?? '', to: s.to ?? '' };
      });
      showImport = false;
    } catch {
      importError = '有効な rules.json を貼り付けてください';
    }
  }

  // ── Diff ───────────────────────────────────────────────────────────────────
  type DiffSpan = { type: 'same' | 'remove' | 'add'; text: string };
  type DiffLine = { before: DiffSpan[]; after: DiffSpan[] };
  type DiffModal = { title: string; lines: DiffLine[]; hasChanges: boolean } | null;
  let diffModal = $state<DiffModal>(null);

  function charDiff(a: string, b: string): { before: DiffSpan[]; after: DiffSpan[] } {
    const m = a.length, n = b.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--)
      for (let j = n - 1; j >= 0; j--)
        dp[i][j] = a[i] === b[j] ? dp[i+1][j+1] + 1 : Math.max(dp[i+1][j], dp[i][j+1]);

    const before: DiffSpan[] = [], after: DiffSpan[] = [];
    let i = 0, j = 0;
    const push = (arr: DiffSpan[], type: DiffSpan['type'], ch: string) => {
      if (arr.length && arr[arr.length-1].type === type) arr[arr.length-1].text += ch;
      else arr.push({ type, text: ch });
    };
    while (i < m || j < n) {
      if (i < m && j < n && a[i] === b[j]) {
        push(before, 'same', a[i]); push(after, 'same', b[j]); i++; j++;
      } else if (j < n && (i >= m || dp[i+1][j] >= dp[i][j+1])) {
        push(after, 'add', b[j++]);
      } else {
        push(before, 'remove', a[i++]);
      }
    }
    return { before, after };
  }

  function spansToHtml(spans: DiffSpan[]): string {
    return spans.map(s => {
      const e = s.text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      if (s.type === 'same')   return `<span class="ds">${e}</span>`;
      if (s.type === 'remove') return `<span class="dr">${e}</span>`;
      return `<span class="da">${e}</span>`;
    }).join('');
  }

  function computeDiff(before: string, after: string): { lines: DiffLine[]; hasChanges: boolean } {
    const aLines = before.split('\n'), bLines = after.split('\n');
    const len = Math.max(aLines.length, bLines.length);
    let hasChanges = false;
    const lines: DiffLine[] = [];
    for (let i = 0; i < len; i++) {
      const a = aLines[i] ?? '', b = bLines[i] ?? '';
      const { before: bSpans, after: aSpans } = charDiff(a, b);
      if (a !== b) hasChanges = true;
      lines.push({ before: bSpans, after: aSpans });
    }
    return { lines, hasChanges };
  }

  function openDiff(stepIndex: number) {
    if (!input) return;
    const before = stepIndex === 0 ? input : applySteps(input, stepIndex - 1);
    const after = applySteps(input, stepIndex);
    const { lines, hasChanges } = computeDiff(before, after);
    diffModal = { title: `step ${stepIndex + 1} — diff`, lines, hasChanges };
  }

  function openOutputDiff() {
    if (!input || !hasResult) return;
    const { lines, hasChanges } = computeDiff(input, output);
    diffModal = { title: 'result — diff', lines, hasChanges };
  }
</script>

<div class="app">
  <header>
    <span class="logo">strreplace</span>
    <span class="tagline">文字列置換ツール</span>
  </header>

  <main>
    <div class="workspace">
      <section class="panel input-panel">
        <span class="panel-label">入力テキスト</span>
        <textarea bind:value={input} placeholder="ここにテキストを貼り付けてください..." spellcheck="false"></textarea>
        <div class="panel-meta">{input.length} 文字</div>
      </section>

      <section class="panel steps-panel">
        <div class="steps-header">
          <span class="panel-label">置換ルール</span>
          <div class="header-actions">
            <button class="btn-icon" onclick={openImport}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              import
            </button>
            <button class="btn-icon" onclick={copyJson}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              copy
            </button>
            <button class="btn-icon" onclick={downloadJson}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              save
            </button>
          </div>
        </div>

        <div class="steps-list">
          {#each steps as step, i (step.id)}
            <div class="step-block">
              {#if step.kind === 'replace'}
                <div class="step">
                  <button class="step-num" onclick={() => openDiff(i)} title="diffを表示">{i + 1}</button>
                  <div class="step-fields">
                    <div class="field">
                      <span class="field-label">from</span>
                      <input type="text" bind:value={step.from} placeholder="置換前" spellcheck="false" />
                    </div>
                    <svg class="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                    <div class="field">
                      <span class="field-label">to</span>
                      <input type="text" bind:value={step.to} placeholder="置換後" spellcheck="false" />
                    </div>
                  </div>
                  {#if steps.length > 1}
                    <button class="btn-remove" onclick={() => removeStep(step.id)} aria-label="ルールを削除">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  {/if}
                </div>

              {:else}
                <!-- search step -->
                <div class="step search-step">
                  <button class="step-num" onclick={() => openDiff(i)} title="diffを表示">{i + 1}</button>
                  <div class="search-block">
                    <div class="search-context">
                      <span class="search-label">search</span>
                      <div class="search-fields">
                        <div class="field">
                          <span class="field-label">after</span>
                          <input type="text" bind:value={step.after} placeholder='\n' spellcheck="false" />
                        </div>
                        <div class="field">
                          <span class="field-label">before</span>
                          <input type="text" bind:value={step.before} placeholder='\n' spellcheck="false" />
                        </div>
                      </div>
                    </div>
                    <div class="actions-list">
                      {#each step.actions as action (action.id)}
                        <div class="action-row">
                          <svg class="action-indent" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                          <div class="step-fields">
                            <div class="field">
                              <span class="field-label">from</span>
                              <input type="text" bind:value={action.from} placeholder="置換前" spellcheck="false" />
                            </div>
                            <svg class="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                              <line x1="5" y1="12" x2="19" y2="12"/>
                              <polyline points="12 5 19 12 12 19"/>
                            </svg>
                            <div class="field">
                              <span class="field-label">to</span>
                              <input type="text" bind:value={action.to} placeholder="置換後" spellcheck="false" />
                            </div>
                          </div>
                          {#if step.actions.length > 1}
                            <button class="btn-remove" onclick={() => removeAction(step.id, action.id)} aria-label="アクションを削除">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                              </svg>
                            </button>
                          {/if}
                        </div>
                      {/each}
                    </div>
                  </div>
                  {#if steps.length > 1}
                    <button class="btn-remove" onclick={() => removeStep(step.id)} aria-label="ルールを削除">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  {/if}
                </div>
              {/if}
            </div>
          {/each}
        </div>

        <div class="add-buttons">
          <button class="btn-add" onclick={addReplaceStep}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            replace
          </button>
          <button class="btn-add" onclick={addSearchStep}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            search
          </button>
        </div>

        <button class="btn-run" onclick={run}>
          置換を実行
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </button>
      </section>
    </div>

    {#if hasResult}
      <section class="output-section">
        <div class="output-header">
          <span class="panel-label">結果</span>
          <div class="header-actions">
            <button class="btn-icon" onclick={openOutputDiff}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
              </svg>
              diff
            </button>
            <button class="btn-icon" onclick={copyOutput}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              コピー
            </button>
          </div>
        </div>
        <pre class="output-text">{output}</pre>
        <div class="panel-meta">{output.length} 文字</div>
      </section>
    {/if}
  </main>
</div>

<!-- Diff modal -->
{#if diffModal}
  <div class="overlay" onclick={() => diffModal = null}>
    <div class="modal diff-modal" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <span class="panel-label">{diffModal.title}</span>
        <button class="btn-close" onclick={() => diffModal = null} aria-label="閉じる">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      {#if !diffModal.hasChanges}
        <p class="diff-empty">このステップによる変更はありません</p>
      {:else}
        <div class="diff-view">
          <div class="diff-col-header">
            <span>before</span>
            <span>after</span>
          </div>
          {#each diffModal.lines as line, i}
            <div class="diff-row">
              <div class="diff-cell diff-cell-remove">
                <span class="diff-linenum">{i + 1}</span>
                <pre class="diff-pre">{@html spansToHtml(line.before)}</pre>
              </div>
              <div class="diff-cell diff-cell-add">
                <span class="diff-linenum">{i + 1}</span>
                <pre class="diff-pre">{@html spansToHtml(line.after)}</pre>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}

<!-- Import modal -->
{#if showImport}
  <div class="overlay" onclick={() => showImport = false}>
    <div class="modal" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <span class="panel-label">import rules.json</span>
        <button class="btn-close" onclick={() => showImport = false} aria-label="閉じる">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <textarea class="import-textarea" bind:value={importText} placeholder={'{\n  "steps": [\n    { "method": "replace", "from": "a", "to": "b" }\n  ]\n}'} spellcheck="false"></textarea>
      {#if importError}
        <span class="error">{importError}</span>
      {/if}
      <button class="btn-run" onclick={applyImport}>適用</button>
    </div>
  </div>
{/if}

<style>
  .app { min-height: 100vh; display: flex; flex-direction: column; }

  header {
    padding: 20px 32px;
    border-bottom: 1px solid #1e1e1e;
    display: flex;
    align-items: baseline;
    gap: 12px;
  }

  .logo {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 15px;
    font-weight: 500;
    color: #7ee787;
    letter-spacing: -0.3px;
  }

  .tagline { font-size: 12px; color: #555; }

  main {
    flex: 1;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .workspace {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: start;
  }

  .panel {
    background: #161616;
    border: 1px solid #222;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .panel-label {
    font-size: 11px;
    font-weight: 600;
    color: #ccc;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .panel-meta {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: #444;
  }

  textarea {
    background: #0f0f0f;
    border: 1px solid #242424;
    border-radius: 6px;
    color: #e8e8e8;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    line-height: 1.6;
    min-height: 280px;
    padding: 14px;
    resize: vertical;
    width: 100%;
    transition: border-color 0.15s;
    outline: none;
  }

  textarea:focus { border-color: #3a3a3a; }
  textarea::placeholder { color: #333; }

  /* Steps */
  .steps-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-actions { display: flex; gap: 6px; }

  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .step-block { display: flex; flex-direction: column; }

  .step {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .step-num {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: #3a3a3a;
    width: 16px;
    text-align: right;
    flex-shrink: 0;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.15s;
    align-self: flex-start;
    padding-top: 10px;
  }

  .step-num:hover { color: #7ee787; }

  .step-fields {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #0f0f0f;
    border: 1px solid #242424;
    border-radius: 6px;
    padding: 8px 12px;
  }

  .field {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .field-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #aaa;
    letter-spacing: 0.5px;
  }

  .field input {
    background: transparent;
    border: none;
    color: #e8e8e8;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    outline: none;
    width: 100%;
  }

  .field input::placeholder { color: #2e2e2e; }

  .arrow { color: #333; flex-shrink: 0; }

  .btn-remove {
    background: none;
    border: none;
    color: #3a3a3a;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transition: color 0.15s;
    flex-shrink: 0;
  }

  .btn-remove:hover { color: #888; }

  /* Search step */
  .search-step { align-items: flex-start; }

  .search-block {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .search-context {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #0f0f0f;
    border: 1px solid #2a2a2a;
    border-radius: 6px;
    padding: 8px 12px;
  }

  .search-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #7ee787;
    letter-spacing: 0.5px;
    flex-shrink: 0;
  }

  .search-fields {
    flex: 1;
    display: flex;
    gap: 12px;
  }

  .actions-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 4px;
  }

  .action-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .action-indent {
    color: #2a2a2a;
    flex-shrink: 0;
  }

  /* Add buttons */
  .add-buttons {
    display: flex;
    gap: 8px;
  }

  .btn-add {
    flex: 1;
    background: none;
    border: 1px dashed #2a2a2a;
    border-radius: 6px;
    color: #444;
    cursor: pointer;
    font-size: 12px;
    font-family: inherit;
    padding: 9px 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    transition: border-color 0.15s, color 0.15s;
  }

  .btn-add:hover { border-color: #404040; color: #888; }

  .btn-run {
    background: #7ee787;
    border: none;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    padding: 11px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.15s;
    margin-top: 4px;
  }

  .btn-run:hover { background: #9ef9a5; }

  .btn-icon {
    background: none;
    border: 1px solid #2a2a2a;
    border-radius: 5px;
    color: #aaa;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.15s, border-color 0.15s;
  }

  .btn-icon:hover { color: #888; border-color: #3a3a3a; }

  /* Output */
  .output-section {
    background: #161616;
    border: 1px solid #222;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .output-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .output-text {
    background: #0f0f0f;
    border: 1px solid #242424;
    border-radius: 6px;
    color: #e8e8e8;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    line-height: 1.6;
    min-height: 120px;
    padding: 14px;
    white-space: pre-wrap;
    word-break: break-all;
  }

  /* Modal */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }

  .modal {
    background: #161616;
    border: 1px solid #2a2a2a;
    border-radius: 10px;
    padding: 24px;
    width: 480px;
    max-width: calc(100vw - 40px);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .import-textarea { min-height: 200px; font-size: 12px; }

  .btn-close {
    background: none;
    border: none;
    color: #555;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    transition: color 0.15s;
  }

  .btn-close:hover { color: #aaa; }

  .error {
    font-size: 12px;
    color: #f87171;
    font-family: 'IBM Plex Mono', monospace;
  }

  /* Diff */
  .diff-modal {
    width: 800px;
    max-height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .diff-view {
    overflow-y: auto;
    border: 1px solid #242424;
    border-radius: 6px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    line-height: 1.6;
  }

  .diff-col-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #242424;
    font-size: 10px;
    color: #444;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .diff-col-header span { padding: 6px 12px; }
  .diff-col-header span:first-child { border-right: 1px solid #242424; }

  .diff-row { display: grid; grid-template-columns: 1fr 1fr; }
  .diff-row + .diff-row { border-top: 1px solid #1a1a1a; }

  .diff-cell {
    display: flex;
    gap: 10px;
    padding: 2px 12px;
    min-width: 0;
  }

  .diff-cell-remove { border-right: 1px solid #242424; background: rgba(248,81,73,0.04); }
  .diff-cell-add { background: rgba(126,231,135,0.04); }

  .diff-linenum {
    flex-shrink: 0;
    color: #333;
    user-select: none;
    min-width: 20px;
    text-align: right;
    padding-top: 1px;
  }

  .diff-pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
    color: #555;
    flex: 1;
    min-width: 0;
  }

  :global(.ds) { color: #888; }
  :global(.dr) { background: rgba(248,81,73,0.3); color: #f87171; border-radius: 2px; }
  :global(.da) { background: rgba(126,231,135,0.3); color: #7ee787; border-radius: 2px; }

  .diff-empty {
    font-size: 12px;
    color: #555;
    font-family: 'IBM Plex Mono', monospace;
    text-align: center;
    padding: 24px 0;
  }

  @media (max-width: 768px) {
    main { padding: 20px 16px; }
    .workspace { grid-template-columns: 1fr; }
  }
</style>
