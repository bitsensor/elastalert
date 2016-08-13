#!/bin/sh

git log --reverse --format='%aN <%aE>' | perl -wnE '
print $seen{$_} = $_ unless $seen{$_}
' > AUTHORS
