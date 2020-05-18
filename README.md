# CC Test app installation guide.

1) Run `composer install` to install your php dependencies.
2) Run `npm install` to instal the node packages.
3) Create a database of your own choice in mysql and configure your db in the .env file.
4) Run `php artisan migrate --seed` to scaffold your db with the required tables for the application
5) Run `npm run dev` .
6) Run `php artisan serve` .
