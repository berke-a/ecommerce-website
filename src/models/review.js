import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
