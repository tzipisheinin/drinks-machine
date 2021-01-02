import React from 'react';
import './coins.css'

function Coin({ value , onSelect }) {
   return (
      <div class="circle" onClick={() => onSelect(value)}>
         <p>{value}</p>
      </div>
   );
}

export default function Coins({coins , onCoinSelected}) {
   return (
      <div className="coins">
         {coins.map(coin =>
            <Coin key={coin} value={coin} onSelect={onCoinSelected} />
         )}
      </div>
   );
}