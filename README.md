# CRUD API

## Description

This project implements a simple CRUD API using an in-memory database.

## Installation

Node.js is required. Version 22.9.0 is recommended.
To install the project, run the following command:

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

### Build Mode

```bash
npm run start:prod
```

### Development Mode with multiple threads

```bash
npm run start:multi
```

# Implemented Endpoints

## `api/users`

### GET `api/users`

Used to get all persons.

**Response:**

- `200 OK` with all user records.

### GET `api/users/{userId}`

Used to get a user by `userId`.

**Response:**

- `200 OK` with the user record if it exists.
- `400 Bad Request` if `userId` is invalid (not a UUID).
- `404 Not Found` if the user does not exist.

### POST `api/users`

Used to create a new user and store it in the database.

**Response:**

- `201 Created` with the newly created user record.
- `400 Bad Request` if the request body does not contain required fields.

### PUT `api/users/{userId}`

Used to update an existing user.

**Response:**

- `200 OK` with the updated user record.
- `400 Bad Request` if `userId` is invalid (not a UUID).
- `404 Not Found` if the user does not exist.

### DELETE `api/users/{userId}`

Used to delete an existing user from the database.

**Response:**

- `204 No Content` if the user is found and deleted.
- `400 Bad Request` if `userId` is invalid (not a UUID).
- `404 Not Found` if the user does not exist.

## User Object

Users are stored as objects with the following properties:

- `id` — unique identifier (string, UUID) generated on the server side.
- `username` — user’s name (string, required).
- `age` — user’s age (number, required).
- `hobbies` — user’s hobbies (array of strings or empty array, required).
