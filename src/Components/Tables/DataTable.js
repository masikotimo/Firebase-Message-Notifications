import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  updateItem = id => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: 'approved',
      })
    })
      .then(response => response.json())
      .then(item => {
          this.props.updateState(item)
      })
      .catch(err => alert(err))

  }

 
  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.title}</td>
          <td>{item.userId}</td>
          <td>{item.completed}</td>
          <td>
            <div style={{width:"110px"}}>
              {' '}
              <Button
                  color="warning"
                  onClick={() => this.updateItem(item.id)}
                  style={{float: "left", marginRight:"10px"}}>Approve
                </Button>
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Userid</th>
            <th>Title</th>
            <th>id</th>
            <th>completed</th>
            
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
