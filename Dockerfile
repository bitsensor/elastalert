FROM bitsensor/nvm
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
COPY . /opt/elastalert-server
WORKDIR /opt/elastalert-server
RUN . ~/.bashrc && nvm install "$(cat .node-version)"
ENTRYPOINT ["scripts/entrypoint.sh"]
