# Blogging Website with Appwrite Backend

This is a blogging website project built using React for the frontend and Appwrite as the backend service. It allows users to sign up, log in, view posts, create new posts, edit their own posts, and delete their own posts.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project serves as a platform for users to create and manage blog posts. Upon landing on the website, users are prompted to either log in or sign up. Once logged in, they are directed to the home page where they can view all posts. Users can create new posts with a title, content using the TinyMCE editor, a featured image, and set the status (active/inactive). Each post's URL is generated based on the title by converting spaces to dashes for SEO optimization.

Users have the privilege to edit or delete only the posts they have created. The project implements basic CRUD operations and user authentication using Appwrite's backend services.

## Features

- User authentication (sign up, log in, log out)
- Create, read, update, delete (CRUD) functionalities for blog posts
- Real-time content styling using TinyMCE editor
- Automatic generation of SEO-friendly post URLs (slugs)
- Differentiate between active and inactive posts
- File handling for uploading featured images

## Technologies Used

- Frontend: React
  - Redux for state management
  - React Router for navigation
  - TinyMCE for real-time content styling
- Backend: Appwrite
  - Appwrite API for user authentication and database operations
  - File management through Appwrite's file services

## Installation

1. Clone the repository: `git clone https://github.com/Hruthik-28/JustBlogIt`
2. Install dependencies: `npm install`

## Usage

1. Start the development server: `npm run dev`
2. Access the website on `http://localhost:5167`

## Screenshots
- **HOME PAGE**
<img src='https://images.pexels.com/photos/19148995/pexels-photo-19148995.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />

## Contributing

Contributions are welcome! Fork the repository, make your changes, and create a pull request.

## License

This project is licensed under the [MIT License](link-to-license).
