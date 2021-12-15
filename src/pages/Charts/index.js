import React, { Component } from 'react'

import Sidebar from '../../components/Navigation/Sidebar'
import PageHeading from '../../components/PageHeading'

import ChartDonut from '../../components/Charts/Donut'
import ChartLine from '../../components/Charts/Line'
import ChartBar from '../../components/Charts/Bar'

class Charts extends Component {
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
                <br /><br />
              {/* <!-- Topbar --> */}
              {/* <Topbar /> */}
              {/* <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className='container-fluid'>
                {/* <!-- Page Heading --> */}
                <PageHeading title='Charts' />
                <div className='row'>
                  <div className='col-xl-12 col-lg-12'>
                    <ChartLine />
                  </div>
                  <div className='col-xl-12 col-lg-12'>
                    <ChartLine />
                  </div>
                  <div className='col-xl-12 col-lg-12'>
                    <ChartBar />
                  </div>
                  <div className='col-xl-4 col-lg-6'>
                    <ChartDonut />
                  </div>
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
