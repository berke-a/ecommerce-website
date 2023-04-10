import { MongoClient } from "mongodb";
import { ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://admin:admin@ceng495-hw1-cluster.lntqf0h.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
export async function connectDb() {
  if (!client.isConnected) {
    await client.connect();
  }
  return client;
}
