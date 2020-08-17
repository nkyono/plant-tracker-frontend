import React from "react";
import {Form, Button, Col} from 'react-bootstrap';
import './addForm.css'
import MapInput from "./mapInput";

// The occurrence databse has: OccurrenceID, PlantID, Date, Accuracy, Latitude, Longitude
// For adding an occurrence the user will input: date, location, and image
// the application will then use machine learning to identify the species and accuracy


export default class AddForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            lat: "",
            lng: "",
            img: null,
            date: "",
        }
    }

    previewImage = (val) => {
        var file = val.target.files[0]
        const prev = URL.createObjectURL(file)

        this.setState({
            img: prev
        })

    }

    mapCoordCallback = (lat, lng) => {
        this.setState({
            lat: Number(lat.toFixed(5)),
            lng: Number(lng.toFixed(5))
        })
    }

    // when machine learninng component is added, remove plantID and accuracy (plantID and accuracy should be replaced by model)
    // occurrenceID is replaced in backend before addition to database
    addOccurrence = () => {
        console.log("occurrence: ")
        console.log(this.state.date)
        console.log(this.state.lat)
        console.log(this.state.lng)
        /*
        fetch('http://localhost:8000/occurrences', {
            method: 'post',
            body: JSON.stringify({
                OccurrenceID: 'occurrenceID',
                Date: this.state.date, 
                Accuracy: '0.0',
                Latitude: this.state.lat,
                Longitude: this.state.lng,
                PlantID: '0'
            })
        }).then(function(res) {
            return res.json()
        })
        */
    }

    // TODO: Fix the vertical alignment issue for input picture
    // also need to set up s3 bucket and add function for uploading picture

    createAddFormFields(){
        return (
            <Form onSubmit={this.addOccurrence}>
                <Form.Row>
                    <Form.Group controlId="occurrenceImage">
                        <Form.File id="occurImage" onChange={this.previewImage} label="Occurrence Image"></Form.File>
                        <Form.Text className="text-muted">
                            Please input the image of the occurrence.
                        </Form.Text>
                    </Form.Group>
                    <div style={{display:"table-cell", textAlign:"center", verticalAlign:"middle", height:128, width:128, borderWidth:2, borderStyle:"solid", borderColor:"black"}}>
                        {this.state.img != null ? 
                            <img src={this.state.img} alt="occurrence"/> : 
                            <div style={{height:"100%",width:"100%",backgroundColor:"grey"}}/>
                        }
                    </div>
                </Form.Row>
                <Form.Group controlId="dateInput">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" onChange={(e) => {this.setState({date:e.target.value.replace(/-/g,"")})}}></Form.Control>
                    <Form.Text className="text-muted">
                        Please input the date of the occurrence.
                    </Form.Text>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="latInput">
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control type="text" placeholder="ex. 39.8283" onChange={(e) => {this.setState({lat:e.target.value})}} value={this.state.lat}></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid latitude.
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            Please input the latitude and longitude or select the location on the map.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} controlId="lngInput">
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control type="text" placeholder="ex. -98.5795" onChange={(e) => {this.setState({lng:e.target.value})}} value={this.state.lng}></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid longitude.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Button variant="dark" type="submit">
                    Submit
                </Button>{' '}
                <Button variant="dark" type="reset">
                    Reset
                </Button>{' '}
            </Form>
        )
    }

    render(){
        return (
            <div className="addForm-layout">
                {this.createAddFormFields()}
                <div className="map">
                    <MapInput 
                        mapCoordCallback={this.mapCoordCallback}
                    />
                </div>
            </div>
        );
    }

}
