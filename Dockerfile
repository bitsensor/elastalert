FROM node
MAINTAINER BitSensor <dev@bitsensor.io>
EXPOSE 3030

RUN apt-get clean && apt-get update && apt-get install -y \
  git \
  python2.7 \
  python2.7-dev \
  python-pip
RUN git clone https://github.com/Yelp/elastalert.git -b v0.0.95 --depth=1 /opt/elastalert
WORKDIR /opt/elastalert
RUN pip install -r requirements.txt
WORKDIR /opt/elastalert-server
COPY . /opt/elastalert-server
COPY docker/config/elastalert.yaml /opt/elastalert/config.yaml
COPY docker/rules /opt/elastalert/rules
COPY docker/config/elastalert-server.json config/config.json
ENTRYPOINT ["npm", "start"]
