FROM node:alpine
WORKDIR /api
COPY ./package.json package.json
COPY . .
RUN npm install
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all
CMD ["npm", "start"]
EXPOSE 3001

