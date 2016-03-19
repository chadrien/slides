#!/usr/bin/env bash

if [[ "$@" = "/usr/sbin/php5-fpm -F" ]]; then
  sleep 10

  portLinkedTo80=$(docker port magento_web_1 80 | sed s/0.0.0.0://)
  baseUrl="http://127.0.0.1:${portLinkedTo80}/"

  magentoRootDir=/usr/share/nginx/html
  localXml="${magentoRootDir}/app/etc/local.xml"

  if test -f ${localXml}; then
    rm ${localXml}

    /usr/bin/n98-magerun --root-dir=${magentoRootDir} local-config:generate ${MAGENTO_DB_1_PORT_3306_TCP_ADDR} root root magento files admin
    /usr/bin/n98-magerun --root-dir=${magentoRootDir} config:set web/unsecure/base_url ${baseUrl}
    /usr/bin/n98-magerun --root-dir=${magentoRootDir} config:set web/secure/base_url ${baseUrl}
  else
    /usr/bin/n98-magerun install --installationFolder=${magentoRootDir} --noDownload --dbHost=${MAGENTO_DB_1_PORT_3306_TCP_ADDR} --dbUser=root --dbPass=root --dbPort=3306 --dbName=magento --baseUrl=${baseUrl}
    /usr/bin/n98-magerun --root-dir=${magentoRootDir} cache:clean
    /usr/bin/n98-magerun --root-dir=${magentoRootDir} cache:flush
    /usr/bin/n98-magerun --root-dir=${magentoRootDir} cache:disable
    /usr/bin/n98-magerun --root-dir=${magentoRootDir} design:demo-notice 1
  fi
fi
exec "$@"
