FROM node:20
WORKDIR /usr/app
COPY package.json . /
RUN npm install
COPY .. /usr/app/
RUN chmod 755 /usr/app
EXPOSE 3002
CMD ["node","server" ]