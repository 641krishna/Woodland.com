const ProductModel = require('./product.model');
const { search } = require("./product.routes");

const getProducts = async ({
    price,
    category,
    sort,
    orderBy,
    brand,
    limit,
    page,
    color,
    section,
    search
}) => {
    try {
        const query = {};
        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }
        if (category) {
            query.category = category;
        }
        if (color) {
            query.color = color;
        }
        if (brand) {
            query.brand = brand;
        }
        if (section) {
            query.section = section;
        }
        if (price) {
            let [min, max] = price.split(',');
            query.price = { $gte: min, $lte: max };
        }
        if (!limit) {
            limit = 10;
        }
        if (!page) {
            page = 1;
        }
        const products = await ProductModel.find(query)
            .sort({ [orderBy]: sort === 'asc' ? 1 : sort === 'desc' ? -1 : 0 })
            .limit(+limit)
            .skip((+page - 1) * limit)
            

        return {
            message: 'OK',
            Products: products,
        };
    } catch (error) {
        return {
            message: error.message,
        };
    }
};

const getProductByid = async ({ id }) => {
    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            return { message: 'Product not found' };
        }
        return { message: 'OK', Products: product }
    } catch (error) {
        return { message: error.message };
    }
};



const deleteProduct = async ({ id }) => {
    // console.log(id);
    try {
        const product = await ProductModel.findByIdAndDelete(id);
        return {
            message: "OK",
            desc: `Product with ID: ${id} deleted successfully`,
        };
    } catch (error) {
        return {
            message: "ERROR",
            desc: error.message,
        };
    }
};

module.exports = { getProducts, getProductByid, deleteProduct };