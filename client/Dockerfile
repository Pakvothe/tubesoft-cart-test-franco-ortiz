FROM node:alpine
EXPOSE 3000
WORKDIR /src
COPY ./package.json package.json
RUN yarn
COPY . .
CMD ["yarn","start"]