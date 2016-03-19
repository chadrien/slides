run:
	@docker-compose up -d
	@sleep 5
	@docker-compose run --rm web php index.php
	@docker-compose run --rm web n98-magerun config:set web/unsecure/base_url http://127.0.0.1:$$(docker-compose port web 80 | sed -e 's/0.0.0.0://')/
	@docker-compose run --rm web n98-magerun config:set web/secure/base_url http://127.0.0.1:$$(docker-compose port web 80 | sed -e 's/0.0.0.0://')/
	@make dev_setup
	@make open container=web port=80

open:
	@open http://127.0.0.1:$$(docker-compose port $(container) $(port) | sed -e 's/0.0.0.0://')/

modman:
	@vendor/bin/modman deploy-all --force

dev_setup:
	@docker-compose run --rm web n98-magerun cache:disable
	@docker-compose run --rm web n98-magerun dev:symlinks --on --global