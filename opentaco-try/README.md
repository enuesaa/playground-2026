# opentaco

- 旧名digger
- Terraform Cloud (HCP Terraform) みたいなもん。
  - Atlantis を加えた感じ。

### セットアップ方法
- OpenTaco のアカウント作成
  - https://otaco.app/
- GitHub Repository に OpenTaco のアプリを入れる
- AWS アカウントに IAM Role を用意
  - OIDC Provider
  - GitHub Actions でAssume Roleして terraform apply する
  - 下記のモジュールで作成できる。[参考](https://dev.classmethod.jp/articles/open-taco-terraform-pr-comment-plan-apply/)

```hcl
module "github_oidc" {
  source  = "terraform-module/github-oidc-provider/aws"
  version = "2.2.1"

  role_name                 = "test-opentaco-role"
  role_description          = "Role for GitHub Actions OIDC"
  repositories              = ["enuesaa/reponame"]
  oidc_role_attach_policies = ["arn:aws:iam::aws:policy/AmazonS3FullAccess"]
}
```

- digger.yml を作成
  - 設定ファイル
  - この dir というところで terraform init するっぽい
  - ありがちなディレクトリ構成であれば、`envs/{envname}` になりそう。

```yaml
projects:
- name: testacoenv
  dir: envs/testaco
```

- GitHub Actions Workflow を作成
  - `.github/workflows/digger_workflow.yml`
  - ファイル名変えたら実行に失敗した。決め打ちなので注意。[参考](https://docs.opentaco.dev/ce/getting-started/with-terraform)

### apply
- PR を出すと、OpenTaco のアプリが勝手に動いて plan をしてくれる
- で `digger apply` というコメントを打つと apply してくれる
- OpenTaco の画面の方にも、ステータスが反映されてる感じ
  - 正直この画面がなぜあるのかわからなかったが、何か便利な機能があるのだろう。
  - ドリフト検出的なことができる？かも？そんな感じのボタンがある
