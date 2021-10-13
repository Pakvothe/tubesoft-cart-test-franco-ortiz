FROM node:alpine
EXPOSE 3000
WORKDIR /src
COPY ./package.json package.json
RUN npm install
COPY . .
CMD ["npm","start"]