// handle request dan response

const express = require("express");

const {
    getAllProducts,
    getProductById,
    createNewProduct,
    deleteProductById,
    editProductDataById
} = require("./product.service");

const router = express.Router();

router.get("/",  async (req, res) => {
    try {
        const product = await getAllProducts();

        res.status(200).json({
            success: true,
            message: "Get all products success",
            data: product,
        });
    } catch(err){
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
    
});

router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await getProductById(parseInt(productId));

        res.status(200).json({
            success: true,
            message: "Get product success",
            data: product,
        });
    } catch(err) {
        console.log(err.message);

        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const newProductData = req.body;

        const product = await createNewProduct(newProductData);

        res.status(201).json({
            success: true,
            message: "Create new product success",
            data: product,
        });
    } catch(err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        await deleteProductById(productId);

        res.status(200).json({
            success: true,
            message: "Product has been deleted",
        });
    } catch(err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
});

// put : change all data except id of the data
router.put("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productData = req.body;

        if (!(productData.name && productData.price && productData.description && productData.image)) {
            res.status(406).json({
                success: false,
                message: "Some field are missing"
            });
        }

        const product = await editProductDataById(parseInt(productId), productData);

        res.status(200).json({
            success: true,
            message: "Edit product success",
            data: product,
        });
    } catch(err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
});

// patch : change some data not all data
router.patch("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productData = req.body;

        const product = await editProductDataById(parseInt(productId), productData);

        res.status(200).json({
            success: true,
            message: "Edit product success",
            data: product,
        })
    } catch(err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;