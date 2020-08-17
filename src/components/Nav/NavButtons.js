import React from "react";
import {Button} from 'react-bootstrap';
import './dropDown.css'

// creates navigation buttons. Takes in a list of {label, path} and creates navigation buttons.
// allows for reusable creation of navigation elements 

export default class NavButtons extends React.Component{
    render(){
        return (
            <div className={this.props.name}>
                {this.props.butts.map(
                    (e) => {
                        return (
                            <Button
                                href={e.path}
                                variant="outline-dark"
                                block>
                                    {e.label}
                            </Button>
                        )
                    }
                )}
            </div>
        )
    }

}
