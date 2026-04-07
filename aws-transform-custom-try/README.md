# AWS Transform Custom

- 言語のバージョンのアップデートとかフレームワーク移行とかに使えるらしい
- cli
- cli を実行するには aws のクレデンシャルをセットする必要あり
- リージョン制限あり
  - aws default region を us-east-1 か eu-central-1 のどちらかにする
- さわった感じ、claude code とかと一緒
  - 事前定義されているぶん楽
  - やってることは claude code と変わらない
  - 言ってしまえば kiro と同じ仕様駆動
- 文字を生成している感じがすごくする
  - claude code とかと比べて体感ちょっと時間かかる
  - ソースコードすべてをざっくりみる必要あるので

### Commands
install
```bash
curl -fsSL https://transform-cli.awsstatic.com/install.sh | bash
```

help
```bash
➜ atx --help
Usage: atx [options] [command]

ATX CLI tool

Options:
  -v, --version           Output the current version
  -t, --trust-all-tools   Trusts all tools (no tool prompts)
  -d, --do-not-learn      Opt out of allowing knowledge item extraction for any executions

➜ atx -v
Version: 1.7.0
```

こんな感じ。長いからだいぶはしょってる
```bash
$ atx

What kind of transformation would you like to create?
> migrate svelte app to next.js app router app

No existing transformations match a Svelte to Next.js migration. I'll go ahead and create a new one for you.
I'll help you create a transformation definition for migrating a Svelte application to a Next.js App Router application. This is a significant framework migration that will move you to React's ecosystem with Next.js's powerful file-based routing, server components, and built-in optimizations.
To create a thorough transformation definition, it would be useful to know:
1. What version of Svelte are you currently on (Svelte 4, Svelte 5, SvelteKit)? And which Next.js version are you targeting (e.g., 14, 15)?
2. Are there any specific patterns or libraries in your Svelte app that are critical, such as Svelte stores for state management, SvelteKit's load functions for data fetching, or specific component libraries?
If you have any migration guides, documentation, or example before/after code, feel free to share file paths and I can incorporate those. You can always add those later as well.

> svelte 5 using sveltekit. this is very simple crud app using external web api.
```

コマンドを実行するときは聞いてくる
```bash
Let me now create the plan:

🛠️  Using tool: shell (requested)
 ⋮
 ● Command: mkdir -p ~/.aws/atx/custom/aaa/artifacts
 ● Path: ~/playground-2026/aws-transform-custom-try/oldapp
 ⋮

Allow tool execution? (y)es/(n)o/(t)rust or provide feedback: y
```

全部終わるとこんな感じ

```bash
All steps complete.

## Summary

The SvelteKit Svelte 5 to Next.js App Router migration has been completed successfully across all 5 steps:

| Step | Title | Status |
|------|-------|--------|
| 1 | Initialize Next.js project structure and configuration | ✅ Success |
| 2 | Migrate API layer — convert TanStack Svelte Query to React Query | ✅ Success |
| 3 | Create root layout with QueryClientProvider and migrate Header component | ✅ Success |
| 4 | Migrate route pages — Home, Post Detail, and Edit pages | ✅ Success |
| 5 | Final cleanup — remove all Svelte artifacts and verify complete migration | ✅ Success |

### Key Transformations Completed:
- **Project Config**: SvelteKit → Next.js (package.json, tsconfig.json, next.config.ts, postcss.config.mjs)
- **API Layer**: `@tanstack/svelte-query` → `@tanstack/react-query` with React hook conventions
- **Components**: Svelte single-file components → React functional components (.tsx)
- **Routing**: `src/routes/` → `src/app/` with Next.js App Router conventions
- **Reactivity**: Svelte 5 runes ($state, $derived, $effect, $props) → React hooks (useState, useEffect, useMemo, props)
- **Navigation**: SvelteKit `goto()` → Next.js `useRouter().push()`, `<a>` → `<Link>`
- **Environment Variables**: `$env/static/public` → `process.env.NEXT_PUBLIC_*`
- **Build**: All 5 builds passed with `npx next build`
- **Cleanup**: No .svelte files, no .svelte-kit directory, no Svelte dependencies remain

The build is successful. Let me do a final thorough check to confirm everything is clean:

1. ✅ **Build succeeds** - `npx next build` exits with code 0
2. ✅ **No .svelte files remain** - No Svelte files found outside node_modules
3. ✅ **No Svelte-specific imports** - No `$lib/`, `$app/`, or `$env/` imports remain
4. ✅ **No Svelte dependencies in package.json** - Only the package name contains "svelte" (which is just an identifier, not a dependency)
5. ✅ **All routes are properly generated** - `/`, `/_not-found`, `/posts/[id]`, `/posts/[id]/edit`
6. ✅ **Compilation successful** - TypeScript types validated, no compilation errors

The codebase has no build failures or errors. Let me write the debug log documenting this finding.
```
