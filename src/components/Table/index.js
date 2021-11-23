import React, { useState, useEffect } from 'react'
import './style.css'

const Table = () => {
    const [customer, setCustomer] = useState([]);
    const [fromDate, setFromDate] = useState([]);
    const [toDate, setToDate] = useState([]);

    useEffect(() => {
        // fetch('https://raftaarcheckin.herokuapp.com/customer/all')
        fetch('http://18.217.196.171:7070/customer/all')
        // fetch('http://localhost:7070/customer/all')
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

    const handleExportCSV = async () => {
        const date = window.prompt("Please Enter Date Range(YY-MM-DD), Example: 2021-11-21,2021-11-23 ");
        // console.log(date);
        let fromDate = date.split(',')[0].trim();
        let toDate = date.split(',')[1].trim();
        console.log(fromDate,toDate);
        fromDate = fromDate + " 00:00:00";
        toDate = toDate + " 23:59:59";
        if(fromDate.split('-').length == 3 && toDate.split('-').length == 3)
            window.open(`http://localhost:7070/export/csv/raftaar?fromDate=${fromDate}&toDate=${toDate}`,'_blank')
        else   
            window.alert("Date Range is not in the right format");
        // 'http://localhost:7070/export/csv/raftaar'
    }

    const handleExportData = async () => {
        const date = window.prompt("Please Enter Date Range(YY-MM-DD), Example: 2021-11-21,2021-11-23 ");
        // console.log(date);
        let fromDate = date.split(',')[0].trim();
        let toDate = date.split(',')[1].trim();
        console.log(fromDate,toDate);
        fromDate = fromDate + " 00:00:00";
        toDate = toDate + " 23:59:59";
        if(fromDate.split('-').length == 3 && toDate.split('-').length == 3)
            window.open(`http://localhost:7070/export/data/raftaar?fromDate=${fromDate}&toDate=${toDate}`,'_blank')
        else   
            window.alert("Date Range is not in the right format");
        // 'http://localhost:7070/export/data/raftaar'
    }



    return (
        <div class="container-fluid">
            <h3>Raftaar Customer Data</h3>
            <br />
            <input value="Export CSV" class="btn btn-primary btn-md exportcsv_button" onClick={handleExportCSV} />
            <input value="Export Data" class="btn btn-primary btn-md" onClick={handleExportData} />
            {/* <a href="" target="_blank" class="btn btn-primary btn-md exportcsv_button">Export CSV</a>
            <a href="" target="_blank" class="btn btn-primary btn-md exportcsv_button">Export Data</a> */}
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
                                    <td><b>{cust.name}</b></td>
                                    <td>{cust.phone}</td>
                                    <td>{cust.pegs}</td>
                                    <td>{cust.floor}</td>
                                    <td>{cust.dateString}</td>
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