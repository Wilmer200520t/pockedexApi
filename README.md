<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# NestJS project

## Description

This project uses NestJS along with MongoDB to create a small Pokémon API.

## Method 1: Run individually

### Facility

```bash
# Install Node.js dependencies
npm install
```

### Create or modify the .env

- Edit the `.env.template` file and fill in the following variables with your own parameters:

```
MONGO_URL = mongodb://localhost:27017/pokedex (example)
APP_PORT = 3000 (example)

## Default limit on GET requests (example)
DEFAULT_LIMIT = 25 (optional)
```

### Run the database

```bash
# Run the MongoDB container
docker-compose up -d
```

### Run the application

```bash
# Start the application in development mode
npm run start
```

```bash
# Start the app in watch mode
npm run start:dev
```

```bash
# Start the application in production mode
npm run build
npm run start
```

## Method 2: Run the application and database as a container

1. Edit the `.env.prod` file
2. Install docker
3. Run the continer app

```bash
  docker compose -f .\docker-compose.prod.yaml --env-file .\.env.prod up --build -d
```

## Insert initial data (optional)

You can insert initial data using the following method:
`Method : GET BASE_URL/api/v2/seed` Or using curl:

```bash
curl --location 'BASE_URL/api/v2/seed'
```

## Used technology

- MongoDb
- Nestjs
- Docker
