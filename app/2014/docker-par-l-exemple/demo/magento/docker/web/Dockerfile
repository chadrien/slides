FROM nginx

RUN rm /etc/nginx/sites-available/default
ADD ./default /etc/nginx/sites-available/default

COPY ./bootstrap.sh /bootstrap.sh

EXPOSE 80

CMD ["nginx"]

ENTRYPOINT ["/bootstrap.sh"]
