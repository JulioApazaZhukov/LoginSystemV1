CREATE DATABASE loginsystem;

CREATE TABLE userbase (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL
);