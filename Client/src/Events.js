import React, { Component } from 'react';
import './Events.css'; 
import ReactTable from "react-table";
import "react-table/react-table.css";
import getInvolved from './Pictures/events_picture.png';

var hosturl = "http://localhost:3000/";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoading: true,
    };
 }

  componentDidMount() {
    var that = this;

    var reroute = 'api/getevents';
    fetch(hosturl + reroute)
    .then(function(response) {
      return response.json();
    })
    .then(function(eventdata) {
      that.setState({events: eventdata, isLoading: false})
    });
  }

  render () {
    if(this.state.isLoading) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
        )
    } else {
      const eventsList = this.state.events.map(function(item) {
        
        return (<div>
          <div style = {{'border-style': 'solid', 'border-radius': '21px 21px 21px 21px', 'border-color': '#27a348'}}>
          <div style = {{'font-size': '19px',
               'font-family': 'Palatino, Arial, sans-serif',
                'color': 'black',
                'padding': '1% 1%',}}><strong>{item.name}</strong></div>
          <div style = {{
            'font-family': 'Palatino, Arial, sans-serif',
          'display': 'inline-block',
          'font-style': 'italic',
          'border-radius': '5px 5px 5px 5px',
          'color': 'black',
          'padding': '3% 6%',
          'margin-bottom': '1%',
          'font-size': '15px'}}>Description: {item.description}</div>
          </div>
          <br/>
          <br/>
          </div>);
      });
      return (
        <div className="events">
        <div>
          <img src={getInvolved} className="test" alt="getInvolved"/>
        </div>
        <br/>
        <div style = {{'font-size': '21px', 'font-family': 'Palatino, Arial, sans-serif', 'font-style': 'italic'}}>USF Food Recovery Network Events</div>
        <br/>
        <ul>{eventsList}</ul>
        </div>
      );
  }
}
}

export default About;