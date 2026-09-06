FROM php:8.4-apache

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
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html
COPY . .
RUN composer install --optimize-autoloader --no-interaction

CMD ["apache2-foreground"]
