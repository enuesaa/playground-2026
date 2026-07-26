FROM public.ecr.aws/amazonlinux/amazonlinux:2023

RUN dnf install -y systemd
STOPSIGNAL SIGRTMIN+3
CMD ["/sbin/init"]
