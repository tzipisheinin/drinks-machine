const path = require('path');
const express = require('express');
const vendingMachine = require('./VendingMachine');

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '..', 'build');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    console.log("get /");
    // vendingMachine.init();
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/api/buy/:productName/:payment', (req, res) => {
    console.log("get /api/buy/");
    const { productName, payment } = req.params;
    const change = vendingMachine.purchase(productName, payment);
    res.send({change: change});
 });

app.get('/api/fill-machine', (req, res) => {
    console.log("get /api/fill-machine");
    const products = vendingMachine.productsStack;
    const coins = vendingMachine.cashbox.map(coinType => coinType.coin);
    res.send({ products, coins});
 });

app.listen(port, () => {
   console.log(`Server is up on port ${port}!`);
});