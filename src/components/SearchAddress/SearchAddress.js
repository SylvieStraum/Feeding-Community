import React, { Component } from 'react';

class SearchAddress extends Component {
    // Renders the entire SearchAddress on the DOM
    state = {
        address: '',
        // building_address1: '',
        // building_address2: '',
    }

    addressInput = (event, type) => {
        console.log()
        this.setState({
            ...this.state,
            [type]: event.target.value
        })
    }

    searchAddresses = () => {
        console.log('searching:', this.state.address)
        let address = this.state.address
        // let address1 = this.state.building_address1        
        // let address2 = this.state.building_address2
        let result = this.props.dependents

        this.state.address ?
        result = result.filter(item => item.building_address1.toUpperCase().includes(address.toUpperCase()))
        :
        console.log('no address found')
        if (result.length === 0) {
            console.log('no matching address, here are other dependents', this.props.dependents)
            return false
          } else if(result.length != 0){
          console.log('found people at this address:',result)
          return true
          }
    }
    render() {
        // console.log('dependents are:', this.props.dependents)
        return (
            <div className="SearchAddress">
                <p>SearchAddress</p>
                <input
                    type="text"
                    placeholder="Address 1"
                    value={this.state.address}
                    onChange={(event) => this.addressInput(event, 'address')}
                />
                <button onClick={()=>this.searchAddresses()}>search</button>
            </div>
        );//end return
    }//end render
}//end class

export default SearchAddress;