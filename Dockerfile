FROM php:5.5-apache
MAINTAINER chadrien <chadrien@chadrien.fr>

RUN requirements="libpng12-dev libmcrypt-dev libcurl3-dev" \
    && apt-get update && apt-get install -y $requirements \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install gd \
    && docker-php-ext-install mcrypt \
    && docker-php-ext-install mbstring \
    && requirementsToRemove="libpng12-dev libcurl3-dev" \
    && apt-get purge --auto-remove -y $requirementsToRemove

ENV MAGENTO_VERSION 1.9.1.0
ENV MAGENTO_URL http://www.magentocommerce.com/downloads/assets/${MAGENTO_VERSION}/magento-${MAGENTO_VERSION}.tar.gz

RUN curl -sSL ${MAGENTO_URL} -o magento.tar.gz \
    && mkdir -p /var/www/htdocs \
    && tar -xzf magento.tar.gz -C /var/www/htdocs --strip 1 \
    && rm magento.tar.gz

RUN usermod -u 1000 www-data

RUN a2enmod rewrite

RUN sed -i -e 's/\/var\/www\/html/\/var\/www\/htdocs/' /etc/apache2/apache2.conf
WORKDIR /var/www/htdocs