const express = require("express");
const Stripe = require("stripe");

require("dotenv").config();

const stripeRoute = express.Router();

const stripe = Stripe(process.env.STRIPE_KEY);

stripeRoute.post("/create-checkout-session", async (req, res) => {
    //   const { cartItems, userId } = req.body;
    const line_items = req.body.cartItems.map((item) => {
        let image = item.productId.images.split("|")[0].trim();
        // console.log(image);

        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.productId.title,
                    images: [image],
                    description: item.productId.id,
                    metadata: {
                        id: item.productId._id,
                    },
                },
                unit_amount: item.productId.price * 100,
            },
            quantity: item.quantity,
        };
    });
    // console.log(line_items);
    // console.log(`${process.env.CLIENT_URL}`)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [{ shipping_rate: "shr_1MxvGRSCg5imAGgRjohgkZ8v" }],
        line_items,
        mode: "payment",
        success_url: 'https://woodland-gules.vercel.app/checkout-success',
        cancel_url: 'https://woodland-gules.vercel.app/cart',
    });

    res.send({
        url: session.url,
    });
});

module.exports = stripeRoute;