# ModSecurity

- Apache に入れる WAF
- mod_security
- ログの見方だけわからない。
  - ちょっとみづらい
- Core Rule Set (CRS) を入れるのがベースラインっぽい
  - https://www.eg-secure.co.jp/siteguard/blog/what-is-rule-of-waf
  - mod seucirty 本体とルールは分かれているということ。

## 手順
```bash
dnf install -y mod_security

# ModSecurityが有効であることを確認 `SecRuleEngine On`
grep -i SecRuleEngine /etc/httpd/conf.d/mod_security.conf

# OWASP CRS のルールを適用
curl -L https://github.com/coreruleset/coreruleset/archive/refs/tags/v4.30.0.tar.gz -o /tmp/coreruleset.tar.gz
mkdir -p /etc/crs4
tar -xzf /tmp/coreruleset.tar.gz --strip-components=1 -C /etc/crs4
cp /etc/crs4/crs-setup.conf.example /etc/crs4/crs-setup.conf
cat > /etc/httpd/conf.d/owasp-crs.conf <<'EOF'
<IfModule security2_module>
    Include /etc/crs4/crs-setup.conf
    Include /etc/crs4/rules/*.conf
</IfModule>
EOF

# start
apachectl configtest
systemctl enable --now httpd

# 仮のコンテンツを配置
echo '<html><body>ok</body></html>' > /var/www/html/index.html
```

動作確認

```bash
$ curl -i http://localhost/
HTTP/1.1 200 OK

$ curl -i "http://localhost/?q=%3Cscript%3Ealert(1)%3C%2Fscript%3E"
HTTP/1.1 403 Forbidden

$ curl -i "http://localhost/?id=1%20UNION%20SELECT%201,2,3"
HTTP/1.1 403 Forbidden

$ grep -E 'Access denied|Action: Intercepted|Anomaly Scores' /var/log/httpd/modsec_audit.log
```

## Links
- https://www.eg-secure.co.jp/siteguard/blog/what-is-oss-modsecurity
- https://github.com/coreruleset/coreruleset
