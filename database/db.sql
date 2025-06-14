CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password) VALUES ('Fernanda', 'fern@gmail.com', 'password123');
INSERT INTO users (name, email, password) VALUES ('Jose', 'jos3@gmail.com', 'password122')