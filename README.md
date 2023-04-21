# CENG 495 - Homework 1

The app is deployed on `Render`, making it accessible to users online. 

Publicly accessible deployment URL is [`https://ceng-495-hw1.onrender.com`](https://ceng-495-hw1.onrender.com)

## How to Login
You need to login to review and see the details of the item. User can login by filling `username` & `password` fields in the main page (i.e. `/`) of the app. There isn't any extra steps to login for both admin and regular users. If the logged in user's role is `admin` then there will be an additional button in the home page that routes to admin panel. Only admin users can register a new user and item. 

Here is the admin account's credentials;
- UserName: _admin_
- Password: _admin_


## Design Choices

In this project, JavaScript was chosen as it's a widely-used language for both frontend and backend applications. It enables the creation of interactive web applications and is supported by modern web browsers.

The following frameworks were chosen:

- **Node.js**: A server-side runtime environment for executing JavaScript, offering a non-blocking architecture suitable for handling multiple requests.
- **Express.js**: A minimal web application framework for Node.js that simplifies the process of building web applications and APIs.
- **MongoDB**: A NoSQL database handling large amounts of unstructured data, offering horizontal scaling and quick query performance.


## Models

There are two main entities in the application: items and users. They can be represented as separate tables in the database, with the following schema:
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
  - Reviews (Foreign Key referencing Reviews table)
###

- Users:
  - ID (Primary Key)
  - UserName
  - Password (hashed and salted for security)
  - Average Rating
  - Reviews (Foreign Key referencing Reviews table)
###

- Reviews:
  - ID (Primary Key)
  - UserID (Foreign Key referencing Users table)
  - ItemID (Foreign Key referencing Items table)
  - Rating
  - Body
###

In summary, the design choices for this application focus on simplicity, modularity, and a clear separation of concerns. A client-server model is used to separate frontend and backend logic, with Node.js serving as the backend and MongoDB as the relational database used to store structured data with relationships between entities. These choices provide a solid foundation for building a scalable and maintainable application.
