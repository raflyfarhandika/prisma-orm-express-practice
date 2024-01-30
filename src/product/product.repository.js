// Komunikasi dengan database
// ORM dan raw query

const prisma = require("../db");

const findAllProducts = async () => {
    const products = await prisma.product.findMany();

    return products;
};

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    });

    return product;
};

const insertProduct = async (newProduct) => {
    const product = await prisma.product.create({
        data: {
            name:  newProduct.name,
            description: newProduct.description,
            price: newProduct.price,
            image: newProduct.image
        },
    });

    return product;
};

const deleteProduct = async (id) => {
    const product = await prisma.product.delete({
        where: {id}
    });

    return product;
};

const updateProduct = async (id, newProductData) => {
    const product = await prisma.product.update({
        where: {id},
        data: {
            name:  newProductData.name,
            description: newProductData.description,
            price: newProductData.price,
            image: newProductData.image
        },
    });

    return product;
};

module.exports = {
    findAllProducts,
    findProductById,
    insertProduct,
    deleteProduct,
    updateProduct
};