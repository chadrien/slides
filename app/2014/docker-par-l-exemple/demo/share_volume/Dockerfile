FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get -y upgrade

RUN apt-get -y install nginx-full

VOLUME ["/usr/share/nginx/html"]

EXPOSE 80

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
