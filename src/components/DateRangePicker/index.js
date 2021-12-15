import React from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'

class DateRangeComponent extends React.Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.handleCallback = this.handleCallback.bind(this)
  }
  //   handleEvent (event, picker) {
  //     console.log(picker.startDate)
  //   }
  handleCallback (start, end, label) {
    this.props.onApplyDate(start._d, end._d)
  }
  render () {
    return (
      <DateRangePicker
        onEvent={this.handleEvent}
        onCallback={this.handleCallback}
        initialSettings={{
          ranges: {
            Today: [moment(), moment()],
            Yesterday: [
              moment().subtract(1, 'days'),
              moment().subtract(1, 'days')
            ],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [
              moment()
                .subtract(1, 'month')
                .startOf('month'),
              moment()
                .subtract(1, 'month')
                .endOf('month')
            ]
          }
        }}
      >
        <button class='btn btn-success'>Choose Dates: ( {this.props.displayStart} - {this.props.displayEnd} )</button>
      </DateRangePicker>
    )
  }
}

export default DateRangeComponent
