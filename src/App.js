import './App.css';
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import DataTable from './Components/Tables/DataTable'
import { CSVLink } from "react-csv"
import {baseUrl} from './baseUrl'

class App extends Component {
  state = {
    items: [ {
      "url": "http://127.0.0.1:8000/requests/4/",
      "Request_id": 4,
      "Car": "http://127.0.0.1:8000/Car/1/",
      "passenger": "masikotimo@gmail.com",
      "pickup_location": "Kawanda",
      "Destination": "Police",
      "status": "pending"
  },{
    "url": "http://127.0.0.1:8000/requests/1/",
    "Request_id": 1,
    "Car": "http://127.0.0.1:8000/Car/1/",
    "passenger": "masikotimo@gmail.com",
    "pickup_location": "kawempe",
    "Destination": "gulu",
    "status": "pending"
},]
  }

  getItems(){
    fetch(`${baseUrl}requests/`)
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    alert(JSON.stringify(item))
    const itemIndex = this.state.items.findIndex(data => data.Request_id === item.Request_id)

    const newArray = [
      ...this.state.items.slice(0, itemIndex),
      item,
      ...this.state.items.slice(itemIndex + 1)
    ]
  
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.Request_id !== id)
    this.setState({ items: updatedItems })
  }

  componentDidMount(){
    this.getItems()
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Available Requests</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={this.state.items}>
              Download CSV
            </CSVLink>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App

