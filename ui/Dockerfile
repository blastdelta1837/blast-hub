# Set the base image to Ubuntu
FROM    ubuntu:trusty


# File Author / Maintainer
MAINTAINER Shawn Brinkman

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get install -y git && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup_8.x  | sudo bash - && \
    apt-get -y install python build-essential nodejs

# Install nodemon
RUN npm install -g nodemon

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Define working directory
WORKDIR /src
ADD . /src

# Run app using nodemon

CMD ["nodemon", "-L", "server.js"]
