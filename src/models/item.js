import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Description: String,
  Price: {
    type: Number,
    required: true,
  },
  Seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Image: String,
  Size: String,
  Colour: String,
  Spec: String,
  Rating: {
    type: Number,
    default: 0,
  },
  Reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Item = model("Item", ItemSchema);

export default Item;
