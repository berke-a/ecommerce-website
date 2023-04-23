import { connectDb } from "../db.js";
import { ObjectId } from "mongodb";

export function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Authentication required" });
  }
}

export function requireAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.Role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
}

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];

  const client = await connectDb();
  const collection = client.db("ceng495-hw1").collection("Users");
  const user = await collection.findOne({ _id: new ObjectId(token) });

  if (!user) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = user;
  next();
};
