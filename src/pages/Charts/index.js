import React, { Component } from 'react'
import Topbar from '../../components/Navigation/Topbar'
import Sidebar from '../../components/Navigation/Sidebar'
import PageHeading from '../../components/PageHeading'

import ChartDonut from '../../components/Charts/Donut'
import ChartLine from '../../components/Charts/Line'
import ChartBar from '../../components/Charts/Bar'

import DateRangeComponent from '../../components/DateRangePicker'

import { getDateFormatForAPICall } from '../../utils/DateUtils'

class Charts extends Component {
  constructor () {
    super()
    this.state = {
      start: getDateFormatForAPICall(
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date()
      )[0],
      end: getDateFormatForAPICall(new Date(), new Date())[1],
      checkinTrend: null,
      peopleTrend: null,
      ageTrend: null,
      reserTrend: null
    }
    this.fetchCheckinData = this.fetchCheckinData.bind(this)
  }

  fetchCheckinData = async () => {
    this.setState({
      checkinTrend: null,
      peopleTrend: null,
      ageTrend: null,
      reserTrend: null
    })

    //FETCH AND UPDATE THE STATE FOR TOTAL CHECKINS
    fetch(
      `http://18.217.196.171:7070/dashboard/customer/graph/checkin?startDate=${
        this.state.start
      }&endDate=${this.state.end}&table=${window.localStorage.getItem(
        'tableName'
      )}`
      // `http://18.217.196.171:7070/dashboard/checkin/count?startDate=${
      //   this.state.start
      // }&endDate=${this.state.end}&table=${window.localStorage.getItem(
      //   'tableName'
      // )}`
    )
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({ checkinTrend: data.data })
      })
      .catch(err => {
        console.log(err)
      })

    fetch(
      `http://18.217.196.171:7070/dashboard/customer/graph/people?startDate=${
        this.state.start
      }&endDate=${this.state.end}&table=${window.localStorage.getItem(
        'tableName'
      )}`
      // `http://18.217.196.171:7070/dashboard/checkin/count?startDate=${
      //   this.state.start
      // }&endDate=${this.state.end}&table=${window.localStorage.getItem(
      //   'tableName'
      // )}`
    )
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({ peopleTrend: data.data })
      })
      .catch(err => {
        console.log(err)
      })

    fetch(
      `http://18.217.196.171:7070/dashboard/customer/graph/reservation?startDate=${
        this.state.start
      }&endDate=${this.state.end}&table=${window.localStorage.getItem(
        'tableName'
      )}`
      // `http://18.217.196.171:7070/dashboard/checkin/count?startDate=${
      //   this.state.start
      // }&endDate=${this.state.end}&table=${window.localStorage.getItem(
      //   'tableName'
      // )}`
    )
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({ reserTrend: data.data })
      })
      .catch(err => {
        console.log(err)
      })

    fetch(
      `http://18.217.196.171:7070/dashboard/customer/graph/age?startDate=${
        this.state.start
      }&endDate=${this.state.end}&table=${window.localStorage.getItem(
        'tableName'
      )}`
      // `http://18.217.196.171:7070/dashboard/checkin/count?startDate=${
      //   this.state.start
      // }&endDate=${this.state.end}&table=${window.localStorage.getItem(
      //   'tableName'
      // )}`
    )
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({ ageTrend: data.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount () {
    this.fetchCheckinData()
  }

  render () {
    return (
      <div>
        {/* <!-- Page Wrapper --> */}
        <div id='wrapper'>
          {/* <!-- Sidebar --> */}
          <Sidebar />
          {/* <!-- End of Sidebar --> */}

          {/* <!-- Content Wrapper --> */}
          <div id='content-wrapper' className='d-flex flex-column'>
            {/* <!-- Main Content --> */}
            <div id='content'>
              {/* <br />
              <br /> */}
              {/* <!-- Topbar --> */}
              <Topbar />
              {/* <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className='container-fluid'>
                {/* <!-- Page Heading --> */}
                <div className='row'>
                  <div className='col-lg-5 col-md-7 col-12'>
                    <PageHeading title='Graphs Visualization' />
                  </div>

                  {this.state.start != null && this.state.end != null ? (
                    <div className='col-lg-5 col-md-7 col-12'>
                      <DateRangeComponent
                        displayStart={this.state.start}
                        displayEnd={this.state.end}
                        onApplyDate={async (start, end) => {
                          this.setState({
                            start: getDateFormatForAPICall(start, end)[0],
                            end: getDateFormatForAPICall(start, end)[1]
                          })
                          this.fetchCheckinData()
                        }}
                      />
                      <br />
                      <br />
                    </div>
                  ) : null}
                </div>
                <div className='row'>
                  {this.state.checkinTrend != null ? (
                    <div className='col-lg-6 col-12'>
                      <ChartLine
                        title='Checkin Trend'
                        data={this.state.checkinTrend}
                        chartLabel='Checkins'
                        lightColor='rgba(78, 115, 223, 0.3)'
                        darkColor='rgba(78, 115, 223, 1)'
                      />
                    </div>
                  ) : (
                    <div className='spinner-border text-primary' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  )}

                  {this.state.peopleTrend != null ? (
                    <div className='col-lg-6 col-12'>
                      <ChartLine
                        title='People Trend'
                        data={this.state.peopleTrend}
                        chartLabel='People'
                        lightColor='rgba(0, 163, 89, 0.3)'
                        darkColor='rgba(0, 163, 89, 1)'
                      />
                    </div>
                  ) : (
                    <div className='spinner-border text-primary' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  )}
                  {this.state.ageTrend != null ? (
                    <div className='col-lg-6 col-12'>
                      <ChartBar
                        title='Age Group trends'
                        chartLabel='Age group'
                        data={this.state.ageTrend}
                      />
                    </div>
                  ) : (
                    <div className='spinner-border text-primary' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  )}
                  {this.state.reserTrend != null ? (
                    <div className='col-lg-6 col-12'>
                      <ChartDonut
                        title='Reservation Type trends'
                        chartLabel='Reservation type'
                        data={this.state.reserTrend}
                      />
                    </div>
                  ) : (
                    <div className='spinner-border text-primary' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Charts
