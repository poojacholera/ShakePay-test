import React, { useState, useEffect } from "react";
import "./styles.css";
import DisplayChart from "./components/displayChart";
import Button from "react-bootstrap/Button";

export default function App() {
  const [info, setInfo] = useState([]);
  const [label18, setLabel18] = useState([]);
  const [label19, setLabel19] = useState([]);
  const [label20, setLabel20] = useState([]);
  const [ratesBtc, setRatesBtc] = useState([]);
  const [ratesEth, setRatesEth] = useState([]);
  const [data, setData] = useState([]);
  const [dataPoints18, setDataPoints18] = useState([]);
  const [dataPoints19, setDataPoints19] = useState([]);
  const [dataPoints20, setDataPoints20] = useState([]);

  const API_summary = `https://shakepay.github.io/programming-exercise/web/transaction_history.json`;
  const RATEBTC_summary = `https://shakepay.github.io/programming-exercise/web/rates_CAD_BTC.json`;
  const RATEETH_summary = `https://shakepay.github.io/programming-exercise/web/rates_CAD_ETH.json`;

  useEffect(()=>{

  getInfo();
  },[API_summary, RATEBTC_summary, RATEETH_summary]);

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
   //  getLabels();
  };

  var getLabels = () => {

    var CAD_Balance = 0;
    var BTC_Balance = 0;
    var ETH_Balance = 0;
    var BTC_CAD_rate = 10608.96;
    var ETH_CAD_rate = 265.67;
    setLabel18([]);
    setDataPoints18([]);
    let month = "January";
    let counter = 0;
    info.reverse().filter((i) =>{
      let y = new Date(i.createdAt).getFullYear();
      return  y == 2018;
    }).map((i, index) => {

      let currentRate = getRate(i);
      if (!currentRate.btc.length === 0)
        BTC_CAD_rate = currentRate.btc[0].midMarketRate;
      if (!currentRate.eth.length === 0)
        ETH_CAD_rate = currentRate.eth[0].midMarketRate;

      var options = { month: 'long'};
      let dt = new Date(i["createdAt"]).getDate().toString();
      let   date = new Date(i["createdAt"]);
      dt = dt.concat(" - ");
        let mon =  new Intl.DateTimeFormat('en-US', options).format(date).toString()
       dt = dt.concat(mon);


      calculateBalance(i);
      let netWorth =  CAD_Balance + (BTC_Balance * BTC_CAD_rate) + (ETH_Balance * ETH_CAD_rate);

      if(month !== mon){
        counter = 0;
        month = mon;
      }
      if(month === mon && counter === 0){
        counter = 1;
        setLabel18(label18 => [...label18, dt]);
        setDataPoints18(dataPoints18 => [...dataPoints18, netWorth]);
      }



    });
  getData2019();
  getData2020();

    function getData2019(){
      info.filter((i) => {
        let y = new Date(i.createdAt).getFullYear();
        return y == 2019;
      }).map((i, index) => {

        let currentRate = getRate(i);
        if (!currentRate.btc.length === 0)
          BTC_CAD_rate = currentRate.btc[0].midMarketRate;
        if (!currentRate.eth.length === 0)
          ETH_CAD_rate = currentRate.eth[0].midMarketRate;


        var options = {month: 'long'};
        let day = new Date(i["createdAt"]).getDate().toString();
        let date = new Date(i["createdAt"]);
        let dt = day.concat(" - ");
        let mon = new Intl.DateTimeFormat('en-US', options).format(date).toString()
        dt = dt.concat(mon);

        //setLabel19(label19 => [...label19, dt]);
        calculateBalance(i);

        let netWorth = CAD_Balance + BTC_Balance * BTC_CAD_rate + ETH_Balance * ETH_CAD_rate;
        //setDataPoints19(dataPoints19 => [...dataPoints19, netWorth]);
        /*setData((data) => [
          ...data,
          {
            x : dt,
            y : netWorth,
          }
        ]);*/
        if (month !== mon) {
          counter = 0;
          month = mon;
        }
        if (month === mon && counter === 0) {
          counter = 1;
          setLabel19(label19 => [...label19, dt]);
          setDataPoints19(dataPoints19 => [...dataPoints19, netWorth]);
        }

      });
    }
    function getData2020(){
      info.filter((i) => {
        let y = new Date(i.createdAt).getFullYear();
        return y == 2020;
      }).map((i, index) => {

        let currentRate = getRate(i);
        if (!currentRate.btc.length === 0)
          BTC_CAD_rate = currentRate.btc[0].midMarketRate;
        if (!currentRate.eth.length === 0)
          ETH_CAD_rate = currentRate.eth[0].midMarketRate;


        var options = {month: 'long'};
        let day = new Date(i["createdAt"]).getDate().toString();
        let date = new Date(i["createdAt"]);
        let dt = day.concat(" - ");
        let mon = new Intl.DateTimeFormat('en-US', options).format(date).toString()
        dt = dt.concat(mon);

        //setLabel19(label19 => [...label19, dt]);
        calculateBalance(i);

        let netWorth = CAD_Balance + BTC_Balance * BTC_CAD_rate + ETH_Balance * ETH_CAD_rate;
        //setDataPoints19(dataPoints19 => [...dataPoints19, netWorth]);
        /*setData((data) => [
          ...data,
          {
            x : dt,
            y : netWorth,
          }
        ]);*/
        if (month !== mon) {
          counter = 0;
          month = mon;
        }
        if (month === mon && counter === 0) {
          counter = 1;
          setLabel20(label20 => [...label20, dt]);
          setDataPoints20(dataPoints20 => [...dataPoints20, netWorth]);
        }

      });
    }

    function calculateBalance(i){
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
      return null;
    }

  };

  const getRate = (i) =>{
    let y = new Date(i.createdAt).getFullYear();
    let m = new Date(i.createdAt).getMonth();
    let d = new Date(i.createdAt).getDate();

    let currentRateBtc = ratesBtc.filter(i => {
      let yy = new Date(i.createdAt).getFullYear();
      let mm = new Date(i.createdAt).getMonth();
      let dd = new Date(i.createdAt).getDate();
      return y === yy && m === mm && d === dd;
    });
    let currentRateEth = ratesEth.filter(i => {
      let yy = new Date(i.createdAt).getFullYear();
      let mm = new Date(i.createdAt).getMonth();
      let dd = new Date(i.createdAt).getDate();
      return y === yy && m === mm && d === dd;
    });
    return {
      btc:currentRateBtc,
      eth: currentRateEth
    };
  }

  return (
    <div className="App" onLoadStart={getLabels}>
      <h1>Your NetWorth until today!</h1>
      <h6>Programming exercise for ShakePay</h6>
      <Button variant="primary" onClick={getLabels} >Show my networth</Button>

      <div className='Container' style={{display:'flex',margin:'20px', padding:'10px'}}>
        <DisplayChart data18={dataPoints18} data19={dataPoints19} data20={dataPoints20} label18={label18} label19 ={label19} label20 ={label20}/>
      </div>

    </div>
  );
}
