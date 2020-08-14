import React from 'react';
import './MapPage.css';
import MapContainer from './map/google_map'
import MyNavBar from './Nav/myNav'
import './Nav/dropDown.css'

export default class MapPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        plant: {
          "PlantID": 1,
          "Common": "Poison Oak",
          "Scientific": "Toxicodendron Diversilobum"
        },
        dateTo: "",
        dateFrom: "",
        accuracy: 0,
        sidebarVisible: true,
    }
  }
  toggleSidebar = () => {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    })
  }
  // callback function used to get the currently selected plant
  plantCallback = (p) => {
    this.setState({plant: p})
  }
  dateToCallback = (dT) => {
    this.setState({dateTo: dT})
  }
  dateFromCallback = (dF) => {
    this.setState({dateFrom: dF})
  }
  accuracyCallback = (a) => {
    this.setState({accuracy: a})
  }

  render(){
    return (
    <div className="App">
      <body className={this.state.sidebarVisible ? "body-open" : "body-close"}>
          <MyNavBar  
            class="column"
            isVisible={this.state.sidebarVisible}
            toggleSidebar={this.toggleSidebar}
            plantCallback={this.plantCallback} 
            dateToCallback={this.dateToCallback}
            dateFromCallback={this.dateFromCallback}
            accuracyCallback={this.accuracyCallback}
          />
          <MapContainer 
            class="column"
            plant = {this.state.plant} 
            dateTo= {this.state.dateTo}
            dateFrom= {this.state.dateFrom}
            accuracy= {this.state.accuracy}
          />
      </body>
    </div>
    )};
}
