FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get -y upgrade

RUN apt-get -y install nginx-full
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html
RUN rm /etc/nginx/sites-available/default
ADD ./default /etc/nginx/sites-available/default

ADD ./init.sh /init.sh
RUN chmod +x /init.sh

EXPOSE 80

CMD ["/usr/sbin/nginx", "-c", "/etc/nginx/nginx.conf"]

ENTRYPOINT ["/init.sh"]
