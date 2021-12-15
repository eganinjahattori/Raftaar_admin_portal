import React, { Component } from 'react'

class CardInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value,
      title: this.props.title,
      icon: 'fas fa-calendar fa-2x text-gray-300',
      color: 'primary',
      cardClass: '',
      titleClass: ''
    }
  }

  componentDidMount () {
    this.setState({
      cardClass: `card border-left-${this.props.color} shadow h-100 py-2`
    })
    this.setState({ icon: `fas fa-${this.props.icon} fa-2x text-gray-300` })
    this.setState({
      titleClass: `text-xs font-weight-bold text-${this.props.color} text-uppercase mb-1`
    })
  }

  render () {
    return (
      <>
        <div className={this.props.boxWidth}>
          <div className={this.state.cardClass}>
            <div className='card-body'>
              <div className='row no-gutters align-items-center'>
                {this.props.data.map(d => {
                  return (
                    <div className='col mr-2'>
                      <div className={this.state.titleClass}>
                        {d}
                      </div>
                      <div className='h5 mb-0 font-weight-bold text-gray-800'>
                        {this.state.value}
                      </div>
                    </div>
                  )
                })}
                <div className='col-auto'>
                  <i className={this.props.icon}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default CardInfo
