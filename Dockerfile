# specify the node base image with your desired version
FROM node:16
# copy project files and folders to the current working directory (i.e. /app folder)
COPY . /app
# install project dependencies
RUN npm install
# replace this with your application's default port
EXPOSE 3001
# run the app script
CMD ["npm", "start"]
