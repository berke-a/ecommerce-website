# CENG 495 - Homework 1

The app is deployed on `Render`.

Publicly accessible deployment URL is [https://ceng-495-hw1.onrender.com](https://ceng-495-hw1.onrender.com)

## User Guide

### Browsing Items
Items can be browsed using filtering options for the `category`. Users need to log in to view the details and leave a review for an item. After authentication, item details can be accessed, and the user can submit a review with a comment and a rating between 1 and 5.

### Login
To review and see the details of an item, you need to log in. Users can log in by filling in the `username` and `password` fields on the main page (i.e., `/`) of the app. There are no extra steps for both admin and regular users to log in. If the logged-in user's role is `admin`, an additional button will appear on the home page that routes to the admin panel. Only admin users can register a new user and item.


### Admin Capabilities
If the authenticated user is an admin, the admin page can be accessed via the `Admin Panel` button next to the "User Profile" button. The button will not be displayed if the user is not an admin.

+ Admin users can;
  * `Add an item` by filling in the fields and choosing a category. Note that `size`, `color`, and `spec` fields are exclusive to some categories; therefore, even if they are filled, they won't be displayed for the user on the item details page.
  * `Remove an item` by entering the item's name.
  * `Add a user` by entering the `UserName`, `Password`, and `Role`. If the username is already in use, an error message will be displayed.
  * `Remove a user` by entering the user's name. After removing the user, reviews made by that user will also be deleted, and the average rating will be updated accordingly.


Here is the admin account's information;
- UserName: _admin_
- Password: _admin_


## Design Choices

In this project, JavaScript was chosen as it's a widely-used language for both frontend and backend applications. It enables the creation of interactive web applications and is supported by modern web browsers.

The following frameworks were chosen:

- **Node.js**: I was somewhat familiar with `Node.js` from personal projects.
- **Express.js**
- **MongoDB**


## Models

There are two main entities in the application: `Items` and `Users`. They can be represented as separate collections in the database, with the following schema:
###

- Items:
  - ID (Primary Key)
  - Name
  - Description
  - Category
  - Seller
  - Image
  - Price
  - Additional attributes specific to the category (e.g., Size, Color, Spec, etc.)
  - Average Rating
  - Reviews 
###

- Users:
  - ID (Primary Key)
  - UserName
  - Password (hashed for security)
  - Average Rating
  - Reviews 
###

- Reviews:
  - ID (Primary Key)
  - UserID
  - ItemID
  - Rating
  - Body
###
