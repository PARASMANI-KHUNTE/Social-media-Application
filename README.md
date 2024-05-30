# Social-media-Application
# Social Media Post Application

This is a social media application built using Express.js and MongoDB. It allows users to sign up, log in, create posts, and log out. The application also handles user sessions to ensure users are logged in to perform certain actions.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The application consists of an Express.js server that connects to a MongoDB Atlas database to manage user accounts and posts. Users can sign up, log in, create posts, and log out. The application also checks for active sessions to ensure users are logged in before allowing them to perform actions like creating posts.

## Features

- User signup and login
- User session management
- Create and view posts
- Logout functionality

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/PARASMANI-KHUNTE/Social-media-Application.git
    cd Social-media-Application
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```plaintext
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    ```

4. **Run the application:**
    ```bash
    npm start
    ```

## Environment Variables

- `PORT`: The port number on which the server will run (default is 3000).
- `MONGODB_URI`: The connection string for your MongoDB Atlas database.

## API Endpoints

### Serve Static Files

- **Endpoint:** `GET /`
- **Description:** Serves the `index.html` file.
- **Response:** Returns the `index.html` file.

### Home Page

- **Endpoint:** `GET /home`
- **Description:** Serves the home page if the user is logged in.
- **Query Parameters:**
    - `username`: The username of the logged-in user.
- **Response:** Returns the `home.html` file if the user is logged in; otherwise, redirects to the login page.

### User Signup

- **Endpoint:** `POST /signup`
- **Description:** Registers a new user.
- **Request Body:**
    ```json
    {
        "name": "User Name",
        "username": "username",
        "email": "user@example.com",
        "password": "password"
    }
    ```
- **Response:**
    ```json
    {
        "message": "User created successfully",
        "userToken": "generated_user_token"
    }
    ```

### User Login

- **Endpoint:** `POST /login`
- **Description:** Logs in a user.
- **Request Body:**
    ```json
    {
        "username": "username",
        "password": "password"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Login successful",
        "userToken": "user_token"
    }
    ```

### User Logout

- **Endpoint:** `POST /logout`
- **Description:** Logs out a user.
- **Request Body:**
    ```json
    {
        "username": "username"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Logout successful"
    }
    ```

### Create Post

- **Endpoint:** `POST /post`
- **Description:** Creates a new post.
- **Request Body:**
    ```json
    {
        "postTitle": "Post Title",
        "postDesc": "Post Description",
        "username": "username"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Post created successfully"
    }
    ```

### Get Posts

- **Endpoint:** `GET /posts`
- **Description:** Retrieves all posts.
- **Response:**
    ```json
    [
        {
            "username": "username",
            "postTitle": "Post Title",
            "postDesc": "Post Description",
            "date": "2024-05-30T12:34:56.789Z"
        },
        ...
    ]
    ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

### Steps to Contribute

1. **Fork the repository.**
2. **Create a new branch:**
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Make your changes.**
4. **Commit your changes:**
    ```bash
    git commit -m 'Add some feature'
    ```
5. **Push to the branch:**
    ```bash
    git push origin feature/your-feature-name
    ```
6. **Open a pull request.**

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or suggestions, feel free to contact me at:

- GitHub: [PARASMANI-KHUNTE](https://github.com/PARASMANI-KHUNTE)

Thank you for using this Social Media Post Application!

