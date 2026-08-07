FROM php:8.4-apache

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libicu-dev \
    libzip-dev \
    && docker-php-ext-install intl zip pdo_mysql

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf
RUN a2enmod rewrite

WORKDIR /var/www/html

# RUN composer install --no-dev --optimize-autoloader
# RUN php bin/console tailwind:build

CMD ["apache2-foreground"]
