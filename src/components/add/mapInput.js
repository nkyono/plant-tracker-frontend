import {Map, GoogleApiWrapper} from 'google-maps-react';
import React from 'react';

class MapInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lat:39.8283,
      lng:-98.5795
    }
  }

  setUserPosition = (position) => {
    this.setState({
      lat:position.coords.latitude,
      lng:position.coords.longitude
    })
  }

  setUserPositionErr = () => {
    this.setState({
      lat:39.8283,
      lng:-98.5795
    })
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(this.setUserPosition, this.setUserPositionErr)
  }

  retLatLng = (t, map, coord) => {
    const {latLng} = coord
    this.props.mapCoordCallback(latLng.lat(), latLng.lng())
  }

  render() {
    return  (
      <div>
        <Map
            google={this.props.google}
            zoom={4}
            center={{
              lat:this.state.lat,
              lng:this.state.lng
            }}
            onClick = {this.retLatLng}
        >
        </Map>
      </div>
    );
  }
}
  
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_google_maps_api_key)
})(MapInput)