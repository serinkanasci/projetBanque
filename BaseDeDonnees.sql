CREATE TABLE IF NOT EXISTS Users (
  idUser serial PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(150) NOT NULL,
  mailAdress VARCHAR(255) NOT NULL,
  passwordUser VARCHAR(250) NOT NULL,
  adress VARCHAR(150) NOT NULL,
  phoneNumber VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Account (
  idAccount serial PRIMARY KEY,
  idUser int NOT NULL REFERENCES Users(idUser),
  amount int NOT NULL,
  accountLimit int NOT NULL,
  creationDate DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS Transfer (
  idTransfer serial PRIMARY KEY,
  senderId int NOT NULL REFERENCES Account(idAccount),
  receiverId int NOT NULL REFERENCES Account(idAccount),
  amount int NOT NULL,
  description text
);

CREATE TABLE IF NOT EXISTS Depot (
  idDepot serial PRIMARY KEY,
  creationDate DATE NOT NULL DEFAULT CURRENT_DATE,
  destinationId int NOT NULL REFERENCES Account(idAccount),
  amount int NOT NULL,
  description text
);

CREATE TABLE IF NOT EXISTS Banker (
  bankerId serial PRIMARY KEY,
  UserId int NOT NULL REFERENCES Users(idUser),
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(150) NOT NULL,
  mailAdress VARCHAR(255) NOT NULL,
  passwordBanker VARCHAR(250) NOT NULL
);
