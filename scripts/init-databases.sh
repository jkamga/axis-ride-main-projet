#!/bin/bash
set -e

# Create multiple databases
POSTGRES="psql -U postgres"

echo "Creating databases..."

$POSTGRES <<-EOSQL
    CREATE DATABASE axisride_auth;
    CREATE DATABASE axisride_user;
    CREATE DATABASE axisride_trip;
    CREATE DATABASE axisride_payment;
    CREATE DATABASE axisride_chat;
    CREATE DATABASE axisride_geolocation;
    CREATE DATABASE axisride_notification;
    CREATE DATABASE axisride_loyalty;
    CREATE DATABASE axisride_analytics;
    CREATE DATABASE axisride_content;
    CREATE DATABASE keycloak;
EOSQL

echo "Enabling PostGIS extension for geolocation database..."

$POSTGRES -d axisride_geolocation <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS postgis;
EOSQL

$POSTGRES -d axisride_trip <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS postgis;
EOSQL

echo "Databases created successfully!"
