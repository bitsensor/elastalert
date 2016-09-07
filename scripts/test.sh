#!/bin/bash

./node_modules/.bin/istanbul cover _mocha -- test --colors > >(perl -pe 's/\x1b\[90m/\x1b[0m/g') 2> >(perl -pe 's/\x1b\[90m/\x1b[0m/g' 1>&2)
