import React from 'react'
import Topbar from '../../components/Navigation/Topbar'
//Navigation
import Sidebar from '../../components/Navigation/Sidebar'
import { Link } from 'react-router-dom'
import PageHeading from '../../components/PageHeading'

import Table from '../Tables'

import DateRangeComponent from '../../components/DateRangePicker'
import DownloadButton from '../../components/DownloadButton'

import { getDateFormatForAPICall } from '../../utils/DateUtils'

import './style.css'

class DataTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      start: getDateFormatForAPICall(new Date(), new Date())[0],
      end: getDateFormatForAPICall(new Date(), new Date())[1],
      data: null,
      limit: 10,
      counter: 0,
      paginationResult: 0,
      newFeature: new Date('2021/12/26')
    }
    this.fetchUserData = this.fetchUserData.bind(this)
    this.exportContacts = this.exportContacts.bind(this)
  }

  fetchUserData = async () => {
    this.setState({ data: null })
    fetch(
      `http://18.217.196.171:7070/dashboard/customer/list?startDate=${
        this.state.start
      }&endDate=${this.state.end}&table=${window.localStorage.getItem(
        'tableName'
      )}&limit=${this.state.limit}&counter=${this.state.counter *
        this.state.limit}`
    )
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({
          data: data.data.result,
          paginationResult: data.data.paginationResult
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  exportContacts = async () => {
    window.open(
      `http://18.217.196.171:7070/download/export/contacts?startDate=${
        this.state.start
      }&endDate=${this.state.end}&table=${window.localStorage.getItem(
        'tableName'
      )}`,
      '_blank'
    )
  }

  exportData = async () => {
    window.open(
      `http://18.217.196.171:7070/download/export/data?startDate=${
        this.state.start
      }&endDate=${this.state.end}&table=${window.localStorage.getItem(
        'tableName'
      )}`,
      '_blank'
    )
  }

  componentDidMount = async () => {
    this.fetchUserData()
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
                {/* <br />
                <br /> */}
                {/* <!-- Page Heading --> */}
                <div className='row'>
                  <div className='col-lg-4 col-md-3 col-12'>
                    <PageHeading title='Customer Data' />
                  </div>

                  {this.state.start != null && this.state.end != null ? (
                    <div className='col-lg-4 col-md-5 col-12'>
                      <DateRangeComponent
                        displayStart={this.state.start}
                        displayEnd={this.state.end}
                        onApplyDate={async (start, end) => {
                          this.setState({
                            start: getDateFormatForAPICall(start, end)[0],
                            end: getDateFormatForAPICall(start, end)[1],
                            limit: 10,
                            counter: 0,
                            paginationResult: 0
                          })

                          this.fetchUserData()
                        }}
                      />
                      <br />
                      <br />
                    </div>
                  ) : null}

                  <div
                    className='col-lg-2 col-md-2 col-12'
                    onClick={this.exportContacts}
                  >
                    <DownloadButton
                      buttonClassName='btn btn-outline-info btn-sm'
                      title='Download Contacts'
                    />
                    <br />
                    <br />
                  </div>
                  <div className='col-lg-2 col-md-2 col-12' onClick={this.exportData}>
                    <DownloadButton
                      buttonClassName='btn btn-outline-info btn-sm'
                      title='Download Report'
                    />
                    <br />
                    <br />
                  </div>
                </div>
                {/* <!-- Content Row --> */}
                <div className='row'>
                  <div className='col-xl-12 col-lg-12'>
                    {/* {this.state.data.length > 0 ? ( */}
                    <Table
                      data={this.state.data}
                      limit={this.state.limit}
                      counter={this.state.counter}
                      moveNext={async () => {
                        if (
                          this.state.data.length == 0 ||
                          this.state.data.length < 10
                        ) {
                          window.alert('No more data')
                          return
                        }
                        await this.setState({
                          counter: this.state.counter + 1
                        })
                        this.fetchUserData()
                      }}
                      movePrev={async () => {
                        if (this.state.counter == 0) {
                          window.alert('Out of range')
                          return
                        }
                        await this.setState({
                          counter: this.state.counter - 1
                        })
                        this.fetchUserData()
                      }}
                      paginationResult={this.state.paginationResult}
                    />
                  </div>
                </div>
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

export default DataTable
