<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) API para tienda Online.

## Comando para instalar dependencias en local

```bash
$ npm install
```

## Comandos para compilar y correr el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Crear base de datos

```bash
# migraciones
$ npx prisma migrate dev --name init
```
t
## Ejecutar pruebas

```bash
# unit tests
$ npm run test
```

## Endpoints

```bash
# auth.
POST /auth/register
POST /auth/login

# usuarios.
GET /user
POST /user
GET /use/:id
PUT /use/:id
DELETE /use/:id

# ordenes.
GET /orders
GET /orders/:id
POST /orders
GET /orders

# productos.
GET /products  
POST /products  
POST /products/:id  
PUT /products  
DELETE /products  
```

## Clonar

```bash
# clonar repo
$ git clone https://github.com/iraneldf/tienda-online-nest.git

# moverse a la carpeta
$ cd tienda-online-nest

```

## Detalles

```bash
para crear un user con rol admin de ser desde el endpoint: 
POST /users 
que permite especificar el rol (tiene puesto un ejemplo con rol admin)
```