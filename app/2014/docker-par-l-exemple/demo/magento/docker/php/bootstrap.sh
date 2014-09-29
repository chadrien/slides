#!/usr/bin/env bash

sleep 5

magentoRootDir=/usr/share/nginx/html
localXml="${magentoRootDir}/app/etc/local.xml"

if test -f ${localXml}; then
  rm ${localXml}
fi

/usr/bin/n98-magerun --root-dir=${magentoRootDir} local-config:generate ${MAGENTO_DB_1_PORT_3306_TCP_ADDR} root root magento files admin
/usr/bin/n98-magerun --root-dir=${magentoRootDir} db:create

portLinkedTo80=$(docker ps -a | grep magento_web_1 | grep -o -P "[0-9]+\->80" | tr "\->" "\n" | head -n 1)
baseUrl="http://localhost:${portLinkedTo80}/"

cd ${magentoRootDir}
php -d max_execution_time=0 index.php

/usr/bin/n98-magerun --root-dir=${magentoRootDir} config:set web/unsecure/base_url ${baseUrl}
/usr/bin/n98-magerun --root-dir=${magentoRootDir} config:set web/secure/base_url ${baseUrl}

exec $@
