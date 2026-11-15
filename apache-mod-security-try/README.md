# ModSecurity

- Apache に入れる WAF
- mod_security

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
```
