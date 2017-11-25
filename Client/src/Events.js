import React, { Component } from 'react';
import './Form.css'; 
import ReactTable from "react-table";
import "react-table/react-table.css";

var hosturl = "http://ec2-54-215-128-177.us-west-1.compute.amazonaws.com:3000/";

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
      const eventsinfo = this.state.events;
      return (
        <div>
          <ReactTable
          data={eventsinfo}
          columns={[
            {
              Header: "Events",
              columns: [
                {
                  Header: "Name",
                  accessor: "name",
                },
                {
                  Header: "Description",
                  accessor: "description",
                },
                {
                  Header: "Event ID",
                  accessor: "event_id",
                },
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        </div>
      );
  }
}
}

export default About;