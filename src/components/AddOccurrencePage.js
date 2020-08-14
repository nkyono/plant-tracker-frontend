import React from 'react';
import NavButtons from './Nav/NavButtons'


export default class AddOccurrencePage extends React.Component{

    render(){
      return (
        <div>
          <div className="sidebar-open">
            <div style={{fontSize:30}}>
              <span><b>Add Occurrence</b></span>
            </div>
            <NavButtons 
                butts= {[
                  {label: "Home", path: ".."},
                  {label: "Occurrences", path: "../map"}
            ]}/>
          </div>
        </div>
      )};
  }
  