#!/usr/bin/env bash
. ~/.bashrc
nvm use "$(cat .node-version)"
npm start
