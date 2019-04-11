FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN apt-get -y upgrade

RUN apt-get -y install php5-fpm
RUN sed -i 's/listen = \/var\/run\/php5-fpm.sock/listen = 9000/' /etc/php5/fpm/pool.d/www.conf

VOLUME ["/usr/share/nginx/html"]

EXPOSE 9000

CMD ["/usr/sbin/php5-fpm", "-F"]
