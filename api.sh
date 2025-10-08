#!/bin/bash

curl -X DELETE http://localhost:8000/tasks/${1} \
    -H 'Content-Type: application/json'