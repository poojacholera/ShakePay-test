import React from "react";
import "../styles.css";
import {Line} from "react-chartjs-2";


export default function DisplayChart(props) {
    //console.log(props.data18);

    const data =
        {
            labels: props.label19,
            datasets: [
                {
                    labels: props.label18,
                    label: "2018",
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.15)",
                    borderColor: "rgba(75,192,192,1)",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 5,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: props.data18
                },
                {
                    label: "2019",
                    fill: true,
                    data: props.data19,
                    backgroundColor: "rgba(246,34,3,0.15)",
                    borderColor: "rgba(245,112,149,0.49)",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 5,
                    pointRadius: 1,
                    pointHitRadius: 10,
                },
                {
                    labels: props.label20,
                    label: "2020",
                    fill: true,
                    backgroundColor: "rgba(123,252,125,0.13)",
                    borderColor: "rgb(94,189,73)",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 5,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: props.data20
                },

            ]
        };

    const lineOptions = {
        stacked: false,
        hover: {
            // String - We use a label hover mode since the x axis displays data by the index in the dataset
            mode: "label"
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: true
                    }
                }
            ],
            yAxes: [
                {
                    stacked: false,
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        beginAtZero: false,
                        // Return an empty string to draw the tick line but hide the tick label
                        // Return `null` or `undefined` to hide the tick line entirely
                        userCallback(value) {
                            // Convert the number to a string and split the string every 3 characters from the end
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);

                            // Convert the array to a string and format the output
                            value = value.join(",");
                            return `CAD ${value}`;
                        }
                    }
                }
            ]
        },
        legend: {
            display: true,
            labels: {
                boxWidth: 40,
            },
            position: 'top'
        },
        tooltips: {
            enabled: true,
            mode: 'nearest',
            intersect: true,
        },

    };
    const data18 = {
        labels: props.label18,
        datasets:
            [{
                data: props.data18,
                label: "2018",
                backgroundColor: "rgba(246,34,3,0.65)",
                borderColor: "rgb(255,3,74)",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
            }],
    }
    const data19 = {
        labels: props.label19,
        datasets:
            [{
                data: props.data19,
                label: "2019",
                backgroundColor: "rgba(246,34,3,0.65)",
                borderColor: "rgb(255,3,74)",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
            }],
    }
    const data20 = {
        labels: props.label20,
        datasets:
            [{
                data: props.data20,
                label: "2020",
                backgroundColor: "rgba(246,34,3,0.65)",
                borderColor: "rgb(255,3,74)",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
            }],
    }
    return (
        <div className="chartContainer" style={{display:'flex',margin:'20px'}}>
            <h1>line chart</h1>
            <Line data={data} options={lineOptions} width={300} height={98}/>
            <br/>
            <hr/>
            <Line data={data18} options={lineOptions}  height={99}/>
            <br/>
            <hr/>
            <Line data={data19} options={lineOptions} height={99}/>
            <br/>
            <hr/>
            <Line data={data20} options={lineOptions} height={99}/>
        </div>
    );
}
