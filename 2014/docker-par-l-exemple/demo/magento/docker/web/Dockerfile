FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
ADD ./default /etc/nginx/conf.d/default.conf

COPY ./bootstrap.sh /bootstrap.sh
ENTRYPOINT ["/bootstrap.sh"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
