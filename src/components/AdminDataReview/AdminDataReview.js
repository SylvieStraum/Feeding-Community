import React, { Component } from 'react';
import { connect } from 'react-redux';
import "../AdminDataReview/AdminDataReview.css";

class AdminDataReview extends Component {

    render(){
        return(
            <>
            <h1>Admin Data Review</h1>
            <h2>DELIVERIES</h2>
            {/* <tr>
                <th>Menu</th>
            </tr>
            <p>OPTION 1:</p>
            <p>OPTION 2:</p>
            <p>VEGGIE:</p>
            <p>SPECIAL REQUESTS:</p>
            <button className="Change Menu" onClick={this.nextStep}>Change Menu</button> */}
            <table id="t01">
            <tr>
            <th>Location</th>
            <th>MEAT</th>
            <th>2nd Meat</th>
            <th>VEGGIE</th>
            <th>SPECIAL RQTS</th>
            <th>TOTAL QTY.</th>
            </tr>
            <tr>
            <td>2121 MINNEHAHA</td>
            </tr>
            <tr>
            <td>1212 S 9TH ST</td>
            </tr>
            <tr>
            <th>TOTAL:</th>
            </tr>
            </table>
            </>
        )
    }
}

export default connect()(AdminDataReview);