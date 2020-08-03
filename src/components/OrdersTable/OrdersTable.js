import React from 'react';
import {connect} from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'
class OrdersTable extends Component {

    render() {
        return (
            <div className="OrdersTable">
               
            </div>
        );//end return
    }//end render
}//end class

const mapStateToProps = (reduxState) => ({
  today: reduxState.ordersToday
});

export default connect(mapStateToProps)(OrdersTable);