FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get -y upgrade

RUN apt-get -y install nginx-full
ADD ./default /etc/nginx/sites-available/default

VOLUME ["/usr/share/nginx/html"]

ADD ./init.sh /init.sh

EXPOSE 80

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]

ENTRYPOINT ["/init.sh"]
