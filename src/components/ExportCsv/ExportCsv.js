import React, { Component } from 'react'
import { CSVLink, CSVDownload } from "react-csv";
import { number } from 'prop-types';

class ExportCsv extends Component {


    render() {
        let csvData = [
            ["Name", ...this.props.labels],
            ...this.props.data.map(dep => {
                return [`${dep.first_name} ${dep.last_name}`, ...dep.dates.map((date, i) => date[Object.keys(date)[0]]['number_of_meals'], )]
            } )
        ];
        console.log('export csv data', csvData)
        return (
            <div>
         <CSVLink data={csvData}>Download table as CSV</CSVLink>
            </div>
        )
    }
}

export default ExportCsv