

## Description

Example of node API with typescrip using [Nest](https://github.com/nestjs/nest) framework and MongoDB .

#env configuration (execute folowing commands on windows powershell)

- creating  docker mongo container:

docker run --network docker-local -p 8090:27017 --name mongo-docker -v "mongodata:/data/db" -i -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=mongoadmin mongo

- creating node container
docker run --network docker-local -p 8091:3001 --name mongo-crud -v "$(pwd):/var/www" -w "/var/www" -i -e DATASOURCE="mongodb://mongoadmin:mongoadmin@mongo-docker:27017/node-mongo-crud?ssl=false&authSource=admin&retryWrites=true" node npm run start:dev

- creating node debug container
docker run --network docker-local -p 8091:3001 --name mongo-crud-debug -v "$(pwd):/var/www" -w "/var/www" -i -e DATASOURCE="mongodb://mongoadmin:mongoadmin@mongo-docker:27017/node-mongo-crud?ssl=false&authSource=admin&retryWrites=true" node npm run start:debug
