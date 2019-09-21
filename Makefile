# —— Inspired by ———————————————————————————————————————————————————————————————
# https://speakerdeck.com/mykiwi/outils-pour-ameliorer-la-vie-des-developpeurs-symfony?slide=47
# https://blog.theodo.fr/2018/05/why-you-need-a-makefile-on-your-project/

# Setup —————————————————————————————————————————————————————————————————————————
EXEC_PHP   = php
GIT        = git
GIT_AUTHOR = vancoillie
SYMFONY    = $(EXEC_PHP) bin/console
COMPOSER   = composer
YARN       = yarn
.DEFAULT_GOAL := help

## —— 🐝  Strangebuzz Make file  🐝  —————————————————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Composer —————————————————————————————————————————————————————————————————
check: ## Check dependencies
	$(EXEC_PHP) vendor/bin/composer-require-checker check composer.json

install: build ## Install apps based on APP_ENV

build: vendor node_modules assets ## Build vendor, node_modules and compile assests based on APP_ENV

## —— Symfony ——————————————————————————————————————————————————————————————————
sf: ## List Symfony commands
	$(SYMFONY)

cc: ## Clear cache
	$(SYMFONY) c:c

warmup: ## Warmump the cache
	$(SYMFONY) cache:warmup

fix-perms: ## Fix permissions of all var files
	chmod -R 777 var/*

purge: ## Purge cache and logs
	rm -rf var/cache/* var/logs/*

## —— Database ——————————————————————————————————————————————————————————————————
db: vendor ## create database
	$(SYMFONY) doctrine:database:create --if-not-exists
	$(SYMFONY) doctrine:migrations:migrate --no-interaction --allow-no-migration

migration: vendor ## create doctrine migration
	$(SYMFONY) doctrine:migrations:diff

db-reset: vendor ## reset database
	$(SYMFONY) doctrine:database:drop --force
	$(SYMFONY) doctrine:database:create
	$(SYMFONY) doctrine:migrations:migrate -n
	$(SYMFONY) doctrine:fixtures:load -n


## —— Project ——————————————————————————————————————————————————————————————————
assets: node_modules ## Run Webpack Encore to compile assets
	$(YARN) run build

assets@dev: node_modules ## Run Webpack Encore to compile assets in dev mode
	$(YARN) run dev

watch: node_modules ## Run Webpack Encore in watch mode
	$(YARN) run watch

## —— Project ——————————————————————————————————————————————————————————————————
load-fixtures: ## Build the db, control the schema validity, load fixtures and check the migration status
	$(SYMFONY) doctrine:cache:clear-metadata
	$(SYMFONY) doctrine:database:create --if-not-exists
	$(SYMFONY) doctrine:schema:drop --force
	$(SYMFONY) doctrine:schema:create
	$(SYMFONY) doctrine:schema:validate
	$(SYMFONY) doctrine:fixtures:load -n
	$(SYMFONY) doctrine:migration:status

test: phpunit.xml.dist load-fixtures ## Launch all functionnal and unit tests
	bin/phpunit --stop-on-failure

## —— Deploy ——————————————————————————————————————————————————————————————————
deploy: git-update install db ## Deploy, install composer dependencies and run database migrations


git-update: ## Update Git only and refresh cache (sf+pagespeed)
	git pull
	rm -rf var/cache/* var/logs/*
	php bin/console cache:warmup
	chmod -R 777 var/*

## —— Stats ———————————————————————————————————————————————————————————————————
stats: ## Commits by hour for the main author of this project
	$(GIT) log --author="$(GIT_AUTHOR)" --date=iso | perl -nalE 'if (/^Date:\s+[\d-]{10}\s(\d{2})/) { say $$1+0 }' | sort | uniq -c|perl -MList::Util=max -nalE '$$h{$$F[1]} = $$F[0]; }{ $$m = max values %h; foreach (0..23) { $$h{$$_} = 0 if not exists $$h{$$_} } foreach (sort {$$a <=> $$b } keys %h) { say sprintf "%02d - %4d %s", $$_, $$h{$$_}, "*"x ($$h{$$_} / $$m * 50); }'

# rules based on files
composer.lock: composer.json
	$(COMPOSER) update --lock $(COMPOSER_OPTIONS)

vendor: composer.lock
	$(COMPOSER) install $(COMPOSER_OPTIONS)

node_modules: yarn.lock
	$(YARN) install
	@touch -c node_modules

yarn.lock: package.json
	$(YARN) upgrade


