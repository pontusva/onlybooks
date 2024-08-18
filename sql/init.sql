CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL, -- Firebase UID
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_author BOOLEAN DEFAULT FALSE, -- To distinguish between regular users and authors
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Authors (
    user_id INTEGER PRIMARY KEY REFERENCES Users(id),
    bio TEXT, -- Additional author-specific information
    profile_picture_url VARCHAR(255)
);

CREATE TABLE AudioFiles (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES Users(id), -- Referencing Users table
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE PurchaseCodes (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES Users(id), -- Referencing Users table
    code VARCHAR(50) UNIQUE NOT NULL,
    audio_file_id INTEGER REFERENCES AudioFiles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    is_redeemed BOOLEAN DEFAULT FALSE
);

CREATE TABLE Purchases (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id), -- Referencing Users table
    purchase_code_id INTEGER REFERENCES PurchaseCodes(id),
    audio_file_id INTEGER REFERENCES AudioFiles(id),
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);