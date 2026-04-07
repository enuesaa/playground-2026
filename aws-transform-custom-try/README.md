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
