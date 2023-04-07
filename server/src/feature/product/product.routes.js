const express = require('express');
const {
    getProducts,
    getProductByid,
    deleteProduct
} = require('./product.controller');

const productRoute = express.Router();

productRoute.get('/', async (req, res) => {
    const {
        price,
        category,
        sort,
        orderBy,
        brand,
        limit,
        page,
        color,
        search,
        section
    } = req.query;
    try {
        const { Products, message } = await getProducts({
            price,
            category,
            sort,
            orderBy,
            brand,
            limit,
            page,
            color,
            search,
            section
        });
        if (message != 'OK') {
            return res.status(404).send({ message: message });
        } else {
            return res.status(200).send({ message: message, Products });
        }
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
});

productRoute.get("/:id", async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
        const { Products, message } = await getProductByid({ id });
        if (message != "OK") {
            return res.status(404).send({ message: message });
        } else {
            return res.status(200).send({ message: message, Products });
        }
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
});

productRoute.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { message, desc } = await deleteProduct({ id });
        if (message != "OK") {
            return res.status(404).send(desc);
        } else {
            return res.status(200).send(desc);
        }
    } catch (error) {
        return res.send(error.message);
    }
});

module.exports = productRoute;