import express from "express";
import itemRoutes from "./src/routes/itemRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import path from "path";
import url from "url";
import session from "express-session";
import { logoutUser } from "./src/controllers/userController.js";
import { connectDb, disconnectDb } from "./src/db.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));
const port = process.env.PORT || 3001;

app.use(
  session({
    secret: "ceng495",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);


//Routes
app.use("/items", itemRoutes);
app.use("/users", userRoutes);

async function exitHandler() {
  console.log("Closing MongoDB connection");
  await disconnectDb();
  process.exit();
}

process.on("exit", exitHandler);
process.on("SIGINT", exitHandler);

app.listen(port, () =>
  console.log(`E-Commerce app listening on port ${port}!`)
);

app.get("/", (req, res) => {
  const collection = client.db("ceng495-hw1").collection("Items");
  items = collection.find().toArray();

  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
  res.status(200).sendFile(__dirname + "/public/index.html");
});
