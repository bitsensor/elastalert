#!/bin/bash

NODE_PATH=. BABEL_DISABLE_CACHE=1 node index.js | ./node_modules/.bin/bunyan -o short
