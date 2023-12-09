const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
require("./db/db.connect");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

const authRouter = require("./routes/auth.route");
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
const adminRouter = require("./routes/admin.route");
const {
  authVerify,
  errorHandler,
  routeNotFound,
} = require("./middlewares/index");

app.use(cors());

app.use(helmet());

app.use(express.json());
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", authVerify, cartRouter);
app.use("/admin", authVerify, adminRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

app.use(errorHandler);
app.use(routeNotFound);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server started on port " + port);
});
