#!/bin/bash
# This script replaces the default templates with
# custom ElastAlert templates we use at BitSensor

rm rule_templates/*
git clone https://gitlab-ci-token:$1@git.bitsensor.io/front-end/elastalert-rules replacement-rules
cp replacement-rules/rules/* rule_templates/
rm -rf replacement-rules
