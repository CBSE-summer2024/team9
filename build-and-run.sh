#!/bin/bash

npm install
# Install all dependencies
npm install --prefix ./product-grid
npm install --prefix ./product-slider
npm install --prefix ./trusted-business
npm install --prefix ./container-project

# Run the project
npm run start:all

