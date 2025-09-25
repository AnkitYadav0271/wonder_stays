const mongoose = require("mongoose");
const Listing = require("../models/listing.model.js");
const initData = require("./data.js");

const MONGO_URI = "mongodb://127.0.0.1:27017/wonderstays";
async function main() {
  await mongoose.connect(MONGO_URI);
}

main()
  .then((res) => console.log("Mongo connection established"))
  .catch((err) => console.log(err));

async function insert() {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
   user : "68d4a904eae32504dabd40ec",
  }));
  await Listing.insertMany(initData.data);
}

insert()
  .then(() => console.log("insertion success"))
  .catch((err) => console.log(err));
