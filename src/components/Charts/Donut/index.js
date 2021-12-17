import React, { Component } from 'react';
import Chart from "chart.js";

import CardBasic from '../../Cards/Basic';

class ChartDonut extends Component {
    constructor(props)
    {
        super(props);
    }
    chartRef = React.createRef();

    componentDidMount() {
        var labels = []
        var data = []
        this.props.data.forEach(rec => {
            labels.push(rec.type)
            data.push(rec.cnt)
        })
        console.log(labels,data)

        const myPieChart = this.chartRef.current.getContext("2d");
        // console.log(this.chartRef);

        new Chart(myPieChart, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#800020', 'green', 'cyan', 'orange'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#2e59d9'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: true
                },
                cutoutPercentage: 80,
            },
        });
    }

    render() {
        return (
            <CardBasic title={this.props.title}>
                 <div className="chart-pie">
                        <canvas id="myPieChart" ref={this.chartRef}></canvas>
                    </div>
                    {/* <hr />
                    Styling for the donut chart can be found in the <code>/Components/Charts/Donut/index.js</code> file. */}
            </CardBasic>
        )
    }
}

export default ChartDonut;