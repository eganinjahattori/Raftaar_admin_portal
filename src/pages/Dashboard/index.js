import React from 'react'
import { Link } from 'react-router-dom'
//Navigation
import Sidebar from '../../components/Navigation/Sidebar'
import Topbar from '../../components/Navigation/Topbar'

import CardInfo from '../../components/Cards/Info'

import PageHeading from '../../components/PageHeading'

import DateRangeComponent from '../../components/DateRangePicker'
import DownloadButton from '../../components/DownloadButton'

import { getDateFormatForAPICall } from '../../utils/DateUtils'
import './style.css'

class Dashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      totalcheckin: null,
      totalcustomer: null,
      categories: null,
      start: getDateFormatForAPICall(new Date(), new Date())[0],
      end: getDateFormatForAPICall(new Date(), new Date())[1],
      newFeature: new Date('2021/12/26')
    }
    this.fetchCheckinData = this.fetchCheckinData.bind(this)
    this.downloadMetricsReport = this.downloadMetricsReport.bind(this)
  }

  fetchCheckinData = async () => {
    this.setState({ totalcheckin: null, totalcustomer: null, categories: null })

    //FETCH AND UPDATE THE STATE FOR TOTAL CHECKINS
    fetch(
      // `https://raftaarnewdashbackend.herokuapp.com/dashboard/checkin/count?startDate=${this.state.start}&endDate=${this.state.end}&table=customer`
      `http://3.143.169.167:7070/dashboard/checkin/count?startDate=${
        this.state.start
      }&endDate=${this.state.end}&table=${window.localStorage.getItem(
        'tableName'
      )}`
    )
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({ totalcheckin: data.data.totalcheckin })
      })
      .catch(err => {
        console.log(err)
      })

    //FETCH AND UPDATE THE STATE FOR TOTAL CUSTOMERS
    fetch(
      // `https://raftaarnewdashbackend.herokuapp.com/dashboard/checkin/count?startDate=${this.state.start}&endDate=${this.state.end}&table=customer`
      `http://3.143.169.167:7070/dashboard/customer/count?startDate=${
        this.state.start
      }&endDate=${this.state.end}&table=${window.localStorage.getItem(
        'tableName'
      )}`
    )
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({
          totalcustomer: data.data.totalcust ? data.data.totalcust : 0
        })
      })
      .catch(err => {
        console.log(err)
      })

    //FETCH AND UPDATE THE STATE FOR TOTAL CATEGORIES
    fetch(
      // `https://raftaarnewdashbackend.herokuapp.com/dashboard/checkin/count?startDate=${this.state.start}&endDate=${this.state.end}&table=customer`
      `http://3.143.169.167:7070/dashboard/customer/reservation/type?startDate=${
        this.state.start
      }&endDate=${this.state.end}&table=${window.localStorage.getItem(
        'tableName'
      )}`
    )
      .then(res => {
        return res.json()
      })
      .then(data => {
        let result = data.data
        let zomato = 0,
          dineout = 0,
          reser = 0,
          walkin = 0
        result.forEach(res => {
          if (res.type == 'Zomato') {
            zomato = res.cnt
          }
          if (res.type == 'Reservation') {
            reser = res.cnt
          }
          if (res.type == 'Dineout') {
            dineout = res.cnt
          }
          if (res.type == 'Walkin') {
            walkin = res.cnt
          }
        })
        this.setState({
          categories: {
            zomato: zomato,
            dineout: dineout,
            reser: reser,
            walkin: walkin
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount = async () => {
    this.fetchCheckinData()
  }

  downloadMetricsReport = async () => {
    window.open(
      `http://3.143.169.167:7070/download/export/metrics?startDate=${
        this.state.start
      }&endDate=${this.state.end}&table=${window.localStorage.getItem(
        'tableName'
      )}&checkin=${this.state.totalcheckin}&people=${
        this.state.totalcustomer
      }&walkin=${this.state.categories.walkin}&zomato=${
        this.state.categories.zomato
      }&reser=${this.state.categories.reser}&dineout=${
        this.state.categories.dineout
      }`,
      '_blank'
    )
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
              {/* <!-- Topbar --> */}
              <Topbar />

              {/* LOGIC TO HIDE THE NEW FEATURE RELEASE AFTER A CERTAIN DATE   */}
              {new Date() < this.state.newFeature ? (
                <Link className='nav-link' to='/charts'>
                  <button className='newFeatureAlert btn btn-sm'>
                    Graphs Feature Released Now !! Click here.
                  </button>
                </Link>
              ) : null}


              {/* <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className='container-fluid'>
                {/* <!-- Page Heading --> */}
                <div className='row'>
                  <div className='col-lg-3 col-md-3 col-12'>
                    <PageHeading title='Metrics Data' />
                  </div>

                  {this.state.start != null && this.state.end != null ? (
                    <div className='col-lg-7 col-md-5 col-12'>
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

                  <div
                    className='col-lg-2 col-md-4 col-12'
                    onClick={this.downloadMetricsReport}
                  >
                    <DownloadButton
                      buttonClassName='btn btn-outline-info btn-sm'
                      title='Download Metrics'
                    />
                    <br />
                    <br />
                  </div>
                </div>
                {/* <!-- Content Row --> */}
                <div className='row'>
                  {this.state.totalcheckin != null ? (
                    <CardInfo
                      title='Earnings (Monthly)'
                      boxWidth='col-xl-2 col-md-6 mb-4'
                      icon='fas fa-user fa-2x'
                      color='primary'
                      value={this.state.totalcheckin}
                      data={['Total Checkins']}
                    />
                  ) : (
                    <div className='spinner-border text-primary' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  )}

                  {this.state.totalcustomer != null ? (
                    <CardInfo
                      title='Earnings (Annual)'
                      boxWidth='col-xl-2 col-md-6 mb-4'
                      icon='fas fa-user-friends fa-2x'
                      color='warning'
                      value={this.state.totalcustomer}
                      data={['Total People']}
                    />
                  ) : (
                    <div className='spinner-border text-primary' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  )}

                  {this.state.categories != null ? (
                    <CardInfo
                      title='Tasks'
                      boxWidth='col-xl-2 col-lg-3 col-md-3 mb-4'
                      icon='fas fa-walking fa-2x'
                      color='info'
                      value={this.state.categories.walkin}
                      data={['Walkin']}
                    />
                  ) : (
                    <div className='spinner-border text-primary' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  )}
                  {this.state.categories != null ? (
                    <CardInfo
                      title='Tasks'
                      boxWidth='col-xl-2 col-lg-3 col-md-3 mb-4'
                      icon='fas fa-pizza-slice fa-2x'
                      color='info'
                      value={this.state.categories.zomato}
                      data={['Zomato']}
                    />
                  ) : null}
                  {this.state.categories != null ? (
                    <CardInfo
                      title='Tasks'
                      boxWidth='col-xl-2 col-lg-3 col-md-3 mb-4'
                      icon='fas fa-book-open fa-2x'
                      color='info'
                      value={this.state.categories.reser}
                      data={['Reservation']}
                    />
                  ) : null}
                  {this.state.categories != null ? (
                    <CardInfo
                      title='Tasks'
                      boxWidth='col-xl-2 col-lg-3 col-md-3 mb-4'
                      icon='fab fa-dyalog fa-2x'
                      color='info'
                      value={this.state.categories.dineout}
                      data={['Dineout']}
                    />
                  ) : null}
                </div>
                <br />
                <Link className='nav-link' to='/data/table'>
                  View Customer Data Table
                  <sup>
                    <i className='fas fa-location-arrow'></i>
                  </sup>
                </Link>
                <br />
                <br />
                <br />
              </div>
              {/* <!-- /.container-fluid --> */}
            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
            <footer className='sticky-footer bg-white'>
              <div className='container my-auto'>
                <div className='copyright text-center my-auto'>
                  <span>
                    Copyright &copy; <a href='/'>StepCRM</a>{' '}
                    {new Date().getFullYear()}
                  </span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}
          </div>
          {/* <!-- End of Content Wrapper --> */}
        </div>
        {/* <!-- End of Page Wrapper --> */}

        {/* <!-- Scroll to Top Button--> */}
        <a className='scroll-to-top rounded' href='#page-top'>
          <i className='fas fa-angle-up'></i>
        </a>
      </div>
    )
  }
}

export default Dashboard
