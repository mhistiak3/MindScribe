# MindScribe

**MindScribe** is a blog application where users can share their thoughts via blog posts. Built using **Node.js**, **Express.js**, **MongoDB**, and **EJS**, it supports user authentication, session management, and blog operations.


## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication**: Register, log in, and log out functionality.
- **Blog Management**: Create, update, delete, and view blogs.
- **Public Access**: Blogs are publicly accessible without login.
- **Profile Management**: Users can update their profiles and settings.
- **Reading List**: Authenticated users can manage a reading list.
- **Image Uploads**: Cloudinary is used to manage images for blogs.
- **Session Management**: Sessions are managed using `connect-mongo` for persistent storage.
- **Dashboard**: Authenticated users can access their personalized dashboard.
  
## Technologies
- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for routing and middleware handling.
- **MongoDB**: Database for user and blog data.
- **Mongoose**: ODM for MongoDB.
- **EJS**: Templating engine.
- **Cloudinary**: For managing image uploads.
- **connect-mongo**: Session store for managing sessions.
- **express-session**: Session store for managing sessions.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mhistiak3/MindScribe.git
   cd MindScribe
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following values:
   ```bash
   MONGO_CONNECTION_URL=<your-mongodb-connection-url>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   SESSION_SECRET=<your-session-secret>
   SESSION_MAX_AGE=86400000 # Session expiry in ms
   APP_PORT=3000
   ```

4. Start the application:
   ```bash
   npm start
   ```
   The app will be accessible at `http://localhost:3000`.

## Usage
- **Public**: Users can view blogs without registering.
- **Registered Users**: Can create, update, and delete their blogs.
- **Profile Settings**: Users can manage their profile and settings.

## API Endpoints

### Public Routes
| Method | Endpoint         | Description                         |
|--------|------------------|-------------------------------------|
| `GET`  | `/`              | Home page - View all blogs          |
| `GET`  | `/blogs/:id`      | View blog details by ID             |
| `GET`  | `/register`       | Register form                      |
| `POST` | `/register`       | Register a new user                |
| `GET`  | `/login`          | Login form                         |
| `POST` | `/login`          | Log in a user                      |
| `GET`  | `/profile`        | View and manage profile            |

### Authenticated Routes (require login)
| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| `GET`  | `/logout`             | Log out a user                       |
| `GET`  | `/createblog`         | Show blog creation form              |
| `POST` | `/createblog`         | Create a new blog                    |
| `GET`  | `/readinglist`        | View reading list                    |
| `GET`  | `/dashboard`          | Access user dashboard                |
| `GET`  | `/settings`           | View and update user settings        |
| `PUT`  | `/blogs/:id`          | Update a blog by ID                  |
| `DELETE` | `/blogs/:id`        | Delete a blog by ID                  |

## Environment Variables
Ensure to set the following environment variables:
- `MONGO_CONNECTION_URL`: MongoDB connection string.
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name.
- `CLOUDINARY_API_KEY`: Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Cloudinary API secret.
- `SESSION_SECRET`: Secret for session signing.
- `SESSION_MAX_AGE`: Session expiration time in milliseconds.
- `APP_PORT`: The port on which the app will run.

## Dependencies

The project uses the following packages:

- **bcrypt**: ^5.1.1 - For hashing passwords.
- **cloudinary**: ^2.4.0 - To handle image uploads.
- **compression**: ^1.7.4 - For compressing the response bodies.
- **connect-mongo**: ^5.1.0 - To store session data in MongoDB.
- **dotenv**: ^16.4.5 - To load environment variables.
- **ejs**: ^3.1.10 - For rendering views.
- **express**: ^4.19.2 - Node.js web framework.
- **express-session**: ^1.18.0 - Session middleware for Express.
- **highlight.js**: ^11.10.0 - Syntax highlighting for code in Markdown.
- **markdown-it**: ^14.1.0 - Markdown parser.
- **mongoose**: ^8.5.2 - MongoDB ODM.


## Contributing
Feel free to contribute by opening issues or creating pull requests.

## License
This project is licensed under the MIT License.

---

Developed by [Istiak Ahammad](https://github.com/mhistiak3).
