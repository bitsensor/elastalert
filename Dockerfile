FROM ivankrizsan/elastalert AS py-ea
# Uses BitSensor's elastalert 
ENV ELASTALERT_URL https://github.com/bitsensor/yelp-elastalert/archive/master.zip 

FROM node:alpine
MAINTAINER BitSensor <dev@bitsensor.io>
EXPOSE 3030
 
RUN apk update && apk upgrade && apk add python2

COPY --from=py-ea /usr/lib/python2.7/site-packages /usr/lib/python2.7/site-packages
COPY --from=py-ea /opt/elastalert /opt/elastalert

RUN mkdir server_data
WORKDIR /opt/elastalert-server 
COPY . /opt/elastalert-server 
 
RUN npm install --production --quiet 
COPY config/elastalert.yaml /opt/elastalert/config.yaml 
COPY config/config.json config/config.json 
COPY rule_templates/ /opt/elastalert/rule_templates

ENTRYPOINT ["npm", "start"]