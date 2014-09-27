#!/usr/bin/env bash

sleep 5

magentoRootDir=/usr/share/nginx/html
localXml="${magentoRootDir}/app/etc/local.xml"

if test -f $localXml; then
  rm $localXml
fi

/usr/bin/n98-magerun --root-dir=$magentoRootDir local-config:generate $MAGENTO_DB_1_PORT_3306_TCP_ADDR root root magento files admin
/usr/bin/n98-magerun --root-dir=$magentoRootDir db:create

exec $@
