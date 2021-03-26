import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import {baseUrl} from '../../baseUrl'


class DataTable extends Component {

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

  approveItem = id => {
    
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
 
  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.Request_id}>
          <th scope="row">{item.Request_id}</th>
          <td>{item.passenger}</td>
          <td>{item.pickup_location}</td>
          <td>{item.Destination}</td>
          <td>{item.status}</td>
          <td>
            <div style={{width:"110px"}}>
              {' '}
              <Button
                  color="warning"
                  onClick={() => this.approveItem(item.Request_id)}
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
            
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable
