#!/bin/sh
rake db:migrate VERSION=0
rake db:migrate
rake spec:db:fixtures:load