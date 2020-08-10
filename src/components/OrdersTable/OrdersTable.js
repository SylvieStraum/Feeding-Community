import React, { Component } from 'react';
import { connect } from 'react-redux';
import menu from '../../redux/reducers/menuReducer';
import ExportCsv from '../ExportCsv/ExportCsv'
import OrdersItem from '../OrdersItem/OrdersItem'

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
    this.props.dispatch({ type: 'GET_MENU' });
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
    let method = event.target.id;
    let value = event.target.value;
    let range = { startDate: this.state.startDate, endDate: this.state.endDate }
    this.props.dispatch({ type: 'GET_ORDERS', payload: { method: method, value: value, range: range } });
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  changeInputState = (event) => {
    this.setState({
      selectMode: !this.state.selectMode,
    })
  }
  render() {
    //this will only fire off on page load when the reducer has nothing in it so the month table will populate
    this.props.range.length === 0 && this.props.dispatch({ type: 'GET_ORDERS', payload: { method: 'selectMonth', value: this.state.selectMonth } });
    return (
      <div className="OrdersTable" style={{ textAlign: 'center', width: '90%', margin: 'auto' }}>
        <div>
          <h1>ORDERS</h1>
        </div>
        {/* {console.log(this.props.range, this.state.selectDay, this.state.selectMonth)} */}
        <form className="selection" >
          {this.state.selectMode ?
            <>
              <button onClick={this.changeInputState}>Switch to Range search</button>
              <label for="selectDay">Get Day:</label>
              <input type="date" id="selectDay" value={this.state.selectDay} onChange={this.handleSelect}></input>
              <label for="rangeButton"></label>
              <label for="selectMonth">Get Month:</label>
              <input type="month" id="selectMonth" value={this.state.selectMonth} onChange={this.handleSelect} ></input>
            </>
            :
            <>
              <button onClick={this.changeInputState}>Switch to Month/Day search</button>
              <label for="startDate">Start Date:</label>
              <input type="date" id="startDate" value={this.state.startDate} onChange={this.handleInput}></input>
              <label for="endDate">End Date:</label>
              <input type="date" id="endDate" value={this.state.endDate} onChange={this.handleInput}></input>
              <button id="rangeSubmit" onClick={this.handleSelect}>Get Range</button>

            </>
          }
        </form>
        {this.props.range[0] && <ExportCsv
          labels={this.props.range[0].map((date) => date)}
          data={this.props.range[1]}
        />
        }
        <table style={{ margin: 'auto' }}>
          <thead>
            <tr>
              <th>Name {console.log(this.props.menu)}</th>
              {this.props.range[0] &&
                this.props.range[0].map((date) =>
                  <th key={date}>{date}</th>
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
                    let dateKey = dateName[0] + '-' + dep.first_name
                    // let meal_choice_id = (date[dateName[0]].meal_choice - 1)
                    // let meal_name = this.props.menu[meal_choice_id].menu_description
                    //console.log(dateName, date[dateName[0]], meal_name)
                    return <OrdersItem key={dateKey} order={date[dateName[0]]} dependent_id={dep.dependent_id} />
                  })}
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    );//end return
  }//end render
}

const mapStateToProps = (reduxState) => ({
  range: reduxState.ordersRange,
  menu: reduxState.menu
});

export default connect(mapStateToProps)(OrdersTable);