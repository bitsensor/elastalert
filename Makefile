v ?= v0.2.0b2

all: build

build:
	docker pull alpine:latest && docker pull node:alpine
	docker build --build-arg ELASTALERT_VERSION=$(v) -t elastalert .

server: build
	docker run -it --rm -p 3030:3030 \
	--net="host" \
	elastalert:latest

.PHONY: build
