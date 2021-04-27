import React, { Component } from 'react'
import {baseUrl} from '../../baseUrl'
import Select from 'react-select'
import { connect } from 'react-redux';

export class Dropdown extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       options:[
        { value: 'chocolate', label: 'Timothy' },
        { value: 'strawberry', label: 'Okia' },
        { value: 'vanilla', label: 'James' }
      ],
      currentIndex:'Select'
    }
  }
  
  
  componentDidMount(){
    this.getItems()
  }

  onSelect(value){
    let index=this.state.options.findIndex((x)=>x.value===value.value)
    this.setState({currentIndex:index},() => this.props.setDriverToken(this.state.options[0].value))
    
  }

  getItems(){
    let options =[]
    fetch(`${baseUrl}Driver/`)
      .then(response => response.json())
      .then(items => {
        items.map((x) => {
          const tempObj = {};
          tempObj.label = x.User;
          tempObj.value = x.notificationToken;

          options.push(tempObj);
          return options;
        });

        this.setState({options})
      })
      .catch(err => console.log(err))
  }

  
  render() {
    const {options,currentIndex} =this.state
    return (
      <Select options={options} onChange={(e)=>this.onSelect(e)} value={options[currentIndex]}  />
    )
  }
}


function mapStateToProps(state) {
  return {
    driverToken: state.driverToken,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDriverToken: (token) =>
      dispatch({ type: 'SET_DRIVER_TOKEN', driverToken: token }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);





