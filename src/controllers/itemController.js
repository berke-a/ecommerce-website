import User from "../models/user.js";
import Item from "../models/item.js";
import { connectDb } from "../db.js";
import { ObjectId } from "mongodb";
import Review from "../models/review.js";


export const createItem = async (req, res) => {
  if (req.user.Role != "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const item = new Item(req.body);

    if (!item.Name || !item.Price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    item.Seller = req.user._id;
    item.Rating = 0;
    item.Reviews = [];

    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Items");
    const result = await collection.insertOne(item);

    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({ error: "An error occurred while creating item" });
  }
};

export const deleteItem = async (req, res) => {
  if (req.user.Role != "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.params.itemname == "") {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Items");
    const query = { Name: req.params.itemname };
    const result = await collection.deleteOne(query);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ error: "An error occurred while deleting item" });
  }
};

export const getItemsByCategory = async (req, res) => {
  try {
    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Items");
    const query = { Category: req.query.category };
    const items = await collection.find(query).toArray();
    return res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching items by category:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching items" });
  }
};

export const getItemById = async (req, res) => {
  try {
    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Items");
    const userCollection = client.db("ceng495-hw1").collection("Users");
    const query = { _id: new ObjectId(req.params.id) };
    const item = await collection.findOne(query);
    const seller = await userCollection.findOne({ _id: item.Seller });
    item.Seller = seller.UserName;
    console.log("fetched item is ", item);
    return res.status(200).json(item);
  } catch (err) {
    console.error("Error fetching item by id:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching item" });
  }
};

export const createReview = async (req, res) => {
  try {
    const client = await connectDb();
    const itemCollection = client.db("ceng495-hw1").collection("Items");
    const userCollection = client.db("ceng495-hw1").collection("Users");

    const review = new Review(req.body);
    review.User = req.user.UserName;
    review.Item = req.params.id;
    const query = { _id: new ObjectId(req.params.id) };
    const item = await itemCollection.findOne(query);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    item.Reviews.push(review);
    item.Rating =
      (item.Rating * (item.Reviews.length - 1) + review.Rating) /
      item.Reviews.length;
    await itemCollection.replaceOne(query, item);

    req.user.Reviews.push(review);
    req.user.AverageRating =
      (req.user.AverageRating * (req.user.Reviews.length - 1) + review.Rating) /
      req.user.Reviews.length;
    await userCollection.replaceOne({ _id: req.user._id }, req.user);

    return res.status(201).json(review);
  } catch (err) {
    console.error("Error creating review:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while creating review" });
  }
};
