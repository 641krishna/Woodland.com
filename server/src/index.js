const express = require('express')
const cors = require('cors')
const connection = require('./config/connection')

const productRoute = require('./feature/product/product.routes');
const userRoute = require('./feature/users/user.routes');
const cartRoute = require('./feature/cart/cart.routes');
const stripeRoute = require('./feature/stripe/stripe.routes')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/cart', cartRoute);
app.use('/checkout', stripeRoute)

app.get('/', (req, res) => res.send('hello krishna aluri'))

app.listen(8080, async () => {
    await connection();
    console.log('server started on port 8080')
});