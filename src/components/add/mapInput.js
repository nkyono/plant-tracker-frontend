import {Map, GoogleApiWrapper} from 'google-maps-react';
import React from 'react';

class MapInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lat: 39.8283,
      lng: -98.5795,
      isLoaded: false,
    }
  }

  setUserPosition = (position) => {
    this.setState({
      lat:position.coords.latitude,
      lng:position.coords.longitude,
      isLoaded: true,
    })
  }

  setUserPositionErr = () => {
    this.setState({
      isLoaded: true,
    })
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(this.setUserPosition, this.setUserPositionErr)
  }

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