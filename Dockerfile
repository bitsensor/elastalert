FROM node
MAINTAINER BitSensor <dev@bitsensor.io>
EXPOSE 3030

RUN apt-get clean && apt-get update && apt-get install -y \
  git \
  python2.7 \
  python2.7-dev \
  python-pip
RUN git clone https://github.com/Yelp/elastalert.git -b master --depth=1 /opt/elastalert
WORKDIR /opt/elastalert
RUN pip install -r requirements.txt
WORKDIR /opt/elastalert-server
COPY . /opt/elastalert-server
RUN npm install --production --quiet
COPY config/elastalert.yaml /opt/elastalert/config.yaml
COPY config/elastalert-server.json config/config.json
ENTRYPOINT ["npm", "start"]
