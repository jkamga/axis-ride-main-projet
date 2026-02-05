#!/bin/sh
set -e
APP_HOME=$(cd "$(dirname "$0")" && pwd)
exec "$APP_HOME/gradle/wrapper/gradle-wrapper.jar" "$@"
