FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update

RUN apt-get -y install curl
RUN curl -sSL https://get.docker.io/ubuntu/ | sh

RUN apt-get -y install php5-cli php5-fpm php5-mcrypt php5-gd php5-curl php5-mysql
RUN sed -i 's/listen = \/var\/run\/php5-fpm.sock/listen = 9000/' /etc/php5/fpm/pool.d/www.conf
RUN php5enmod mcrypt

RUN curl -o /usr/bin/n98-magerun https://raw.githubusercontent.com/netz98/n98-magerun/master/n98-magerun.phar
RUN chmod +x /usr/bin/n98-magerun
ADD ./n98-magerun.yaml /root/.n98-magerun.yaml

ADD ./bootstrap.sh /bootstrap.sh
ENTRYPOINT ["/bootstrap.sh"]

EXPOSE 9000

CMD ["/usr/sbin/php5-fpm", "-F"]
