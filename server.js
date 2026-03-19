import mongoose from "mongoose";
import { mongoDBURL, PORT } from "./config.js";
import app from "./app.js";

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT,() => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
