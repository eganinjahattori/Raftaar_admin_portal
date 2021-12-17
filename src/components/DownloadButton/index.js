import React from 'react'

class DownloadButton extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <>
        <button className={this.props.buttonClassName}>{this.props.title} <i className="fas fa-arrow-circle-down"></i></button>
      </>
    )
  }
}
export default DownloadButton