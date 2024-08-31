const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: ".env" });

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db).then((con) => {
  console.log("Database connection is successfully");
});
const app = require("./app");
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
