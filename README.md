# simple-dashboard


```shell
# clone project 
$ git clone https://github.com/jvancoillie/simple-dashboard.git

# move into cloned folder
$ cd simple-dashboard

# fill .env file
$ vi .env

# Install required dependencies
$ composer install

# create database
$ php bin/console doctrine:database:create

# run doctrine migrations
$ php bin/console doctrine:migration:migrate

# create Admin user
$ php bin/console app:add-user --admin

```

