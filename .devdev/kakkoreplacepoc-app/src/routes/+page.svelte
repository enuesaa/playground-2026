<script lang="ts">
  type Step = {
    id: string;
    from: string;
    to: string;
  };

  let input = $state('');
  let output = $state('');
  let hasResult = $state(false);

  let steps = $state<Step[]>([
    { id: crypto.randomUUID(), from: '', to: '' }
  ]);

  function addStep() {
    steps = [...steps, { id: crypto.randomUUID(), from: '', to: '' }];
  }

  function removeStep(id: string) {
    steps = steps.filter(s => s.id !== id);
  }

  function run() {
    let result = input;
    for (const step of steps) {
      if (step.from === '') continue;
      result = result.replaceAll(step.from, step.to);
    }
    output = result;
    hasResult = true;
  }

  function downloadJson() {
    const data = {
      steps: steps.map(s => ({ method: 'replace', from: s.from, to: s.to }))
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rules.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
  }
</script>

<div class="app">
  <header>
    <span class="logo">strreplace</span>
    <span class="tagline">文字列置換ツール</span>
  </header>

  <main>
    <div class="workspace">
      <!-- Left: Input -->
      <section class="panel input-panel">
        <span class="panel-label">入力テキスト</span>
        <textarea
          bind:value={input}
          placeholder="ここにテキストを貼り付けてください..."
          spellcheck="false"
        ></textarea>
        <div class="panel-meta">{input.length} 文字</div>
      </section>

      <!-- Right: Steps -->
      <section class="panel steps-panel">
        <div class="steps-header">
          <span class="panel-label">置換ルール</span>
          <button class="btn-export" onclick={downloadJson} title="JSONでエクスポート">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            JSON
          </button>
        </div>

        <div class="steps-list">
          {#each steps as step, i (step.id)}
            <div class="step">
              <span class="step-num">{i + 1}</span>
              <div class="step-fields">
                <div class="field">
                  <span class="field-label">from</span>
                  <input
                    type="text"
                    bind:value={step.from}
                    placeholder="置換前"
                    spellcheck="false"
                  />
                </div>
                <svg class="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
                <div class="field">
                  <span class="field-label">to</span>
                  <input
                    type="text"
                    bind:value={step.to}
                    placeholder="置換後"
                    spellcheck="false"
                  />
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
          {/each}
        </div>

        <button class="btn-add" onclick={addStep}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          ルールを追加
        </button>

        <button class="btn-run" onclick={run}>
          置換を実行
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </button>
      </section>
    </div>

    <!-- Output -->
    {#if hasResult}
      <section class="output-section">
        <div class="output-header">
          <span class="panel-label">結果</span>
          <button class="btn-copy" onclick={copyOutput}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            コピー
          </button>
        </div>
        <pre class="output-text">{output}</pre>
        <div class="panel-meta">{output.length} 文字</div>
      </section>
    {/if}
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

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

  .tagline {
    font-size: 12px;
    color: #555;
  }

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

  textarea:focus {
    border-color: #3a3a3a;
  }

  textarea::placeholder {
    color: #333;
  }

  /* Steps */
  .steps-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

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
  }

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
    color: #3a3a3a;
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

  .field input::placeholder {
    color: #2e2e2e;
  }

  .arrow {
    color: #333;
    flex-shrink: 0;
  }

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

  .btn-remove:hover {
    color: #888;
  }

  .btn-add {
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
    gap: 7px;
    transition: border-color 0.15s, color 0.15s;
  }

  .btn-add:hover {
    border-color: #404040;
    color: #888;
  }

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

  .btn-run:hover {
    background: #9ef9a5;
  }

  .btn-export {
    background: none;
    border: 1px solid #2a2a2a;
    border-radius: 5px;
    color: #555;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.15s, border-color 0.15s;
  }

  .btn-export:hover {
    color: #888;
    border-color: #3a3a3a;
  }

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

  .btn-copy {
    background: none;
    border: 1px solid #2a2a2a;
    border-radius: 5px;
    color: #555;
    cursor: pointer;
    font-family: inherit;
    font-size: 12px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.15s, border-color 0.15s;
  }

  .btn-copy:hover {
    color: #888;
    border-color: #3a3a3a;
  }

  @media (max-width: 768px) {
    main {
      padding: 20px 16px;
    }

    .workspace {
      grid-template-columns: 1fr;
    }
  }
</style>