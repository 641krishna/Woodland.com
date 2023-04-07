const express = require('express')
const cors = require('cors')
const connection = require('./config/connection')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('hello krishna aluri'))

app.listen(8080, async () => {
    await connection();
    console.log('server started on port 8080')
});