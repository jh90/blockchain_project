

const cleanTransactionData = function (tx) {
  // const convertedTime = tx.time;
  // const cleaninputs = tx.inputs.map((input) => {
  //   if (input.address = tx.address) {
  //     const txdirection = 'sent';
  //   }
  //   const cleaninput = {inputAddress: input.address, inputValue: input.value};
  //   return cleaninput;
  // });
  // const cleanoutputs = tx.outputs.map((output) => {
  //   if (output.address = tx.address) {
  //     const txdirection = 'received';
  //   }
  //   const cleanoutput = {outputAddress: output.address, outputValue: output.value};
  //   return cleanoutput;
  // });
  // const cleantx = { inputs: cleaninputs,
  //                    outputs: cleanoutputs,
  //                    time: convertedTime,
  //                    direction: txdirection };
  // return cleantx;
  return tx;
}

module.exports = cleanTransactionData;
