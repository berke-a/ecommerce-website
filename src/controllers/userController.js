import User from "../models/user.js";
import Review from "../models/review.js";
import Item from "../models/item.js";
import { connectDb } from "../db.js";

export const registerUser = async (req, res) => {
  //TODO: Error handling
  try {
    const { UserName, Password, Role } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 12);
    const user = new User({ UserName, Password: hashedPassword, Role });

    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Users");
    await collection.insertOne(user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req, res) => {
  //TODO: Error handling
  try {
    const { UserName, Password } = req.body;

    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Users");
    const user = await collection.findOne({ UserName: UserName });

    if (!user || Password != user.Password) {
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
