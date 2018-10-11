FROM node:5.1
MAINTAINER Abdallah AlHalees

LABEL \
    Description="Xara Back-end role Test 1"

# cd to tmp
WORKDIR /tmp
# copy over the package.json
COPY package.json /tmp/
# set the npm registry and install packages
RUN npm config set registry http://registry.npmjs.org/ && npm install
# change to the app dir
WORKDIR /usr/src/app
# copy over sources
COPY . /usr/src/app/
# copy the node modules in place
RUN cp -a /tmp/node_modules /usr/src/app/
# expose the port
EXPOSE 3000
# start
ENTRYPOINT [ "npm", "run", "start" ]
