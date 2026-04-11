FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    libzip-dev \
    libonig-dev \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install zip mbstring pdo_pgsql pcntl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN a2enmod rewrite

WORKDIR /var/www/html
COPY . .

RUN composer install --optimize-autoloader --no-interaction
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash -
RUN apt install nodejs -y
RUN npm install -g osls

CMD ["apache2-foreground"]
