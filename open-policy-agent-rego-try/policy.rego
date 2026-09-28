package httpapi.authz

default allow := false

# 管理者は何でもOK
allow if input.user.role == "admin"

# 一般ユーザーは自分のリソースのGETだけOK
allow if {
    input.method == "GET"
    input.path == ["users", input.user.id]
}

# 拒否理由を集める（部分集合ルール）
reasons contains msg if {
    not allow
    msg := sprintf("%s は %v にアクセスできません", [input.user.id, input.path])
}