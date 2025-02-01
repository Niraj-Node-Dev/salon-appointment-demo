# NestJS Project

## Project Setup

```bash
$ pnpm install
```

## Compile and Run the Project
```bash
$ pnpm run start

$ pnpm run start:dev
``` 

## Run Tests
```bash
# Unit Tests
$ pnpm run test

# E2E Tests
$ pnpm run test:e2e

# Test Coverage
$ pnpm run test:cov
```

## Database Setup 
### Enable PostGIS Extension

```bash
CREATE EXTENSION postgis;
```

## Run Migrations
```bash
$ pnpm run migration:up
```

## Seed the Database
```bash
$ pnpm run seed
```
