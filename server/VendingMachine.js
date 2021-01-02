var _ = require('lodash');

class Coin {
   constructor(name, value) {
      this.name = name;
      this.value = value;
   }
}

class Product {
   constructor(name, price) {
      this.name = name;
      this.price = price;
   }
}

class VendingMachine {

   constructor() {
      this.cashbox = [
         {coin: new Coin("penny" ,1), amount: 10},
         {coin: new Coin("nickel" ,5), amount: 10},
         {coin: new Coin("dime" ,10), amount: 10},
         {coin: new Coin("quarter" ,25), amount: 10}
      ];
      this.productsStack = [
         new Product("coke", 25),
         new Product("pepsi", 35),
         new Product("soda", 45)
      ]
   }

   calculateChange(price, paymentAmount) {
      let change = paymentAmount - price;
      let changeStack = [], newChange;
      let cashboxCopy = _.cloneDeep(this.cashbox);
      if (change > 0) {
         for(let i = cashboxCopy.length - 1; i >= 0; i--) {
            let doesCoinMatch = true;
            while(cashboxCopy[i].amount > 0 && doesCoinMatch) {
               newChange = change - cashboxCopy[i].coin.value;
               if (newChange >= 0) {
                  change = newChange;
                  cashboxCopy[i].amount--;
                  changeStack.push(cashboxCopy[i].coin);
                  // if (change === 0) break;
               } else {
                  doesCoinMatch = false;
               }
            }
         }
      }
      if (change === 0) {
         this.cashbox = _.cloneDeep(cashboxCopy);
         return changeStack;
      }
      return { error: "NOT_ENOUGH_CHANGE" }
   }

   purchase(productName, paymentAmount) {
      const product = this.productsStack.find(p => p.name === productName);
      if(product.price > paymentAmount) {
         return { error: "NOT_ENOUGH_MONEY" };
      }
      const changeInCoins = this.calculateChange(product.price, paymentAmount);
      return changeInCoins;
   }
}

const vendingMachine = new VendingMachine();
module.exports = vendingMachine ;