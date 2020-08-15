import React from "react";
import {Form, Button, Col} from 'react-bootstrap';


export default class AddForm extends React.Component{

    createAddFormFields(){
        return (
            <Form>
                <Form.Group controlId="occurrenceImage">
                    <Form.Label>Occurrence Image</Form.Label>
                    <Form.Control type="file"></Form.Control>
                    <Form.Text className="text-muted">
                        Please input the image of the occurrence.
                    </Form.Text>

                </Form.Group>
                <Form.Group controlId="dateInput">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date"></Form.Control>
                    <Form.Text className="text-muted">
                        Please input the date of the occurrence.
                    </Form.Text>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="latInput">
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control type="text" placeholder="ex. 39.8283"></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid latitude.
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            Please input the latitude and longitude or select the location on the map.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} controlId="lngInput">
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control type="text" placeholder="ex. -98.5795"></Form.Control>
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
            <div >
                {this.createAddFormFields()}
            </div>
        );
    }

}
