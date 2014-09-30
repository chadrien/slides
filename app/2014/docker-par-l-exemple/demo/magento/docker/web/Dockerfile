FROM nginx

RUN apt-get -y install supervisor
RUN mkdir -p /etc/supervisor/conf.d
RUN echo "[supervisord]" > /etc/supervisor/conf.d/supervisord.conf
RUN echo "nodaemon=true" >> /etc/supervisor/conf.d/supervisord.conf

RUN echo "[program:nginx]" >> /etc/supervisor/conf.d/supervisord.conf
RUN echo "command=/bin/bash -c \"nginx -g 'daemon off;'\"" >> /etc/supervisor/conf.d/supervisord.conf

RUN rm /etc/nginx/conf.d/default.conf
ADD ./default /etc/nginx/conf.d/default.conf

COPY ./bootstrap.sh /bootstrap.sh
ENTRYPOINT ["/bootstrap.sh"]

EXPOSE 80

CMD ["/usr/bin/supervisord"]
