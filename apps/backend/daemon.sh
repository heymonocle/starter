#!/bin/bash

supabase start

finish()
{
    supabase stop
    sleep 10
    exit
}
trap finish SIGINT

while :; do
    sleep 60
    echo "Supabase heartbeat..."
done
