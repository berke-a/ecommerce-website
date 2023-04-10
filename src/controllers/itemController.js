import User from "../models/user.js";
import Review from "../models/review.js";
import Item from "../models/item.js";
import { connectDb } from "../db.js";
import { ObjectId } from "mongodb";

const isValidObjectId = (id) => {
  const validObjectIdPattern = new RegExp("^[0-9a-fA-F]{24}$");
  return validObjectIdPattern.test(id);
};

export const createItem = async (req, res) => {
  //TODO: Error handling
  try {
    const item = new Item(req.body);
    console.log("in item controller", item);

    const client = await connectDb();
    const collection = client.db("ceng495-hw1").collection("Items");
    const result = await collection.insertOne(item);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while creating item" });
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
    const query = { _id: new ObjectId(req.params.id) };
    const item = await collection.findOne(query);
    //console.log(item);
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
    const collection = client.db("ceng495-hw1").collection("Items");
    const review = new Review(req.body);
    review.User = req.user;
    console.log("in review controller", req.user);
    console.log("in review controller", review);
    const query = { _id: new ObjectId(req.params.id) };
    const item = await collection.findOne(query);
    //TODO: Add review to the user
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    item.Reviews.push(review);

    await collection.replaceOne(query, item);
    return res.status(201).json(review);
  } catch (err) {
    console.error("Error creating review:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while creating review" });
  }
};
