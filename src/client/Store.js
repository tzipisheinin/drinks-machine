async function httpGet(url) {
    const res = await fetch('/api' + url);
    return res.json();
}

class VedingMachine {

   async fill() {
      const { products, coins } = await httpGet("/fill-machine");
      const coinsValues = coins.map(coin => coin.value);
      return  { cashbox: coinsValues, products };
   }

   async buy(productName, payment) {
      const { change } = await httpGet('/buy/' + productName + '/' + payment);
      return change;
	}
}

const vedingMachine = new VedingMachine();
export default vedingMachine;