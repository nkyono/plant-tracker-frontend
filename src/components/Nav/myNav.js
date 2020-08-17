import React from "react";
import {Button} from 'react-bootstrap';
import MyDropDown from './dropDown';
import './dropDown.css'
import NavButtons from './NavButtons'

export default class MyNavBar extends React.Component{
    // creates a search bar
    // TODO: search bar has no real functionality
    createSearchInput(){
        return (
            <form>
                <label>
                    Species:
                    <input type="text" species="species" defaultValue="Not implemented"/>
                </label>
                <input type="submit" value="Search"/>
            </form>
        )
    }

    // resets form
    resetPage(){
        this.props.dateFromCallback("")
        this.props.dateToCallback("")
        this.props.accuracyCallback(0)
    }

    // creates the input fields to be filtered on. Sets onchange events to call the callbacks that allow map occurrences to be filtered
    createInputFields(){
        return (
            <form onSubmit={event => event.preventDefault()} onReset={event => this.resetPage()}>
                <label>
                    <span><b>Occurrences</b><br/>From<br/></span>
                    <input 
                        type="date" 
                        onChange={event => {
                            this.props.dateFromCallback(event.target.value)
                        }}
                    />
                </label>
                <br/>
                <label>
                    To <br/>
                    <input 
                        type="date" 
                        onChange={event => {
                            this.props.dateToCallback(event.target.value)
                        }}
                    />
                </label>
                <br/>
                <label>
                    <span>Accuracy   </span>
                    <input 
                        key
                        style={{textAlign:"right"}}
                        type="number" 
                        min="0"
                        max="100"
                        onChange={event => {
                            console.log(event.cancelable)
                            this.props.accuracyCallback(event.target.value)
                        }}
                    />
                    <span>  %</span>
                </label><br/>
                <input type="reset"></input>
            </form>
        )
    }

    render(){
        // constants for the side bar buttons for navigation
        // const navOptions = ["Home", "Plants", "Occurrences"];

        return (
            <div >
                <div style={{alignItems:"center", justifyContent:"center"}}> 
                    <Button 
                        className= {this.props.isVisible ? "toggleButton-open shadow-none border-dark" : "toggleButton-close shadow-none border-dark"}
                        onClick={this.props.toggleSidebar}
                        variant="light"
                    >
                        {this.props.isVisible ? "⇦\n⇦\n⇦\n⇦\n⇦" : "⇨\n⇨\n⇨\n⇨\n⇨"}
                    </Button> 
                </div>
                <div className={this.props.isVisible ? "sidebar-open" : "sidebar-close"}>
                    <div style={{fontSize:30}}>
                        <span><b>Occurrences</b></span>
                    </div>
                    <div>
                        <NavButtons 
                            butts= {[
                                {label: "Home", path: ".."},
                                {label: "Add Occurrence", path: "../add"}
                            ]}/>
                        <br />
                        <MyDropDown plantCallback={this.props.plantCallback}/>
                        <br />
                        {this.createInputFields()}
                    </div>
                </div>
            </div>
        );
    }

}
