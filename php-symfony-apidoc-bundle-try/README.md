# php-symfony-openapi-try

```bash
docker compose up
docker compose exec app php bin/console doctrine:migrations:migrate --no-interaction
docker compose exec app php bin/console doctrine:fixtures:load --no-interaction
```

## Links
- https://symfony.com/bundles/NelmioApiDocBundle/current/index.html
