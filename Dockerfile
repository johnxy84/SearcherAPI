# Use the predefined node base image for this module.
FROM node:6.0.0

# create the log directory
RUN mkdir -p /var/log/applications/searcher

# Tell npm to use our registry
RUN npm set registry https://registry.npmjs.org/

# Specific installations required to keep local server running - hence not included in npm install above.
RUN npm install nodemon -g

RUN mkdir /src

# Install pm2 for running ourlocal server
RUN npm install pm2 -g

COPY package.json /src
# Install node dependencies
RUN npm install

ADD . /src
WORKDIR /src

# Map a volume for the log files and add a volume to override the code
VOLUME ["/src", "/var/log/applications/searcher"]

# Expose web service and nodejs debug port
EXPOSE 6969