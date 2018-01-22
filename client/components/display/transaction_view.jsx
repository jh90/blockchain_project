import React from 'react';

const TransactionView = (props) => {
  return (
    <div className='transaction'>
      <table>
        <tbody>
          <tr>
            <td className='left-col'>{props.tx.direction}</td>
            <td className='right-col'>{props.tx.time}</td>
          </tr>
          <tr>
            <td className='left-col'>
              {
                props.tx.counterparties.map((cp) => {
                  return (
                    <p className='addresses'>{cp}</p>
                  );
                })
              }
            </td>
            <td className='right-col'>{props.tx.value} BTC</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TransactionView;
