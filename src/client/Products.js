import React from 'react';

import './products.css'
import coke from '../images/coke.png'
import pepsi from '../images/pepsi.png'
import soda from '../images/soda.png'

const productsMap = {
	"coke": coke,
	"pepsi": pepsi,
	"soda": soda
}

export default function Products({title, products, onProductSelected}) {
   return (
      <div className="products-container">
         <div className="title"> {title} </div>
         <div className="products">
         {products.map(({name,price}) =>
            <div className="product">
               <img className="product-image"
                  src={productsMap[name]}
                  alt={name}
                  key={name} 
                  onClick={() => onProductSelected(name)} />
               {price}
            </div>
         )}
         </div>
      </div>
   )
}