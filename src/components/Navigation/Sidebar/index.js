import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clickMenuOpen } from '../../../redux/actions'

import './style.css'

class Sidebar extends Component {
  // componentDidMount() {
  //   document.getElementById('body').className = 'page-top';
  // }
  // state = {
  //   sidebarToggled: false,
  // }

  // handleSideBarToggle() {
  //   if (this.sidebarToogled === true) {
  //     this.setState({ sidebarToggled: !this.state.sidebarToggled });
  //     document.getElementById('body').className = 'page-top sidebar-toggled';
  //   } else {
  //     this.setState({ sidebarToggled: !this.state.sidebarToggled });
  //     document.getElementById('body').className = 'page-top';
  //   }

  // }

  render () {
    const { clickMenuOpen, toggled } = this.props
    return (
      <ul
        className={
          toggled
            ? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
            : 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled'
        }
        id='accordionSidebar'
      >
        {/* <!-- Sidebar - Brand --> */}
        <a
          className='sidebar-brand d-flex align-items-center justify-content-center'
          href='/dashboard'
        >
          <div className='sidebar-brand-icon rainbow-bg rotate-n-15'>
            <i className='fas fa-database '></i>
          </div>
          <div className='sidebar-brand-text mx-3'>
            STEP CRM <sup>v2</sup>
          </div>
        </a>

        {/* <!-- Divider --> */}
        <hr className='sidebar-divider my-0' />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className='nav-item'>
          <Link className='nav-link' to='/dashboard'>
            <i
              className='fas fa-fw fa-tachometer-alt'
              id={window.location.pathname == '/dashboard' ? 'activeNav' : null}
            ></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className='sidebar-divider' />

        {/* <!-- Heading --> */}
        <div className='sidebar-heading'>Data</div>

        {/* <!-- Nav Item - Pages Collapse Menu --> */}
        {/* <li className="nav-item">
          <a className='nav-link collapsed' href="#" data-toggle="collapse" data-target="#collapseTwo"  aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog"></i>
            <span>Components</span>
          </a>
          <div id="collapseTwo" className='collapse' aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <a className="collapse-item" href="buttons.html">Buttons</a>
              <Link className="collapse-item" to="/cards">Cards</Link>
            </div>
          </div>
        </li> */}
        <li className='nav-item'>
          <Link className='nav-link' to='/data/table'>
            <i
              className='fas fa-fw fa-table'
              id={
                window.location.pathname == '/data/table' ? 'activeNav' : null
              }
            ></i>
            <span>Data Table</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/charts'>
            <i
              className='fas fa-fw fa-chart-area'
              id={
                window.location.pathname == '/charts' ? 'activeNav' : null
              }
            ></i>
            <span>Charts</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/comingsoon'>
            <i className='fas fa-fw fa-chart-area'></i>
            <span>Reports</span>
          </Link>
        </li>

        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
        {/* <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
            <i className="fas fa-fw fa-wrench"></i>
            <span>Utilities</span>
          </a>
          <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Utilities:</h6>
              <a className="collapse-item" href="utilities-color.html">Colors</a>
              <a className="collapse-item" href="utilities-border.html">Borders</a>
              <a className="collapse-item" href="utilities-animation.html">Animations</a>
              <a className="collapse-item" href="utilities-other.html">Other</a>
            </div>
          </div>
        </li> */}

        {/* <!-- Divider --> */}
        <hr className='sidebar-divider' />

        {/* <!-- Heading --> */}
        {/* <div className="sidebar-heading">
          Addons
        </div> */}

        {/* <!-- Nav Item - Charts --> */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/charts">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Charts</span></Link>
        </li> */}

        {/* <!-- Nav Item - Tables --> */}
        {/* <li className="nav-item">
          <a className="nav-link" href="tables.html">
            <i className="fas fa-fw fa-table"></i>
            <span>Tables</span></a>
        </li> */}

        {/* <!-- Divider --> */}
        {/* <hr className="sidebar-divider d-none d-md-block" /> */}

        {/* <!-- Sidebar Toggler (Sidebar) --> */}
        <div className='text-center d-none d-md-inline'>
          <button
            onClick={() => {
              clickMenuOpen()
            }}
            className='rounded-circle border-0'
            id='sidebarToggle'
          ></button>
        </div>
      </ul>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickMenuOpen }, dispatch)

const mapStateToProps = store => ({
  toggled: store.menuState.menuOpen
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
