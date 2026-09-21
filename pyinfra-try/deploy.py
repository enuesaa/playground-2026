from pyinfra.operations import dnf, systemd

dnf.packages(
    name="Install nginx",
    packages=["nginx"],
    update=True,
    _sudo=True,
)

systemd.service(
    name="Ensure nginx is running and enabled",
    service="nginx",
    running=True,
    enabled=True,
    _sudo=True,
)
