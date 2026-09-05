# AL2027

- プレビュー
- SELinux は enforcing へ

```bash
$ cat /etc/os-release 
NAME="Amazon Linux"
VERSION="2027"
ID="amzn"
ID_LIKE="fedora"
VERSION_ID="2027"
VARIANT="Public Preview"
VARIANT_ID="preview"
PLATFORM_ID="platform:al2027"
PRETTY_NAME="Amazon Linux 2027.0.20260903"
ANSI_COLOR="0;33"
CPE_NAME="cpe:2.3:o:amazon:amazon_linux:2027:2027.0.20260903"
HOME_URL="https://aws.amazon.com/linux/"
DOCUMENTATION_URL="https://docs.aws.amazon.com/linux/"
SUPPORT_URL="https://aws.amazon.com/premiumsupport/"
BUG_REPORT_URL="https://github.com/amazonlinux/amazon-linux-2027"
VENDOR_NAME="AWS"
VENDOR_URL="https://aws.amazon.com/"
SUPPORT_END="2026-12-31"

$ dnf install -y nginx
Updating and loading repositories:
 Amazon Linux 2027 repository                                                                                                                                  100% |   9.8 MiB/s |   2.2 MiB |  00m00s
Repositories loaded.
Package                                                             Arch             Version                                                             Repository                                Size
Installing:
 nginx                                                              aarch64          1:1.30.4-1.amzn2027.0.1                                             amazonlinux                          131.5 KiB
Installing dependencies:
 amazon-linux-logos-httpd                                           noarch           0:2027-1.amzn2027                                                   amazonlinux                           14.5 KiB
 gperftools-libs                                                    aarch64          0:2.18.1-1.amzn2027                                                 amazonlinux                            1.4 MiB
 libunwind                                                          aarch64          0:1.8.3-2.amzn2027                                                  amazonlinux                          351.4 KiB
 nginx-core                                                         aarch64          1:1.30.4-1.amzn2027.0.1                                             amazonlinux                            1.9 MiB
 nginx-filesystem                                                   noarch           1:1.30.4-1.amzn2027.0.1                                             amazonlinux                          141.0   B
 nginx-mimetypes                                                    noarch           0:2.1.49-3.amzn2027.0.4                                             amazonlinux                           42.8 KiB

Transaction Summary:
 Installing:         7 packages

Total size of inbound packages is 1 MiB. Need to download 1 MiB.
After this operation, 4 MiB extra will be used (install 4 MiB, remove 0 B).

Complete!


$ systemctl status nginx
○ nginx.service - The nginx HTTP and reverse proxy server
     Loaded: loaded (/usr/lib/systemd/system/nginx.service; disabled; preset: disabled)
    Drop-In: /usr/lib/systemd/system/service.d
             └─10-timeout-abort.conf
     Active: inactive (dead)

$ systemctl enable --now nginx
Created symlink '/etc/systemd/system/multi-user.target.wants/nginx.service' → '/usr/lib/systemd/system/nginx.service'.

$ systemctl status nginx
● nginx.service - The nginx HTTP and reverse proxy server
     Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; preset: disabled)
    Drop-In: /usr/lib/systemd/system/service.d
             └─10-timeout-abort.conf
     Active: active (running) since Sat 2026-09-05 06:58:50 UTC; 4s ago
 Invocation: 2c266badcaa14c67a334f0a2fb668be9
    Process: 2733 ExecStartPre=/usr/bin/rm -f /run/nginx.pid (code=exited, status=0/SUCCESS)
    Process: 2735 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=0/SUCCESS)
    Process: 2737 ExecStart=/usr/sbin/nginx (code=exited, status=0/SUCCESS)
   Main PID: 2738 (nginx)
      Tasks: 3 (limit: 2193)
     Memory: 3.7M (peak: 6.8M)
        CPU: 65ms
     CGroup: /system.slice/nginx.service
             ├─2738 "nginx: master process /usr/sbin/nginx"
             ├─2739 "nginx: worker process"
             └─2740 "nginx: worker process"

$ python --version
-bash: python: command not found

$ python3 --version
Python 3.14.7

$ sestatus
SELinux status:                 enabled
SELinuxfs mount:                /sys/fs/selinux
SELinux root directory:         /etc/selinux
Loaded policy name:             targeted
Current mode:                   enforcing
Mode from config file:          enforcing
Policy MLS status:              enabled
Policy deny_unknown status:     allowed
Memory protection checking:     actual (secure)
Max kernel policy version:      35
```

## Links
- https://dev.classmethod.jp/articles/al2027-preview-ami-ssm-os-check/
- https://aws.amazon.com/about-aws/whats-new/2026/09/announcing-amazon-linux-2027/
