import { put, takeEvery } from 'redux-saga/effects';

//retrieves todays orders
function* sortOrders(action) {
    try {
        function formatDate(dateInput) {
            let date = new Date(dateInput)
            //console.log(date);
            if (date.getMonth() < 10) {
                if (date.getDate() < 10) {
                    date = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-0' + date.getDate();
                    // console.log('in if, date:', date);
                } else {
                    date = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
                    // console.log('in if, date:', date);
                }
            } else {
                if (date.getDate() < 10) {
                    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-0' + date.getDate();
                    // console.log('in if, date:', date);
                } else {
                    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                    // console.log('in if, date:', date);
                }
            }
            //console.log('format:', date)
            return date
        } // END formatDate


        // function to get range of dates
        function getDates(data) {

            //creates array for dates to be pushed into
            let dateArray = [];
            let startDate = '';
            let endDate = '';
            // loops through data and get highest and lowest days
            for (let i = 0; i < data.length; i++) {
                const el = data[i].date
                // console.log(el)
                if (startDate === '' || endDate === '') {
                    startDate = el
                    endDate = el
                } else if (el < startDate) {
                    startDate = el
                    // console.log('start:', startDate)
                } else if (el > endDate) {
                    endDate = el
                    // console.log('end:', startDate)
                }
            }
            // console.log('in Redux, startDate:', startDate, 'endDate:', endDate)
            // sets current date to date type
            let currentDate = new Date(startDate);
            currentDate.setHours(1, 0, 0, 0)
            // console.log('currentDate:', currentDate);

            // sets stop date to date type
            let stopDate = new Date(endDate);
            stopDate.setHours(1, 0, 0, 0)
            // console.log('stopDate:', stopDate);

            // while loop to extract dates
            while (currentDate <= stopDate) {
                // pushes date into date array
                let date = formatDate(currentDate);

                //console.log(date)
                dateArray.push(date);
                // console.log('in while dateArray:',dateArray)
                currentDate.setDate(currentDate.getDate() + 1);
                // console.log('in while, after itterate dateArray:',dateArray)
            }
            // console.log('dateArray:', dateArray)
            return dateArray;
        } // END getDates function

        // function to getDependents
        function getDependents(data) {
            // find number of dependents
            let depArray = []
            for (let i = 0; i < data.length; i++) {
                const newDep = data[i];
                let shouldPush = true;
                for (let d = 0; d < depArray.length; d++) {
                    const oldDep = depArray[d];
                    if (newDep.dependent_id === oldDep.dependent_id) {
                        shouldPush = false;
                    }
                }
                if (shouldPush === true) {
                    depArray.push(newDep)
                }
            }
            return depArray
        } // END getDependents function

        // create output array first with empty data
        // add data into array after to retain placeholder info where data doesn't exist because dep wasn't in program
        // outputArray should look like this when done:
        // [{ dependent_id: num, name: name, address: address, [{date: date1, meal_choice: num, num_of_meals: num, order_id: id}, {date: date2, meal_choice: num, num_of_meals: num, order_id: id}]
        function defineOutputArray(data) {
            // gets range of dates returned from database
            // possibly modify later so that this is just range of dates sent into request

            // gets all dependents returned from who placed orders from that date
            let dependentArray = getDependents(data);
            //console.log(dependentArray)

            // array that will be returned at the end of the function
            let outputArray = [];

            // goes through data and creates an array
            // should first set row based on dependent, with first cell being depenedent_id
            // then set next cell as dates and have them returned as array
            // for loop that added each dependent row to array
            for (let dex = 0; dex < dependentArray.length; dex++) {

                // console.log(dependentArray[dex])

                // sets dependent info to values
                const id = dependentArray[dex].id;
                const dependent_id = dependentArray[dex].dependent_id;
                const first_name = dependentArray[dex].first_name;
                const last_name = dependentArray[dex].last_name;
                const building_address1 = dependentArray[dex].building_address1;
                const building_address2 = dependentArray[dex].building_address2;

                // creates object that will be pushed into array with dependent
                let depObj = {
                    dependent_id: dependent_id,
                    first_name: first_name,
                    last_name: last_name,
                    building_address1: building_address1,
                    building_address2: building_address2
                }
                //console.log('depObj:', depObj )

                // array that will be added to depObj
                let dateArray = new Array();

                // for loop that adds subsequent data to depObj
                for (let dateIndex = 0; dateIndex < dateRange.length; dateIndex++) {
                    const currentDate = dateRange[dateIndex];
                    //let checkDate = new Date(currentDate)
                    //console.log('currentDate:', currentDate)
                    //let formattedDate = formatDate(checkDate)
                    // let meal_name = formattedDate.concat('_meal');
                    // let number_name = formattedDate.concat('_number');

                    // establish both values outside of loop to be used when pushed into array
                    let meal_choice = null;
                    let number_of_meals = null;
                    let id = null;

                    // for loop that checks if dependent had meal on that date
                    for (let mealIndex = 0; mealIndex < data.length; mealIndex++) {
                        const dataObj = data[mealIndex];
                        let dataDate = new Date(dataObj.date);
                        // formatting dates so they can compare to each other
                        let formatDD = formatDate(dataDate);

                        //console.log('datadate:', dataDate, 'currentdate:', currentDate)
                        if (dataObj.dependent_id === dependent_id && formatDD === currentDate) {
                            // console.log(dataObj)
                            meal_choice = dataObj.meal_choice
                            number_of_meals = dataObj.number_of_meals
                            id = dataObj.id
                        }
                    }

                    dateArray.push({
                        [currentDate]: {
                            id: id,
                            number_of_meals: number_of_meals,
                            meal_choice: meal_choice
                        }
                    })
                }

                // adds dates array into depObj
                depObj["dates"] = dateArray

                // pushes depObj into outputArray
                outputArray.push(depObj)
            }
            return outputArray
        }
        // console.log(action.payload.data)// could use data from GET saga passed through with response from db
        let dateRange = getDates(action.payload.data);
        // console.log('dateRange:', dateRange );
        let orders = defineOutputArray(action.payload.data);
        // console.log('to send', [dateRange, orders])


        yield put({
            type: 'SET_RANGE_ORDERS',
            payload: [dateRange, orders]
        });
    } catch (error) {
        console.log('Get orders saga error', error);
    }
}


function* ordersSortRangeSaga() {
    yield takeEvery('SORT_ORDERS', sortOrders);
}

export default ordersSortRangeSaga;