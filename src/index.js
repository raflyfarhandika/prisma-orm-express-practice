const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

const productController = require("./product/product.controller");

app.use("/api/products",  productController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
