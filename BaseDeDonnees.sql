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


INSERT INTO Users(idUser, firstName, lastName, mailAdress, passwordUser, adress, phoneNumber) VALUES
    (1, 'Bob', 'boum', 'bobBoum@gmail.com','bobboum','22 rue Jean Jaures 75019','06.42.35.15.78'),
    (2, 'John', 'Doe', 'johnDoe@gmail.com','johndoe','17 rue Lafayette 75010','07.84.56.32.15');

INSERT INTO Banker(bankerId, userId, firstName, lastName, mailAdress, passwordBanker) VALUES
    (1, 2, 'Loren', 'Ipsum', 'lorenIpsum@gmail.com','lorenipsum'),
    (2, 1, 'John', 'Wick', 'johnWick@gmail.com','johnwick');

INSERT INTO Account(idAccount, idUser, amount, accountLimit, creationDate) VALUES
    (1, 2, 1 , 0,'2014-07-18'),
    (2, 2, 250, 10,'2019-03-1'),
    (3, 1, 14500, 5000,'2016-06-23'),
    (4, 1, 7500, 1000,'2013-11-9');

INSERT INTO Transfer(idTransfer , senderId, receiverId, amount, description) VALUES
    (1, 2, 1, 75, 'Besoin d argent SVP'),
    (2, 1, 2, 450, 'Je suis pauvre');
