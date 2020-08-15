import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import React from 'react';
import './map.css'

/*
@state
showingInfoWindow: whether or not a marker info window is visible
activeMarker: current clicked marker
selectedPlace: information (longitude/latitude/...) of current marker
points: occurrences of current plant 
occurrences in form -> {OccurrenceID, Date, Accuracy, Latitude, Longitude, PlantID}
isLoaded: whether or not points have been fetched from database

@props
plant: current plant information
plant in form -> {PlantID, Scientific, Common}
*/

class MapContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      points: [],
      isLoaded: false,
    }
  }

  // fetch the occurrences of the current plant
  fetchOccurrences() {
    const baseURL = "http://localhost:8000/occurrences"
    let queryString = "?id=" + this.props.plant.PlantID
    queryString = queryString + "&datefrom=" + this.props.dateFrom.replace(/-/g,"")
    queryString = queryString + "&dateto=" + this.props.dateTo.replace(/-/g,"")
    queryString = queryString + "&acc=" + this.props.accuracy
    console.log(queryString)
    this.setState({
      points:[]
    })
    fetch(baseURL + queryString)
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                isLoaded: true,
                showingInfoWindow:false,
                points: result
            });
            },
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        )
  }

  // on first load, fetch occurrences from database
  componentDidMount() {
    this.fetchOccurrences()
  }

  // on updates, fetch occurrences from database if the plantID has changed
  componentDidUpdate(prevProps) {
    if(prevProps.plant.PlantID !== this.props.plant.PlantID || 
        prevProps.dateFrom !== this.props.dateFrom ||
        prevProps.dateTo !== this.props.dateTo ||
        prevProps.accuracy !== this.props.accuracy
        ){
      this.fetchOccurrences()
    }
  }
  
  // callback if marker is clicked
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  render() {

    const { error, isLoaded, points } = this.state;

    // uncomment bounds in return for it to be automatically bounded to the displayed points
    // commented out because it causes weird zooms due to dynamically changing inputs
    var bounds = new this.props.google.maps.LatLngBounds()
    if(error){
        return <div>Error: {error.message} occurrences</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
      return  (
        <div className="map">
          <Map
              google={this.props.google}
              zoom={5}
              initialCenter={{
                lat:39.8283,
                lng:-98.5795
              }}
              //bounds={bounds}
              >
                {isLoaded ? points.map((point, i) => 
                {
                  bounds.extend({lat:point.Latitude,lng:point.Longitude})
                  return (<Marker
                    icon={{
                      url:require("./plant.png"),
                      scaledSize: { width: 64, height: 64 }
                    }}
                    key={point.OccurrenceID}
                    position={{lat:point.Latitude, lng:point.Longitude}}
                    scientific={this.props.plant.Scientific}
                    common={this.props.plant.Common}
                    date={point.Date}
                    acc={point.Accuracy}
                    onClick={this.onMarkerClick}
                  />)}
                ) : null}
                <InfoWindow 
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                      <div>
                        <b>
                        <p>{this.state.selectedPlace.scientific}</p>
                        <p>{this.state.selectedPlace.common}</p>
                        <p>{this.state.selectedPlace.date}</p>
                        <p>{"accuracy: " + Math.trunc(this.state.selectedPlace.acc * 100) + "%"}</p>
                        <p>{this.state.showingInfoWindow ? "lat: " + this.state.selectedPlace.position["lat"] : ""}</p>
                        <p>{this.state.showingInfoWindow ? "lng: " + this.state.selectedPlace.position["lng"] : ""}</p>
                        </b>
                      </div>
                  </InfoWindow>
          </Map>
        </div>
      );
    }
  }
}
  
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_google_maps_api_key)
})(MapContainer)