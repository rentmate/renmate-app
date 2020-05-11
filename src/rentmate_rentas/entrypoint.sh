#!/bin/bash
# Docker entrypoint script.

# Wait until Postgres is ready
while ! pg_isready -q -h $PGHOST -p $PGPORT -U $PGUSER
do
  echo "$(date) - waiting for database to start"
  sleep 2
done
# dropdb $PGDATABASE
# Create, migrate, and seed database if it doesn't exist.

  echo "Database $PGDATABASE does not exist. Creating..."  
  mix ecto.create

#  mix run priv/repo/seeds.exs
  echo "Database $PGDATABASE created."

  mix ecto.migrate

  echo "Tables created."
  mix phx.server