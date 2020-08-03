import React from 'react';
import {connect} from 'react-redux';


class OrdersTable extends Component {

    render() {
        return (
            <div className="OrdersTable">
               
            </div>
        );//end return
    }//end render
}//end class

const mapStateToProps = (reduxState) => ({
  range: reduxState.ordersRange
});

export default connect(mapStateToProps)(OrdersTable);