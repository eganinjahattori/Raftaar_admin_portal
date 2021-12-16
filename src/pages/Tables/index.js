import React from 'react'
import './style.css'
const Table = props => {
  console.log(props)
  return (
    <div className='card shadow mb-4'>
      <div className='card-header py-3'>
        <h6 className='m-0 font-weight-bold text-primary'>Customer Data</h6>
      </div>
      <div className='card-body' id='customerdata_table_card_body' style={{overflowX: 'auto'}}>
        <table class='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Phone</th>
              <th scope='col'>Date</th>
              <th scope='col'>People</th>
              <th scope='col'>Floor</th>
              <th scope='col'>Type</th>
              <th scope='col'>Age Group</th>
              <th scope='col'>Reservation</th>
            </tr>
          </thead>
          {props.data != null ? (
            <tbody>
              {props.data.map((rec, index) => {
                return (
                  <tr>
                    <td scope='row'>
                      {props.counter * props.limit + index + 1}
                    </td>
                    <td>{rec.name}</td>
                    <td>{rec.phone}</td>
                    <td>
                      {String(
                        new Date(
                          new Date(new Date(rec.visiting_date)).getTime() +
                            330 * 60000
                        )
                      ).substring(0,25)}
                    </td>
                    <td>{rec.pegs}</td>
                    <td>{rec.floor}</td>
                    <td>{rec.type}</td>
                    <td>{rec.age_group}</td>
                    <td>{rec.reservation}</td>
                  </tr>
                )
              })}
            </tbody>
          ) : (
            <div class='spinner-border text-primary' role='status'>
              <span class='sr-only'>Loading...</span>
            </div>
          )}
          {props.data && props.data.length == 0 ? (
            <span class='text-danger'>
              No Data to display for the selected dates
            </span>
          ) : null}
        </table>
      </div>
      <div
        className='card-header py-3'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h6 className='m-0 font-weight-bold text-primary'>
            Total records: {props.paginationResult}
          </h6>
        </div>
        {props.data && props.data.length > 0 ? (
          <div>
            <i
              onClick={props.movePrev}
              className='fas fa-chevron-circle-left fa-1x text-primary'
            ></i>
            <span
              style={{
                fontSize: '20px',
                margin: '0px 20px',
                fontWeight: 600
              }}
              className='text-primary'
            >
              {props.counter + 1}
            </span>

            <i
              onClick={props.moveNext}
              className='fas fa-chevron-circle-right fa-1x text-primary'
            ></i>
          </div>
        ) : null}
        <div>
          <h6 className='m-0 font-weight-bold text-primary'>
            Total pages: {Math.ceil(props.paginationResult / props.limit)}
          </h6>
        </div>
      </div>
    </div>
  )
}

export default Table
