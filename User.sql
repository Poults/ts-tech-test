CREATE TABLE "users" (
    [identifier] NVARCHAR PRIMARY KEY NOT NULL,
    [fullName] NVARCHAR  NOT NULL,
    [password] NVARCHAR  NOT NULL,
    [emailAddress] NVARCHAR  NOT NULL,
    [createdDate] DATETIME  NOT NULL,
    [userType] NVARCHAR  NOT NULL
);

INSERT INTO "users" 
VALUES ("1asd2f34-1fasd32-12das3452", "Kanye Test", "TopSecretPassword", "kanye.test@securepass.co.uk", datetime("2025-04-21T17:11:35.013Z"), "Parent");