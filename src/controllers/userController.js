import User from "../models/user.js";
import Item from "../models/item.js";
import { connectDb } from "../db.js";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

async function updateItemReviews(itemCollection, rmReview) {
  const reviewedItem = await itemCollection.findOne({ _id: rmReview.Item });
  console.log("here:", reviewedItem);
  const newReviews = reviewedItem.Reviews.filter(
    (r) => r.User != rmReview.User
  );
  await itemCollection.updateOne(
    { _id: rmReview.Item },
    { $set: { Reviews: newReviews } }
  );
}

export const loginUser = async (req, res) => {
  //TODO: Error handling

  try {
    const { UserName, Password } = req.body;

    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Users");
    const user = await collection.findOne({ UserName: UserName });
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!user || !isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    req.session.user = user;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Logout route
export const logoutUser = async (req, res) => {
  //TODO: Error handling
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out", err });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
};

export const getUserAttributes = async (req, res) => {
  //TODO: Error handling
  try {
    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Users");
    const user = await collection.findOne({
      _id: new ObjectId(req.params._id),
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error getting user attributes", error });
  }
};

export const addUser = async (req, res) => {
  //TODO: Error handling

  if (req.user.Role != "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { UserName, Password, Role } = req.body;
    console.log("in user controller", UserName, Password, Role);
    const hashedPassword = await bcrypt.hash(Password, 12);
    console.log("in user controller", UserName, hashedPassword, Role);
    const newUser = new User({
      UserName: UserName,
      Password: hashedPassword,
      Role: Role,
      AverageRating: 0,
      Reviews: [],
    });

    console.log("in user controller", newUser);

    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Users");
    const result = await collection.insertOne(newUser);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while creating user" });
  }
};

export const removeUser = async (req, res) => {
  //TODO: Error handling
  if (req.user.Role != "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.params.username == req.user.UserName) {
    return res.status(401).json({ message: "You cannot delete yourself" });
  }

  try {
    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Users");
    const itemCollection = client.db("ceng495-hw1").collection("Items");

    console.log("in user controller", req.params.username);
    const query = { UserName: req.params.username };
    const dbUser = await collection.findOne(query);

    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //TODO: Delete user's reviews
    const userReviews = dbUser.Reviews;

    if (userReviews.length > 0) {
      userReviews.forEach(async (review) => {
        await updateItemReviews(itemCollection, review);
      });
    }

    const itemQuery = { Seller: dbUser._id };
    const dbItems = await itemCollection.find(itemQuery).toArray();

    if (dbItems.length > 0) {
      dbItems.forEach((item) => {
        itemCollection.deleteOne({ _id: item._id });
      });
    }

    const result = await collection.deleteOne(query);
    console.log("in user controller", result);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while deleting user" });
  }
};
