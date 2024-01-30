// menghandle bussiness logic

const {
    findAllProducts,
    findProductById,
    insertProduct,
    deleteProduct,
    updateProduct
} = require("./product.repository")

const getAllProducts = async () => {
    const products = await findAllProducts();

    if (!products.length) {
        throw Error("No Products Found!");
    }
    
    return products;
};

const getProductById = async (id) => {
    const product = await findProductById(id);

    if (!product) {
        throw Error("Product not found!")
    }

    return product
};

const createNewProduct = async (newProductData) => {
    
    if (!(newProductData.name && newProductData.price && newProductData.description && newProductData.image)) {
        throw Error("Some field are missing")
    }

    const product = await insertProduct(newProductData);

    return product;
};

const deleteProductById = async (id) => {
        
    const product = await findProductById(id);

    if (!product){
        throw Error('The product was not found')
    }

    await deleteProduct(product.id);

    return deleteProduct
};

const editProductDataById = async (id, productData) => {

    const product = await findProductById(id);

    if (!product){
        throw Error('The product was not found')
    }

    const newProduct = await updateProduct(product.id, productData);

    return newProduct
};

module.exports = {
    getAllProducts,
    getProductById,
    createNewProduct,
    deleteProductById,
    editProductDataById,
};