import React from "react";
import {Dropdown, FormControl} from 'react-bootstrap';
import './dropDown'

/*
@state
selected: current plant (default id=1)
plant in form -> {PlantID, Scientific, Common}
isLoaded: whether or not points have been fetched from database
*/

export default class MyDropDown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected: {
                "PlantID": 1,
                "Common": "Poison Oak",
                "Scientific": "Toxicodendron Diversilobum"
            },
            idLoaded: false
        }
    }

    // on load, fetch the plant species from the database
    componentDidMount() {
        fetch("http://localhost:8000/species/")
            .then(res => res.json())
            .then(
                (result) => {
                this.setState({
                    isLoaded: true,
                    species: result
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

    // custom react bootstrap dropdown menu
    // adds in search functionality
    CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = React.useState('')
    
        return (
            <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
            >
            <FormControl
                autoFocus
                className="mx-3 my-2 w-auto shadow-none border-dark"
                style={{color:"#17a2b8"}}
                placeholder="Type to filter..."
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />
            <ul className="list-unstyled" id="dropdownlist">
                {React.Children.toArray(children).filter(
                (child) =>
                    !value || child.props.children.toLowerCase().includes(value),
                )}
            </ul>
            </div>
        );
        },
    );

    // callback to App that sends currently selected plant
    sendData = (data) => {
        this.props.plantCallback(data)
        this.setState({
            selected: data
        })
    }

    // creates the items in the dropdown menu
    createItem(data) {
        const isActive = (data.PlantID === this.state.selected.PlantID) ? true : false
        return (
            <Dropdown.Item
            eventKey= {data.PlantID}
            onClick = {() => {
                this.sendData(data);
            }}
            className="dropdownitem"
            active={isActive}
            >
                {data.Scientific + " | " + data.Common}
            </Dropdown.Item>
        )
    }

    render(){
        const { error, isLoaded, species } = this.state;
        if(error){
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div class="side">
                    <Dropdown>
                        <Dropdown.Toggle className="shadow-sm" variant="outline-dark">
                            Species
                        </Dropdown.Toggle>
                
                        <Dropdown.Menu as={this.CustomMenu} className="border-dark shadow-lg add-transparency">
                            {species.map(s => 
                                    this.createItem(s)
                                )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <br/>
                    <p class="add-border">
                        <b>
                            Displaying: 
                        </b>
                        <hr class="lines"/> 
                        <p class="display">
                            {this.state.selected.Scientific} 
                            <hr class="lines"/> 
                            {this.state.selected.Common}
                        </p>
                    </p>
                </div>
            )
        }
    };
}