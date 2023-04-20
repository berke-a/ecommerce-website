# CENG 495 - Homework 1

- Publicly accessible deployment URL is [`https://ceng-495-hw1.onrender.com`](https://ceng-495-hw1.onrender.com)

## How to Login
In order to login you need to fill `username` & `password` fields in the main page (i.e. `/`) of the app. Only admin users can register a new user. 

Here is the sample admin account's credentials;
- UserName: admin
- Password: admin

## Design Choices

### Infrastructure:
The application is built as a client-server model, which separates the frontend (HTML, CSS, and JavaScript) from the backend (server-side logic and database). This separation allows for easier maintenance, better scalability, and a clear separation of concerns.

The backend of the application is implemented using `Node.js`, and it utilizes a `MongoDB` database for efficient data storage and management.

There are two main entities in the application: items and users. They can be represented as separate tables in the database, with the following schema:
##
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
##
- Users:
  - ID (Primary Key)
  - UserName
  - Password (hashed and salted for security)
  - Average Rating
  - Reviews (Foreign Key referencing Reviews table)
##
- Reviews:
  - ID (Primary Key)
  - UserID (Foreign Key referencing Users table)
  - ItemID (Foreign Key referencing Items table)
  - Rating
  - Body
##
Using a relational database allows for efficient querying and ensures data integrity through the use of primary and foreign keys, as well as other constraints.

In summary, the design choices for this application focus on simplicity, modularity, and a clear separation of concerns. A client-server model is used to separate frontend and backend logic, and a relational database is used to store structured data with relationships between entities. These choices provide a solid foundation for building a scalable and maintainable application.
