import React from 'react';

const TransactionView = (props) => {
  return (
    <div className={props.tx.direction}>
      <table>
        <tbody>
          <tr>
            <th>{props.tx.direction}
                <span className='time'>{props.tx.time}</span>
            </th>
          </tr>
          <tr>
            <td>
              {
                props.tx.counterparties.map((cp) => {
                  return (
                    <p>{cp}</p>
                  );
                })
              }
            </td>
            <td className='amount'>{props.tx.value} BTC</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TransactionView;
