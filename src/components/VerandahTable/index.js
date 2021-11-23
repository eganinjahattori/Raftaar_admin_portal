import React, { useState, useEffect } from 'react'
import './style.css'

const VerandahTable = () => {
    const [customer, setCustomer] = useState([]);
    const [fromDate, setFromDate] = useState([]);
    const [toDate, setToDate] = useState([]);

    useEffect(() => {
        // fetch('https://raftaarcheckin.herokuapp.com/customer/all')
        fetch('http://18.217.196.171:7070/customer/all/verandah')
        // fetch('http://localhost:7070/customer/all/verandah')
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
            <h3>Verandah Customer Data</h3>
            <br />
            <a href="http://18.217.196.171:7070/export/csv/verandah" target="_blank" class="btn btn-primary btn-md exportcsv_button">Export CSV</a>
            {/* <a href="http://localhost:7070/export/data/verandah" target="_blank" class="btn btn-primary btn-md exportcsv_button">Export Data</a> */}
            <br /><br />
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
                        <th scope="col">No of Pegs</th>
                        <th scope="col">Floor</th>
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
                                    <td>{cust.pegs}</td>
                                    <td>{cust.floor}</td>
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

export default VerandahTable;