FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN cd ./frontend && npm install && node ./scripts/build.js && mv ./build /tmp/ && cd .. && rm -rf frontend && mkdir frontend && mv /tmp/build ./frontend/

EXPOSE 3001
ENTRYPOINT ["npm", "start"]
