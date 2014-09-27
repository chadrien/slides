FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update

RUN apt-get -y install php5-cli php5-fpm php5-mcrypt php5-gd php5-curl php5-mysql
RUN sed -i 's/listen = \/var\/run\/php5-fpm.sock/listen = 9000/' /etc/php5/fpm/pool.d/www.conf
RUN rm -rf /etc/php5/fpm/conf.d/
RUN ln -s /etc/php5/mods-available/ /etc/php5/fpm/conf.d

RUN apt-get -y install wget
RUN wget https://raw.githubusercontent.com/netz98/n98-magerun/master/n98-magerun.phar -O /usr/bin/n98-magerun
RUN chmod +x /usr/bin/n98-magerun

COPY ./bootstrap.sh /bootstrap.sh

EXPOSE 9000

CMD ["/usr/sbin/php5-fpm", "-F"]

ENTRYPOINT ["/bootstrap.sh"]
