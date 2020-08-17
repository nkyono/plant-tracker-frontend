import {Map, GoogleApiWrapper} from 'google-maps-react';
import React from 'react';

// lat: latitude of current click (or initial center)
// lng: longitude of current click (or initial center)
// isLoaded: whether or not the initial center of map is loaded (either center of US or user location)

class MapInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lat: 39.8283,
      lng: -98.5795,
      isLoaded: false,
    }
  }

  // sets current location based on user's location
  setUserPosition = (position) => {
    this.setState({
      lat:position.coords.latitude,
      lng:position.coords.longitude,
      isLoaded: true,
    })
  }

  // sets isLoaded to true and keeps the initial center as center of US
  setUserPositionErr = () => {
    this.setState({
      isLoaded: true,
    })
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(this.setUserPosition, this.setUserPositionErr)
  }

  // sends latitude and longitude back to form
  retLatLng = (t, map, coord) => {
    const {latLng} = coord
    this.setState({
      lat: latLng.lat(),
      lng: latLng.lng()
    })
    this.props.mapCoordCallback(latLng.lat(), latLng.lng())
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return  (
        <div>
          <Map 
              google={this.props.google}
              zoom={4}
              initialCenter={{
                lat: this.state.lat,
                lng: this.state.lng
              }}
              onClick = {this.retLatLng}
          >
          </Map>
        </div>
      );
    }
  }
}
  
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_google_maps_api_key)
})(MapInput)