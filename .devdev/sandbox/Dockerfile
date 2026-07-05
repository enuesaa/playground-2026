FROM debian:bookworm

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install -y \
        build-essential \
        ca-certificates \
        curl \
        git \
        unzip

# Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs

# PHP
RUN apt-get install -y \
        php-cli \
        php-curl \
        php-mbstring \
        php-xml \
        php-zip

# Python
RUN apt-get install -y \
        python3 \
        python3-pip \
        python3-venv

# Go
RUN curl -fsSL https://go.dev/dl/go1.24.5.linux-amd64.tar.gz | tar -C /usr/local -xz
ENV PATH="/usr/local/go/bin:${PATH}"

# AWS CLI v2
RUN curl https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip -o awscliv2.zip \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf aws awscliv2.zip

WORKDIR /workspace

EXPOSE 80
EXPOSE 3000

CMD ["sleep", "infinity"]
