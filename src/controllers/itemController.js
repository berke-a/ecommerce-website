import User from "../models/user.js";
import Item from "../models/item.js";
import { connectDb } from "../db.js";
import { ObjectId } from "mongodb";
import Review from "../models/Review.js";

const isValidObjectId = (id) => {
  const validObjectIdPattern = new RegExp("^[0-9a-fA-F]{24}$");
  return validObjectIdPattern.test(id);
};

export const createItem = async (req, res) => {
  //TODO: Error handling
  if (req.user.Role != "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const item = new Item(req.body);
    item.Seller = req.user._id;
    console.log("in item controller", item);

    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Items");
    const result = await collection.insertOne(item);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while creating item" });
  }
};

export const deleteItem = async (req, res) => {
  //TOOD: Error handling
  if (req.user.Role != "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Items");
    const query = { Name: req.params.itemname };
    const result = await collection.deleteOne(query);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while deleting item" });
  }
};

export const getItemsByCategory = async (req, res) => {
  //TODO: Error handling
  try {
    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Items");
    const query = { Category: req.query.category };
    const items = await collection.find(query).toArray();
    return res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching items:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching items" });
  }
};

export const getItemById = async (req, res) => {
  //TODO: Error handling
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
    console.error("Error fetching item:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching item" });
  }
};

export const createReview = async (req, res) => {
  //TODO: Error handling
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
