import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './Admin.css';

var hosturl = "http://localhost:3000/";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      users: [],
      events: [],
      buildings: [],
      isLoading: true,
      editing: false,
      editReports: false,
      editUsers: false,
      editEvents: false,
      editBuildings: false,
      addReport: false,
      deleteReport: false,
      addUser: false,
      deleteUser: false,
      addEvent: false,
      deleteEvent: false,
      addBuilding: false,
      deleteBuilding: false,
      report: {},
      userObj: {},
      eventObj: {},
      buildingObj: {},
      
      timecreated: '',
      reportID: '',
      location: '',
      buildingID: '',
      pending: '',
      successful: '',
      weight: '',
      description: '',
      
      userID: '',
      phonenumber: '',
      email: '',
      name: '',
      
      eventID: '',
      eventDescription: '',
      eventName: '',
      
      buildingName: '',
      deleteReportID: '',
      deleteEventID: '',
      deleteBuildingID: '',
      deleteUserID: '',
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

  handleSubmitReport(e) {
    var reroute = 'api/editReports?tc='+this.state.timecreated+'&&loc='+this.state.location+
    '&&build='+this.state.buildingID+'&&pend='+this.state.pending+'&&succ='+this.state.successful+
    '&&weight='+this.state.weight+'&&desc='+this.state.description+'&&use='+this.state.userID +
    '&&primaryKey='+this.state.reportID;
    var that = this;
    fetch(hosturl + reroute)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
    this.setState({editing: false, editReports: false, isLoading: true, timecreated: '',
      reportID: '',
      location: '',
      buildingID: '',
      pending: '',
      successful: '',
      weight: '',
      description: '', userID: ''});
    this.componentDidMount();
  }

  handleSubmitUser(e) {
    var reroute = 'api/editUsers?phone='+this.state.phonenumber+'&&email='+this.state.email+
    '&&name='+this.state.name+'&&primaryKey='+this.state.userID;
    var that = this;
    fetch(hosturl + reroute)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
    this.setState({editing: false, editUsers: false, isLoading: true, name: '', email: '', phonenumber: ''});
    this.componentDidMount();
  }

  handleSubmitEvent(e) {
    var reroute = 'api/editEvents?name='+this.state.eventName+'&&description='+this.state.eventDescription+
    '&&primaryKey='+this.state.eventID;
    var that = this;
    fetch(hosturl + reroute)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
    this.setState({editing: false, editEvents: false, isLoading: true, eventDescription: '', eventName: ''});
    this.componentDidMount();
  }

  handleSubmitBuilding(e) {
    var reroute = 'api/editBuildings?name='+this.state.buildingName+'&&primaryKey='+this.state.buildingID;
    var that = this;
    fetch(hosturl + reroute)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
    this.setState({editing: false, editBuildings: false, isLoading: true, buildingName: ''});
    this.componentDidMount();
  }

  handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }

  handleAdd(e) {
    if(e.target.value === "report") {
      this.setState({addReport: true});
    }
    if(e.target.value === "user") {
      this.setState({addUser: true});
    }
    if(e.target.value === "event") {
      this.setState({addEvent: true});
    }
    if(e.target.value === "building") {
      this.setState({addBuilding: true});
    }
  }

  handleAddRecord(e) {
    e.preventDefault();
    if(this.state.addReport) {
      var reroute = 'api/addReport?tc='+this.state.timecreated+'&&loc='+this.state.location+
      '&&build='+this.state.buildingID+'&&pend='+this.state.pending+'&&succ='+this.state.successful+
      '&&weight='+this.state.weight+'&&desc='+this.state.description+'&&use='+this.state.userID;
      var that = this;
      fetch(hosturl + reroute)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
       console.log(data);
      });
      this.setState({addReport: false, isLoading: true, timecreated: '',
      reportID: '',
      location: '',
      buildingID: '',
      pending: '',
      successful: '',
      weight: '',
      description: '', userID: ''});
      this.componentDidMount();
      console.log("hello");
    }
    if(this.state.addUser) {
      var reroute = 'api/addUser?phonenumber='+this.state.phonenumber+'&&email='+this.state.email+
      '&&name='+this.state.name;
      var that = this;
      fetch(hosturl + reroute)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
       console.log(data);
      });
      this.setState({addUser: false, isLoading: true, phonenumber: '', email: '', name: ''});
      this.componentDidMount();
      console.log("hello");
    }
    if(this.state.addEvent) {
      var reroute = 'api/addEvent?name='+this.state.eventName+'&&desc='+this.state.eventDescription;
      var that = this;
      fetch(hosturl + reroute)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
       console.log(data);
      });
      this.setState({addEvent: false, isLoading: true, eventName: '', eventDescription: ''});
      this.componentDidMount();
      console.log("hello");
    }
    if(this.state.addBuilding) {
      var reroute = 'api/addBuilding?name='+this.state.buildingName+'&&buildID='+this.state.buildingID;
      var that = this;
      fetch(hosturl + reroute)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
       console.log(data);
      });
      this.setState({addBuilding: false, isLoading: true, buildingName: '', buildingID: ''});
      this.componentDidMount();
      console.log("hello");
    }
  }

  handleDelete(e) {
    if(e.target.value === "report") {
      this.setState({deleteReport: true});
    }
    if(e.target.value === "user") {
      this.setState({deleteUser: true});
    }
    if(e.target.value === "event") {
      this.setState({deleteEvent: true});
    }
    if(e.target.value === "building") {
      this.setState({deleteBuilding: true});
    }
  }

  DeleteRecord(e) {
    if(this.state.deleteReport) {
      var reroute = 'api/deleteReport?primaryKey='+this.state.deleteReportID;
      var that = this;
      fetch(hosturl + reroute)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
      this.setState({deleteReport: false, isLoading: true, deleteReportID: ''});
      this.componentDidMount();
    }
    if(this.state.deleteEvent) {
      var reroute = 'api/deleteEvent?primaryKey='+this.state.deleteEventID;
      var that = this;
      fetch(hosturl + reroute)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
      console.log(data);
      });
      this.setState({deleteEvent: false, isLoading: true, deleteEventID: ''});
      this.componentDidMount();
    }
    if(this.state.deleteUser) {
      var reroute = 'api/deleteUser?primaryKey='+this.state.deleteUserID;
      var that = this;
      fetch(hosturl + reroute)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
      this.setState({deleteUser: false, isLoading: true, deleteUserID: ''});
      this.componentDidMount();
    }
    if(this.state.deleteBuilding) {
      var reroute = 'api/deleteBuilding?primaryKey='+this.state.deleteBuildingID;
      var that = this;
      fetch(hosturl + reroute)
      .then(function(response) {
         return response.json();
      })
      .then(function(data) {
        console.log(data);
       });
      this.setState({deleteBuilding: false, isLoading: true, deleteBuildingID: ''});
      this.componentDidMount();
    }

  }

  render() {
    if(this.state.addReport) {
      return (
        <div>
        <form onSubmit={this.handleAddRecord.bind(this)}>
           <h6>___________________________________________</h6>
           <label>
           Time Created:
           <input type="text" name="timecreated" value={this.state.timecreated} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <label>
           Location:
           <input type="text" name="location" value={this.state.location} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <label>
           Building ID:
           <input type="text" name="buildingID" value={this.state.buildingID} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <label>
           Pending:
           <input type="text" name="pending" value={this.state.pending} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <label>
           Successful:
           <input type="text" name="successful" value={this.state.successful} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <label>
           Weight:
           <input type="text" name="weight" value={this.state.weight} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <label>
           Description:
           <input type="text" name="description" value={this.state.description} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <label>
           User ID:
           <input type="text" name="userID" value={this.state.userID} onChange={this.handleChange.bind(this)}/>
           </label>
           <br/>

           <button type="submit" className="submitbutton" value="report">Submit</button>
           </form>
         </div>
        )
    }
    if(this.state.deleteReport) {
        return (
        <div>
        <form onSubmit={this.DeleteRecord.bind(this)}>
           <h6>Enter the Report ID that corresponds with the report you want to delete.</h6>
           <label>
           Report ID:
           <input type="text" name="deleteReportID" value={this.state.deleteReportID} onChange={this.handleChange.bind(this)}/>
           </label>

           <button type="submit" className="submitbutton">Submit</button>
           </form>
         </div>
        )

    }
    if(this.state.addUser) {
        return (
        <div>
        <form onSubmit={this.handleAddRecord.bind(this)}>
           <h6>___________________________________________</h6>
           <label>
           Phone Number:
           <input type="text" name="phonenumber" value={this.state.phonenumber} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <label>
           Email:
           <input type="text" name="email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <label>
           Name:
           <input type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
           </label>

           <button type="submit" className="submitbutton">Submit</button>
           </form>
         </div>
        )
    }
    if(this.state.deleteUser) {
        return (
        <div>
        <form onSubmit={this.DeleteRecord.bind(this)}>
           <h6>Enter the User ID that corresponds with the user you want to delete.</h6>
           <label>
           User ID:
           <input type="text" name="deleteUserID" value={this.state.deleteUserID} onChange={this.handleChange.bind(this)}/>
           </label>

           <button type="submit" className="submitbutton">Submit</button>
           </form>
         </div>
        )
    }
    if(this.state.addEvent) {
      return (
        <div>
        <form onSubmit={this.handleAddRecord.bind(this)}>
           <h6>___________________________________________</h6>
           <label>
           Event Name:
           <input type="text" name="eventName" value={this.state.eventName} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <label>
           Description:
           <input type="text" name="eventDescription" value={this.state.eventDescription} onChange={this.handleChange.bind(this)}/>
           </label>

           <button type="submit" className="submitbutton">Submit</button>
           </form>
         </div>
        )
    }
    if(this.state.deleteEvent) {
        return (
        <div>
        <form onSubmit={this.DeleteRecord.bind(this)}>
           <h6>Enter the Event ID that corresponds with the report you want to delete.</h6>
           <label>
           Event ID:
           <input type="text" name="deleteEventID" value={this.state.deleteEventID} onChange={this.handleChange.bind(this)}/>
           </label>

           <button type="submit" className="submitbutton">Submit</button>
           </form>
         </div>
        )
    }
    if(this.state.addBuilding) {
      return (
        <div>
        <form onSubmit={this.handleAddRecord.bind(this)}>
           <h6>___________________________________________</h6>
           <label>
           Building Name:
           <input type="text" name="buildingName" value={this.state.buildingName} onChange={this.handleChange.bind(this)}/>
           </label>
            <label>
           Building ID:
           <input type="text" name="buildingID" value={this.state.buildingID} onChange={this.handleChange.bind(this)}/>
           </label>

           <button type="submit" className="submitbutton">Submit</button>
           </form>
         </div>
        )
    }
    if(this.state.deleteBuilding) {
        return (
        <div>
        <form onSubmit={this.DeleteRecord.bind(this)}>
           <h6>Enter the Building ID that corresponds with the report you want to delete.</h6>
           <label>
           Building ID:
           <input type="text" name="deleteBuildingID" value={this.state.deleteBuildingID} onChange={this.handleChange.bind(this)}/>
           </label>

           <button type="submit" className="submitbutton">Submit</button>
           </form>
         </div>
        )
    }

    if(this.state.isLoading && !(this.state.editing)) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
        )
    } else if(!(this.state.isLoading) && this.state.editing) {
      console.log("check worked");
      if(this.state.editReports) {
        return (
         <div>
           <h1> If you do not want to change a field, leave it blank.</h1>
           <form onSubmit={this.handleSubmitReport.bind(this)}>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.report.time_created.toString()}</div>
           <label>
           Time Created:
           <input type="text" name="timecreated" value={this.state.timecreated} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.report.location.toString()}</div>
           <label>
           Location:
           <input type="text" name="location" value={this.state.location} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.report.building_id.toString()}</div>
           <label>
           Building ID:
           <input type="text" name="buildingID" value={this.state.buildingID} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.report.pending.toString()}</div>
           <label>
           Pending:
           <input type="text" name="pending" value={this.state.pending} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.report.successful.toString()}</div>
           <label>
           Successful:
           <input type="text" name="successful" value={this.state.successful} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.report.weight.toString()}</div>
           <label>
           Weight:
           <input type="text" name="weight" value={this.state.weight} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.report.description.toString()}</div>
           <label>
           Description:
           <input type="text" name="description" value={this.state.description} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.report.user_id.toString()}</div>
           <label>
           User ID:
           <input type="text" name="userID" value={this.state.userID} onChange={this.handleChange.bind(this)}/>
           </label>
           <br/>

           <button type="submit" className="submitbutton">Submit</button>
           </form>
         </div>
        )
      } else if(this.state.editUsers) {
        return (
         <div>
           <h1> If you do not want to change a field, leave it blank.</h1>
           <form onSubmit={this.handleSubmitUser.bind(this)}>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.userObj.phone_number.toString()}</div>
           <label>
           Phone Number:
           <input type="text" name="phonenumber" value={this.state.phonenumber} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.userObj.email.toString()}</div>
           <label>
           Email:
           <input type="text" name="email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.userObj.name}</div>
           <label>
           Name:
           <input type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
           </label>
           <br/>

           <button type="submit" className="submitbutton">Submit</button>
           </form>
         </div>
        )
      } else if(this.state.editEvents) {
        return (
         <div>
           <h1> If you do not want to change a field, leave it blank.</h1>
           <form onSubmit={this.handleSubmitEvent.bind(this)}>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.eventObj.name.toString()}</div>
           <label>
           Event Name:
           <input type="text" name="eventName" value={this.state.eventName} onChange={this.handleChange.bind(this)}/>
           </label>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.eventObj.description.toString()}</div>
           <label>
           Description:
           <input type="text" name="eventDescription" value={this.state.eventDescription} onChange={this.handleChange.bind(this)}/>
           </label>

           <button type="submit" className="submitbutton">Submit</button>
           </form>
         </div>
        )
    } else if(this.state.editBuildings) {
      return (
         <div>
           <h1> If you do not want to change a field, leave it blank.</h1>
           <form onSubmit={this.handleSubmitBuilding.bind(this)}>
           <h6>___________________________________________</h6>
           <div> Original: {this.state.buildingObj.name.toString()}</div>
           <label>
           Name:
           <input type="text" name="buildingName" value={this.state.buildingName} onChange={this.handleChange.bind(this)}/>
           </label>

           <button type="submit" className="submitbutton">Submit</button>
           </form>
         </div>
        )
    }

    } else if(!(this.state.isLoading) && !(this.state.editing)) {
      const data = this.state.list;
      const userdata = this.state.users;
      const buildingdata = this.state.buildings;
      const eventsinfo = this.state.events;

      return (

      <div>
        <ReactTable
        getTdProps={(state, rowInfo, column, instance) => {
    return {
      onClick: (e, handleOriginal) => {
        if(column.Header === 'Edit') {
          console.log("user wants to edit");
          this.setState({editing: true, editReports: true, report: rowInfo.original, reportID: rowInfo.original.report_id});
        }
        // console.log(rowInfo.original);
        if (handleOriginal) {
          handleOriginal()
        }
      }
    }
    }}
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
                  minWidth: 65,
                },
                {
                  Header: "Successful",
                  accessor: "successful",
                  Cell: ({ value }) => (value == 0 ? "False" : "True"),
                  minWidth: 75,
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
                {
                  Header: "Edit",
                  minWidth: 35,
                },
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />

        <br>
        </br>
        <button type="submit" onClick={this.handleAdd.bind(this)} value="report" className="submitbutton">Add Report</button>
        <button type="submit" onClick={this.handleDelete.bind(this)} value="report" className="submitbutton">Delete Report</button>
        <br>
        </br>
        <ReactTable
        getTdProps={(state, rowInfo, column, instance) => {
    return {
      onClick: (e, handleOriginal) => {
        if(column.Header === 'Edit') {
          console.log("user wants to edit");
          this.setState({editing: true, editUsers: true, userObj: rowInfo.original, userID: rowInfo.original.user_id});
        }
        // console.log(rowInfo.original);
        if (handleOriginal) {
          handleOriginal()
        }
      }
    }
    }}
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
                {
                  Header: "Name",
                  accessor: "name",
                },
                {
                  Header: "Edit",
                  minWidth: 35,
                },
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <br>
        </br>
        <button type="submit" onClick={this.handleAdd.bind(this)} value="user" className="submitbutton">Add User</button>
        <button type="submit" onClick={this.handleDelete.bind(this)} value="user" className="submitbutton">Delete User</button>
        <br>
        </br>

        <ReactTable
        getTdProps={(state, rowInfo, column, instance) => {
    return {
      onClick: (e, handleOriginal) => {
        if(column.Header === 'Edit') {
          console.log("user wants to edit");
          this.setState({editing: true, editEvents: true, eventObj: rowInfo.original, eventID: rowInfo.original.event_id});
        }
        if (handleOriginal) {
          handleOriginal()
        }
      }
    }
    }}
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
                {
                  Header: "Edit",
                  minWidth: 35,
                },
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />

        <br>
        </br>
        <button type="submit" onClick={this.handleAdd.bind(this)} value="event" className="submitbutton">Add Event</button>
        <button type="submit" onClick={this.handleDelete.bind(this)} value="event" className="submitbutton">Delete Event</button>
        <br>
        </br>

        <ReactTable
        getTdProps={(state, rowInfo, column, instance) => {
    return {
      onClick: (e, handleOriginal) => {
        if(column.Header === 'Edit') {
          console.log("user wants to edit");
          this.setState({editing: true, editBuildings: true, buildingObj: rowInfo.original, buildingID: rowInfo.original.building_id});
        }
        // console.log(rowInfo.original);
        if (handleOriginal) {
          handleOriginal()
        }
      }
    }
    }}
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
                {
                  Header: "Edit",
                  minWidth: 35,
                },
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />

        <br>
        </br>
        <button type="submit" onClick={this.handleAdd.bind(this)} value="building" className="submitbutton">Add Building</button>
        <button type="submit" onClick={this.handleDelete.bind(this)} value="building" className="submitbutton">Delete Building</button>
        <br>
        </br>
      </div>
    );
    }
  }
}
export default Admin;