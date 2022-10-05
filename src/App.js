import React, { useState } from 'react';
import allCurrency from './symbols';

function App() {
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState({
    base: '',
    symbol: '',
  });

  const [inputConv, setInputConv] = useState('');

  const [conv, setConv] = useState(false);
  const [rate, setRate] = useState(false);

  const getData = () => {
    const myHeaders = new Headers();
    myHeaders.append('apikey', 'qj5ai7pPgXtdVWzDdieGk26Uvn5DPpdO');

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    fetch(
      `https://api.apilayer.com/exchangerates_data/latest?symbols=${inputs.symbol}&base=${inputs.base}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log('error', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const convCurrency = () => {
    const str = Object.values(data.rates);
    const result = Number(str).toFixed(2);

    return result;
  };

  const getSymbol = (ticker) => {
    for (let x in allCurrency) {
      if (x === ticker) {
        return allCurrency[x];
      }
    }
  };

  const calcConversion = (input) => {
    const str = Object.values(data.rates);
    const result = Number(str).toFixed(2);
    const convCurrency = Number(input) * result;
    return convCurrency.toFixed(2);
  };

  return (
    <div className="App">
      <h1 id="mainHeader">Currency Convertor</h1>
      <div id="cont">
        <div id="getRate">
          {data.base && (
            <h2>
              {'Rate: '}
              {getSymbol(data.base)}1 to {getSymbol(inputs.symbol)}
              {convCurrency()}
            </h2>
          )}
          <label>Choose the base currency (Use a valid abb.)</label>
          <input
            type="text"
            name="base"
            placeholder="example: USD"
            onChange={handleChange}
            value={inputs.base}
          />
          <label>Choose a currency (Use a valid abb.)</label>
          <input
            type="text"
            name="symbol"
            placeholder="example: GBP"
            onChange={handleChange}
            value={inputs.symbol}
          />
          <button
            onClick={() => {
              setRate(true);
              getData();
              setConv(true);
            }}
          >
            Get rate
          </button>
        </div>

        {conv ? (
          <div id="convCont">
            {data.base && (
              <h2>
                {inputConv ? getSymbol(inputs.symbol) : null}
                {inputConv ? calcConversion(inputConv) : null}
              </h2>
            )}
            <label>How many {inputs.base}?</label>
            <input
              type="text"
              placeholder={getSymbol(inputs.base)}
              onChange={(e) => setInputConv(e.target.value)}
              value={inputConv}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
