#!/bin/sh

cd client
npm install
cd ..
cd server
go mod tidy
cd ..
