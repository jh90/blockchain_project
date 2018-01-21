# blockchain_project

openWebSocket (address) {
    const connection = new WebSocket('wss://ws.blockchain.info/inv');
    connection.onopen = () => {
      console.log('Socket open');
      if (this.state.channelOpen) {
        const closeChannelMessage = `{'op':'addr_unsub', 'addr':'${this.state.address}'}`;
        connection.send
      }
      const openChannelMessage = {'op': 'addr_sub', 'addr': address};
      connection.send(JSON.stringify(openChannelMessage));
    };
    connection.onclose = () => {
      console.log('closed');
    }
    connection.onerror = (error) => {
      console.log(`error: ${error}`);
    };
    connection.onmessage = (message) => {
      console.log(message);
    }
  }

<ul>
        {
          props.data.transactions.map((tx) => {
            return <li>{tx.time}</li>;
          })
        }
      </ul>
