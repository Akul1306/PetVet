import mongoose from "mongoose";

const petModel = mongoose.Schema({
  name: String,
  species: String,
  breed: String,
  age: Number,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Pet = mongoose.model("Pet", petModel);
export default Pet;
