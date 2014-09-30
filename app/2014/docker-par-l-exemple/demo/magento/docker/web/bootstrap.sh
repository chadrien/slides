#!/usr/bin/env bash

sed -i "s/fastcgi_pass .*:.*;/fastcgi_pass $MAGENTO_PHP_1_PORT_9000_TCP_ADDR:$MAGENTO_PHP_1_PORT_9000_TCP_PORT;/" /etc/nginx/conf.d/default.conf

exec $@
