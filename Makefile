# Executables (local)
DOCKER_COMP = docker compose

IS_DOCKER = $(shell docker info > /dev/null 2>&1 && echo 1)

ifeq ($(IS_DOCKER), 1)
# Docker containers
PHP_CONT = $(DOCKER_COMP) exec php
else
PHP_CONT =
endif

# Executables
PHP      = $(PHP_CONT) php
COMPOSER = $(PHP_CONT) composer
SYMFONY  = $(PHP) bin/console

# Misc
.DEFAULT_GOAL = help
.PHONY        : help build up start down logs sh composer vendor sf cc

## —— 🎵 🐳 The Symfony Docker Makefile 🐳 🎵 ——————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

##—— Quality assurance ————————————————————————————————————————————————————————————————————————————————————————————————

format: ## Format code with php-cs-fixer
	$(PHP) vendor/bin/php-cs-fixer fix

phpstan: phpstan.neon.dist ## Run PHPStan (the configuration must be defined in phpstan.neon)
	$(PHP) vendor/bin/phpstan analyse  --xdebug

psalm: psalm.xml ## Run Psalm
	$(PHP) vendor/bin/psalm  --no-cache

rector: ## Run rector
	$(PHP)  vendor/bin/rector

rector-dry: ## Run rector in dry mode
	$(PHP)  vendor/bin/rector --dry-run

.PHONY: psalm phpstan format

qa-all:
	make format
	make psalm
	make phpstan

## —— Docker 🐳 ————————————————————————————————————————————————————————————————
build: ## Builds the Docker images
	@$(DOCKER_COMP) build --pull --no-cache

up: ## Start the docker hub in detached mode (no logs)
	@$(DOCKER_COMP) up --detach

start: build up ## Build and start the containers

down: ## Stop the docker hub
	@$(DOCKER_COMP) down --remove-orphans

logs: ## Show live logs
	@$(DOCKER_COMP) logs --tail=0 --follow

sh: ## Connect to the PHP FPM container
	@$(PHP_CONT) sh

## —— Composer 🧙 ——————————————————————————————————————————————————————————————
composer: ## Run composer, pass the parameter "c=" to run a given command, example: make composer c='req symfony/orm-pack'
	@$(eval c ?=)
	@$(COMPOSER) $(c)

vendor: ## Install vendors according to the current composer.lock file
vendor: c=install --prefer-dist --no-dev --no-progress --no-scripts --no-interaction
vendor: composer

## —— Symfony 🎵 ———————————————————————————————————————————————————————————————
sf: ## List all Symfony commands or pass the parameter "c=" to run a given command, example: make sf c=about
	@$(eval c ?=)
	@$(SYMFONY) $(c)

cc: c=c:c ## Clear the cache
cc: sf
