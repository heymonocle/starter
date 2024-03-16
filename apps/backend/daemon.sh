#!/bin/bash

echo "Starting Supabase…"
supabase status

finish()
{
    echo "Stopping Supabase…"
    supabase stop
    sleep 10
    exit 0
}
trap finish SIGINT

while :; do
    echo "Supabase heartbeat…"
    sleep 60
done
