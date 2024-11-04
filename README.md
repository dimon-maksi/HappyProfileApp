# HappyProfileApp

**HappyProfileApp** is a single-page web application built with Node.js, MongoDB, and Bootstrap, designed as a test project to demonstrate proficiency with Node.js, API integration, MongoDB data handling, and responsive UI using HTML, CSS, and Bootstrap.

## Features

### 1. User Profile
- **Profile Photo**: Users can upload a profile photo, which is displayed alongside basic profile information.
- **User Info**: Users can input and update profile details like their name and a short bio. Profile information, including the photo, is cached for quick retrieval.

### 2. Randomized Profile Status with Chuck Norris Jokes
- User profile displays a status generated from a random joke fetched from the [Chuck Norris Jokes API](https://api.chucknorris.io/).
- Users can refresh their status by clicking a button, which retrieves a new joke from the API to display as their profile status.

### 3. Feed with Posts
- **Posting**: Users can create and submit text posts to their feed, which are saved in MongoDB.
- **Liking**: Each post can be liked, providing basic engagement functionality.

### 4. Pagination for Posts
- Posts on the feed are displayed with pagination, enabling users to navigate through multiple pages of content without overloading the interface.

### 5. Toastr Notifications
- **Toastr Messages**: Instant toast notifications appear in response to user actions (e.g., saving a profile, adding a post, liking, or encountering an error).

## Project Structure
Will be soon...

## Usage

- **Profile Management**: Upload a profile photo, enter your name and bio, and save your information to be displayed on your profile page.
- **Generate Random Status**: Click the "Get New Status" button to fetch a Chuck Norris joke, which will display as your profile status.
- **Creating and Viewing Posts**: Write a post in the text field and click "Submit" to add it to your feed. Posts are displayed below, with pagination allowing navigation through multiple pages.
- **Engagement with Posts**: Click "like" to engage with posts or leave a comment to share feedback and thoughts.

## Technologies Used

- **Node.js** for server-side logic without additional frameworks.
- **MongoDB** for database storage (profiles, posts, likes, and comments).
- **Chuck Norris Jokes API** for generating random jokes as profile statuses.
- **Bootstrap** for responsive UI components.
- **Toastr.js** for displaying toast notifications.

## License

This project is licensed under the MIT License.
