import React, { Component } from 'react';
import Coins from './Coins'
import Products from './Products'
import vendingMachine from './Store';

import './app.css';

const errorsMap = {
  "NOT_ENOUGH_CHANGE": "Sorry, we don't have enough change for you :(",
  "NOT_ENOUGH_MONEY": "You didn't insert enough money for that"
}

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { change: null,
                   insertedPayment: 0,
                   errorMessage: null,
                   products: [],
                   cashbox: [] }; 
  }

  componentDidMount() {
    vendingMachine.fill()
      .then(({products, cashbox}) => {;
      this.setState({products: products,
      cashbox: cashbox});
    });
  }

  showError = (error) => {
    const clearMesssage = () => this.setState({errorMessage: null});
    this.setState({ errorMessage: errorsMap[error]},
      () => setTimeout(clearMesssage, 2000));
  }

  setChange = (change) => {
    let changeInString = 0, total = 0;
    if (change.length > 0) {
      changeInString = change.map(coin => {
        total+= coin.value;
        return coin.value
      }).join();
    }
    this.setState({ change: changeInString, total , insertedPayment: 0});
  }

  buyDrink = async (drinkName) => {
    const payment = this.state.insertedPayment;
    const change =  await vendingMachine.buy(drinkName,payment);
    if (change.error) {
      this.showError(change.error);
    } else {
      this.setChange(change);
    }
  }

  handleCoinSelected = (coin) => {
    const currentPayment = this.state.insertedPayment;
    this.setState({insertedPayment: currentPayment + coin});
  }

  resetPayment = () => {
    this.setState({insertedPayment: 0 });
  }

  render() {
    const { cashbox, products, change, total, insertedPayment, errorMessage } = this.state;    return (
      <div className="vending-machine">
        <Coins coins={cashbox} onCoinSelected={this.handleCoinSelected}/>
        <div className="total">
          {`Inserted money: ${insertedPayment}`}
          <a className="reset" onClick={this.resetPayment}>Reset</a>
        </div>
        {errorMessage && 
          <div className="error-message">{errorMessage}</div>}
        {change != null && 
          <div>{`Your change is: ${change} | Total: ${total}`}</div>}
        <Products title="Select drink" products={products} onProductSelected={this.buyDrink} />
      </div>
    );
  }
}
