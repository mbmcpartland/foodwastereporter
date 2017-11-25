import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

var hosturl = "http://ec2-54-215-128-177.us-west-1.compute.amazonaws.com:3000/";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      users: [],
      events: [],
      buildings: [],
      isLoading: true,
  	};
 }

  componentDidMount() {
    var that = this;

    var reroute = 'api/reports';
    fetch(hosturl + reroute)
    .then(function(response) {
    	return response.json();
    })
    .then(function(thedata) {
      that.setState({list: thedata})
    });

    var reroute = 'api/users';
    fetch(hosturl + reroute)
    .then(function(response) {
      return response.json();
    })
    .then(function(userdata) {
      that.setState({users: userdata})
    });

    var reroute = 'api/getevents';
    fetch(hosturl + reroute)
    .then(function(response) {
      return response.json();
    })
    .then(function(eventdata) {
      that.setState({events: eventdata})
    });

    var reroute = 'api/building';
    fetch(hosturl + reroute)
    .then(function(response) {
      return response.json();
    })
    .then(function(builddata) {
      that.setState({buildings: builddata, isLoading: false})
    });

  }

  render() {
    if(this.state.isLoading) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
        )
    } else {
      const data = this.state.list;
      const userdata = this.state.users;
      const buildingdata = this.state.buildings;
      const eventsinfo = this.state.events;

      return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Food Reports",
              columns: [
                {
                  Header: "Time Created",
                  accessor: "time_created",
                  minWidth: 200,
                },
                {
                  Header: "Report ID",
                  accessor: "report_id",
                  minWidth: 60,
                },
                {
                  Header: "Location",
                  accessor: "location",
                },
                {
                  Header: "Building ID",
                  accessor: "building_id",
                  minWidth: 65,
                },
                {
                  Header: "Pending",
                  accessor: "pending",
                  Cell: ({ value }) => (value == 0 ? "False" : "True"),
                  minWidth: 60,
                },
                {
                  Header: "Successful",
                  accessor: "successful",
                  Cell: ({ value }) => (value == 0 ? "False" : "True"),
                  minWidth: 70,
                },
                {
                  Header: "Weight",
                  accessor: "weight",
                  Cell: ({ value }) => (value += " lbs"),
                  minWidth: 55,
                },
                {
                  Header: "Description",
                  accessor: "description",
                },
                {
                  Header: "User ID",
                  accessor: "user_id",
                  minWidth: 40,
                },
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <ReactTable
          data={userdata}
          columns={[
            {
              Header: "Users",
              columns: [
                {
                  Header: "Phone Number",
                  accessor: "phone_number",
                },
                {
                  Header: "Email",
                  accessor: "email",
                },
                {
                  Header: "User ID",
                  accessor: "user_id",
                },
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
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
        <ReactTable
          data={buildingdata}
          columns={[
            {
              Header: "Building",
              columns: [
                {
                  Header: "Name",
                  accessor: "name",
                },
                {
                  Header: "Building ID",
                  accessor: "building_id",
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
export default Admin;











    // console.log("fucckkkk");
    // var time = "";
    // var that = this;
    // if(this.state.isLoading) {
    //   return (
    //     <div>
    //       <h4>Loading...</h4>
    //     </div>
    //     )
    // } else {
    // 	return (
    //     <div>
    //     <h4>{'\u00A0'}{'\u00A0'}Administrator Page</h4>
    //     <ul>
    //       {that.state.list.map(function(val) {
    //         return <li>{val.time_created.toString() + " | " +
    //         val.report_id.toString() + " | " + 
    //         val.location.toString() + " | " +
    //         val.building_id.toString() + " | " +
    //         !!parseInt(val.pending.toString()) + " | " +
    //         !!parseInt(val.successful.toString()) + " | " +
    //         val.weight.toString() + "lbs | " +
    //         val.description.toString() + " | " +
    //         val.user_id}
    //         </li>;
    //       })}
    //     </ul>
    //     </div>
    //     )
    // }
   // }
// }
// export default Admin;