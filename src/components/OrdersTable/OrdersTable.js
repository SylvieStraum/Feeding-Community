import React, { Component } from 'react';
import {connect} from 'react-redux';
import menu from '../../redux/reducers/menuReducer';


class OrdersTable extends Component {
    state = ({
      selectDay: '',
      selectMonth: '',
      startDate: '',
      endDate: '',
      selectMode: true,
      rangeSubmit: ''
    })
  
    componentDidMount() {
      // call to set the current date so that's the date that's pulled up in select menu
      this.getDate();
      this.props.dispatch({type: 'GET_MENU'});
    } //end componentDidMount

    getDate = () => {
      let today = new Date();
      let selectDay = '';
      let selectMonth = '';
      if (today.getMonth() < 10) {
        if (today.getDate() < 10) {
          selectDay = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();
          selectMonth = today.getFullYear() + '-0' + (today.getMonth() + 1);
        } else {
          selectDay = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
          selectMonth = today.getFullYear() + '-0' + (today.getMonth() + 1);
        }
      } else {
        if (today.getDate() < 10) {
          selectDay = today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + today.getDate();
          selectMonth = today.getFullYear() + '-' + (today.getMonth() + 1);
        } else {
          selectDay = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          selectMonth = today.getFullYear() + '-' + (today.getMonth() + 1);
        }
      }
      this.setState({
        selectDay: selectDay,
        selectMonth: selectMonth
      })
    }

    handleInput = (event) => {
      this.setState({
        [event.target.id]: event.target.value
      })
    }

    handleSelect = (event) => {
        if(event.target.id === "selectDay"){
          // console.log(event.target.value);
          this.setState({
            selectDay: event.target.value
          })
          this.props.dispatch({ type: 'GET_DAYS_ORDERS', payload: event.target.value });
        }
        else if(event.target.id === "selectMonth"){
          // console.log(event.target.value);
          this.setState({
            selectMonth: event.target.value
          })
          this.props.dispatch({ type: 'GET_MONTHS_ORDERS', payload: event.target.value });
        }else if(event.target.id === "rangeSubmit"){
          // console.log('startDate:' , this.state.startDate, 'endDate:' , this.state.endDate)
          let range = {startDate: this.state.startDate, endDate: this.state.endDate}
          this.props.dispatch({ type: 'GET_DATE_RANGE_ORDERS' , payload: range });
        }
    }

    changeInputState = (event) => {
      this.setState({
        selectMode: !this.state.selectMode,
      })
    }

    render() {
        return (
            <div className="OrdersTable" style={{textAlign:'center'}}>
              {/* {console.log(this.props.range, this.state.selectDay, this.state.selectMonth)} */}
              <form className="selection" >
                {this.state.selectMode ?
                  <>
                    <label for="selectDay">Get Day:</label>
                    <input type="date" id="selectDay" value={this.state.selectDay} onChange={this.handleSelect}></input>
                    <label for="rangeButton"></label>
                    <label for="selectMonth">Get Month:</label>
                    <input type="month" id="selectMonth" value={this.state.selectMonth} onChange={this.handleSelect} ></input>
                    <br/>
                    <button onClick={this.changeInputState}>Or Specify Date Range</button>
                  </>
                  :
                  <>
                    <label for="startDate">Start Date:</label>
                    <input type="date" id="startDate" value={this.state.startDate} onChange={this.handleInput}></input>
                    <label for="endDate">End Date:</label>
                    <input type="date" id="endDate" value={this.state.endDate} onChange={this.handleInput}></input>
                    <br/>
                    <button id="rangeSubmit" onClick={this.handleSelect}>Get Range</button>
                    <button onClick={this.changeInputState}>Or Get Month or Day</button>
                  </>
                }
              </form>
              <table style={{margin:'auto'}}>
                <thead>
                  <tr>
                  {this.props.range[0] &&
                    <th>Name {console.log(this.props.menu)}</th>
                  }
                    {this.props.range[0] &&
                    this.props.range[0].map((date) => 
                      <th>{date}</th>
                    )
                    }
                  </tr>
                </thead>
                <tbody>
                  {this.props.range[1] &&
                  this.props.range[1].map((dep) => {
                    return <tr key={dep.dependent_id}>
                      <td>{dep.first_name} {dep.last_name}</td>
                      {dep.dates.map((date) => {
                        let dateName = Object.keys(date)
                        let number_of_meals = date[dateName[0]].number_of_meals

                        // let meal_choice_id = (date[dateName[0]].meal_choice - 1)
                        // let meal_name = this.props.menu[meal_choice_id].menu_description
                        //console.log(dateName, date[dateName[0]], meal_name)
                        return <td key={dateName[0]}>Amount: {number_of_meals} </td>
                      })}
                    </tr>
                  })
                  }
                </tbody>
              </table>
            </div>
        );//end return
    }//end render
}//end class

const mapStateToProps = (reduxState) => ({
  range: reduxState.ordersRange,
  menu: reduxState.menu
});

export default connect(mapStateToProps)(OrdersTable);