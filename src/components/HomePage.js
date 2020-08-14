import React from 'react';
import NavButtons from './Nav/NavButtons';


export default class HomePage extends React.Component{

    render(){
      return (
        <div>
          <div className="sidebar-open">
            <div style={{fontSize:30}}>
              <span><b>Home</b></span>
            </div>
            <NavButtons 
                butts= {[
                  {label: "Home", path: "."},
                  {label: "Add Occurrence", path: "./add"},
                  {label: "Occurrences", path: "./map"}
            ]}/>
          </div>
        </div>
      )};
  }
  