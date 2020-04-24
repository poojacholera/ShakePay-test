import React, { useState, useEffect } from "react";
import "./styles.css";
import DisplayChart from "./components/displayChart";

export default function App() {
  const [info, setInfo] = useState([]);
  const [label, setLabel] = useState([]);
  const [ratesBtc, setRatesBtc] = useState([]);
  const [ratesEth, setRatesEth] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const API_summary = `https://shakepay.github.io/programming-exercise/web/transaction_history.json`;
  const RATEBTC_summary = `https://shakepay.github.io/programming-exercise/web/rates_CAD_BTC.json`;
  const RATEETH_summary = `https://shakepay.github.io/programming-exercise/web/rates_CAD_ETH.json`;

  const getInfo = async () => {
    const response = await fetch(API_summary);
    const data = await response.json();
    setInfo(data);

    const response1 = await fetch(RATEBTC_summary);
    const rates1 = await response1.json();
    setRatesBtc(rates1);

    const response2 = await fetch(RATEETH_summary);
    const rates2 = await response2.json();
    setRatesEth(rates2);

    await getLabels(info);
  };
  var getLabels = info => {
    var CAD_Balance = 0;
    var BTC_Balance = 0;
    var ETH_Balance = 0;
    var BTC_CAD_rate = 10608.96;
    var ETH_CAD_rate = 265.67;
    setLabel([]);
    setDataPoints([]);
    info.reverse().map((i, index) => {
      // console.log(JSON.stringify(i["createdAt"]));
      let y = new Date(i.createdAt).getFullYear();
      let m = new Date(i.createdAt).getMonth();
      let d = new Date(i.createdAt).getDate();

      let currentRateBtc = ratesBtc.filter(i => {
        let yy = new Date(i.createdAt).getFullYear();
        let mm = new Date(i.createdAt).getMonth();
        let dd = new Date(i.createdAt).getDate();
        return y === yy && m === mm && d === dd;
      });

      if (!currentRateBtc.length === 0)
        BTC_CAD_rate = currentRateBtc[0].midMarketRate;

      let currentRateEth = ratesEth.filter(i => {
        let yy = new Date(i.createdAt).getFullYear();
        let mm = new Date(i.createdAt).getMonth();
        let dd = new Date(i.createdAt).getDate();
        return y === yy && m === mm && d === dd;
      });
      if (!currentRateEth.length === 0)
        ETH_CAD_rate = currentRateEth[0].midMarketRate;

      setLabel(label => [...label, new Date(i["createdAt"]).toLocaleString()]);

      if (i.currency === "CAD" && i.direction === "credit") {
        CAD_Balance = CAD_Balance + i.amount;
      }
      if (i.currency === "CAD" && i.direction === "debit") {
        CAD_Balance = CAD_Balance - i.amount;
      }
      if (i.currency === "BTC" && i.direction === "credit") {
        BTC_Balance = BTC_Balance + i.amount;
      }
      if (i.currency === "BTC" && i.direction === "debit") {
        BTC_Balance = BTC_Balance - i.amount;
      }
      if (i.currency === "ETH" && i.direction === "credit") {
        ETH_Balance = ETH_Balance + i.amount;
      }
      if (i.currency === "ETH" && i.direction === "debit") {
        ETH_Balance = ETH_Balance - i.amount;
      }

      if (i.type === "conversion" && i.from.currency === "CAD") {
        CAD_Balance = CAD_Balance - i.from.amount;
      }
      if (i.type === "conversion" && i.from.currency === "BTC") {
        BTC_Balance = BTC_Balance - i.from.amount;
      }
      if (i.type === "conversion" && i.from.currency === "ETH") {
        ETH_Balance = ETH_Balance - i.from.amount;
      }

      if (i.type === "conversion" && i.to.currency === "CAD") {
        CAD_Balance = CAD_Balance + i.to.amount;
      }
      if (i.type === "conversion" && i.to.currency === "BTC") {
        BTC_Balance = BTC_Balance + i.to.amount;
      }
      if (i.type === "conversion" && i.to.currency === "ETH") {
        ETH_Balance = ETH_Balance + i.to.amount;
      }

      let netWorth =
        CAD_Balance + BTC_Balance * BTC_CAD_rate + ETH_Balance * ETH_CAD_rate;

      setDataPoints(dataPoints => [...dataPoints, netWorth]);
    });
  };

  return (
    <div className="App">
      <h1>Your NetWorth until today!</h1>
      <h6>Programming exercise for ShakePay</h6>
      <input type="button" onClick={getInfo} value="Show my networth" />
      <DisplayChart data={dataPoints} label={label} />
    </div>
  );
}
