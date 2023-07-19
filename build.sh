#!/bin/sh

cd client
npm run build
cd ..
cd server
go build main.go
cd ..
