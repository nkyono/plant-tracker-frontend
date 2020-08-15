import React from 'react';
import NavButtons from './Nav/NavButtons'
import AddForm from './add/addForm'


export default class AddOccurrencePage extends React.Component{

    render(){
      return (
        <body className="add-body">
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
          <div style={{padding:20}}>
            <AddForm/>
          </div>
        </body>
      )};
  }
  