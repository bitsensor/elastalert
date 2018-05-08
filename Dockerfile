FROM ivankrizsan/elastalert AS py-ea
FROM node:alpine
LABEL maintainer="BitSensor <dev@bitsensor.io>"
EXPOSE 3030

RUN apk add --update --no-cache python2 curl make

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
