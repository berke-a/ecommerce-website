import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";

const ReviewSchema = new Schema({
  User: {
    type: String,
    required: true,
  },
  Item: {
    type: ObjectId,
    required: true,
  },
  Body: {
    type: String,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
  },
});

const Review = model("Review", ReviewSchema);

export default Review;
