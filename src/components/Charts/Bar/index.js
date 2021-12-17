import React, { Component } from 'react'
import Chart from 'chart.js'

import CardBasic from '../../Cards/Basic'

class ChartBar extends Component {
  constructor (props) {
    super(props)
  }
  chartRef = React.createRef()

  componentDidMount () {
    var labels = []
    var data = []
    this.props.data.forEach(rec => {
      labels.push(rec.label)
      data.push(rec.cnt)
    })

    const myPieChart = this.chartRef.current.getContext('2d')

    new Chart(myPieChart, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#00a359', '#1cc88a', '#36b9cc', '#00a359', '#1cc88a', '#36b9cc'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf','#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: 'rgba(234, 236, 244, 1)'
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: 'rgb(0,0,0)',
          bodyFontColor: '#858796',
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10
        },
        legend: {
          display: false
        },
        cutoutPercentage: 80
      }
    })
  }

  render () {
    return (
      <CardBasic title={this.props.title}>
        <div className='chart-pie'>
          <canvas id='myPieChart' ref={this.chartRef}></canvas>
        </div>
        {/* <hr />
                    Styling for the donut chart can be found in the <code>/Components/Charts/Donut/index.js</code> file. */}
      </CardBasic>
    )
  }
}

export default ChartBar
