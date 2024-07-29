<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

None

## Installation

```bash
# Install node dependencies
npm install
```

## Create .env

- Edit the `.env.template` file and complete the following variables with your own parameters:

```
  MONGO_URL = mongodb://localhost:27017/pokedex (example)
  APP_PORT = 3000 (example)

  ## Default limit on get request data(example)
  DEFAULT_LIMIT = 25 (optional)
```

## Run database

```bash
# Run mongo container
docker-compose up -d
```

## Running the app

```bash
# Start app as development
npm run start
```

```bash
# Start app as watch mode
npm run start:dev
```

```bash
# Start app as production mode
npm run build
npm run start
```

## Insert initial data(optional)

`Method : GET BASE_URL/api/v2/seed` or

```bash
curl --location 'BASE_URL/api/v2/seed'
```

## Stack Usado

- MongoDb
- Nestjs
