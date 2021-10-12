import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import {baseUrl} from '../../baseUrl'
import Dropdown from './Dropdown'
import { connect } from 'react-redux';


class DataTable extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      response: '',
      post: 'gweee',
      responseToPost: '',
    }
  }

  notify(token){
    fetch(`/api/world`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ExpoToken: token,
        driverToken:this.props.driverToken
      })
    })
      .then(response => response.text())
     
      .catch(err => console.log(err))
  }
  

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch(`${baseUrl}requests/${id}/`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Request_id:id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  approveItem = (id,ExpoToken) => {
    
    fetch(`${baseUrl}requests/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'approved',
      })
    })
      .then(response => response.json())
      .then(item => {
          this.props.updateState(item)

          this.notify(ExpoToken)

      })
      .catch(err => console.log(err))

  }

  declineItem = id => {
    
    fetch(`${baseUrl}requests/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'declined',
      })
    })
      .then(response => response.json())
      .then(item => {
          this.props.updateState(item)
      })
      .catch(err => console.log(err))

  }

  componentDidMount(){
   
  }

  
  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.Request_id}>
          <th scope="row">{item.Request_id}</th>
          <td>{item.passenger}</td>
          <td>{item.pickup_location}</td>
          <td>{item.Destination}</td>
          <td>{item.status}</td>
          <td><Dropdown/></td>
          <td>
            <div style={{width:"110px"}}>
              {' '}
              <Button
                  color="warning"
                  onClick={() => this.approveItem(item.Request_id,item.notificationToken)}
                  style={{float: "left", marginRight:"10px"}}>Approve
                </Button>
                <Button color="danger" style={{ marginRight:"10px"}} onClick={() => this.deleteItem(item.Request_id)}>Del</Button>
                <Button
                  color="warning"
                  onClick={() => this.declineItem(item.Request_id)}
                  style={{ marginRight:"10px"}}>Decline
                </Button>
            </div>
          </td>
        </tr>

        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Request_id</th>
            <th>passenger</th>
            <th>pickup_location</th>
            <th>Destination</th>
            <th>status</th>
            <th>Select Driver</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)( DataTable);
