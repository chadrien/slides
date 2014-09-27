#!/usr/bin/env bash

sed -i "s/{{FPM_IP}}/$MAGENTO_PHP_1_PORT_9000_TCP_ADDR/" /etc/nginx/sites-available/default
sed -i "s/{{FPM_PORT}}/$MAGENTO_PHP_1_PORT_9000_TCP_PORT/" /etc/nginx/sites-available/default

exec $@
