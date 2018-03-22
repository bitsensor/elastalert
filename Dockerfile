FROM ivankrizsan/elastalert AS py-ea
# Uses BitSensor's elastalert, or yelp master if commented out
# ENV ELASTALERT_URL https://github.com/bitsensor/yelp-elastalert/archive/master.zip

FROM node:alpine
LABEL maintainer="dev@bitsensor.io"
EXPOSE 3030

RUN apk update && apk add --no-cache python2 curl

COPY --from=py-ea /usr/lib/python2.7/site-packages /usr/lib/python2.7/site-packages
COPY --from=py-ea /opt/elastalert /opt/elastalert

RUN mkdir server_data
WORKDIR /opt/elastalert-server
COPY . /opt/elastalert-server

RUN npm install --production --quiet
COPY config/elastalert.yaml /opt/elastalert/config.yaml
COPY config/config.json config/config.json
COPY rule_templates/ /opt/elastalert/rule_templates
COPY elastalert_modules/ /opt/elastalert/elastalert_modules

ENTRYPOINT ["npm", "start"]
