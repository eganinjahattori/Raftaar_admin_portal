import React, { useState, useEffect } from 'react'
import './style.css'

const Table = () => {
    const [customer, setCustomer] = useState([]);
    const [fromDate, setFromDate] = useState([]);
    const [toDate, setToDate] = useState([]);

    useEffect(() => {
        // fetch('https://raftaarcheckin.herokuapp.com/customer/all')
        fetch('http://18.217.196.171:7070/customer/all')
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                setCustomer(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    let i = 0;

    const handleFromDate = (val) => {
        setFromDate(val.target.value);
    }
    const handleToDate = (val) => {
        setToDate(val.target.value);
    }
    const handleDateRangeSubmit = () => {
        console.log("Submitted");
    }
    


    return (
        <div class="container-fluid">
            <h4>Customer Data</h4>
            {/* <span>Filters: </span>
            <input onChange={(val) => handleFromDate(val)} placeholder="From Date(YYYY-MM-DD)" class="table_component_filter_date" /> 
            <input onChange={(val) => handleToDate(val)} placeholder="To Date(YYYY-MM-DD)" class="table_component_filter_date" />
            <input onClick={handleDateRangeSubmit} value="Submit" class="btn btn-primary btn-sm table_component_filter_date_btn"/> */}
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Visiting Date(YYYY-MM-DD)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customer.map(cust => {
                            ++i;
                            return (
                                <tr>
                                    <th scope="row">{i}</th>
                                    <td>{cust.name}</td>
                                    <td>{cust.phone}</td>
                                    <td>{cust.email}</td>
                                    <td>{cust.gender}</td>
                                    <td>{cust.visiting_date.substr(0, 10)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
};

export default Table;