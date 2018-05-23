import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css'; 

var hosturl = "http://localhost:3000/";

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name:'',
      email: '',
      phone: '',
      date: '',
      time: '',
      building: '',
      desription: '',
      location: '',
      formErrors: {name: '', email: '', phone: '', date: '', time: '', building: '', description: '', location: ''},
      nameValid: false,
      emailValid: false,
      phoneValid: false,
      dateValid: false,
      timeValid: false,
      buildingValid: false,
      descriptionValid: false,
      locationValid: false,
      formValid: false
    }
  }

  handleSubmit(e)
  {
      var x = e.target.phone.value;
      var y = e.target.email.value;
      var dat = e.target.date.value;
      var loc = e.target.location.value;
      var desc = e.target.description.value;

      console.log(x);
      console.log(y);

      var reroute = 'api/insert?email='+y+'&&phone='+x;
      var rerouteReport = 'api/insertReport?date='+ dat +'&&location='+ loc +'&&description='+ desc;

      fetch(hosturl + reroute, 
      {
        accept: 'application/json',
      });
      fetch(`/api/books`, { 
        accept: 'application/json',
      });
      fetch(hosturl + rerouteReport, 
      {
        accept: 'application/json',
      });
    alert("Thank you for the submission!")
    return;
  }


  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;
    let dateValid = this.state.dateValid;
    let timeValid = this.state.timeValid;
    let buildingValid = this.state.buildingValid;
    let descriptionValid = this.state.descriptionValid;
    let locationValid = this.state.locationValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'name':
        nameValid = value.length >= 2;
        fieldValidationErrors.name = nameValid ? '': ' is too short';
        break;
      case 'phone':
        phoneValid = value.length === 12;
        fieldValidationErrors.phone = phoneValid ? '': ' Format: 555-555-5555';
        break;
      case 'date':
        dateValid = value.length === 10;
        fieldValidationErrors.date = dateValid ? '': ' Please enter MM/DD/YYYY format';
        break;
      case 'time':
        timeValid = true;
        break;
      case 'building':
        buildingValid = value.length >= 4;
        fieldValidationErrors.building = buildingValid ? '': 'Building name too short; please reenter';
        break;
      case 'description':
        descriptionValid = value.length >= 10;
        fieldValidationErrors.description = descriptionValid ? '': 'Food Description too short; please be more descriptive';
        break;
      case 'location':
        locationValid = value.length >= 3;
        fieldValidationErrors.location = locationValid ? '': 'Food location too short; please be more descriptive';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    nameValid: nameValid,
                    emailValid: emailValid,
                    phoneValid: phoneValid,
                    dateValid: dateValid,
                    timeValid: timeValid,
                    buildingValid: buildingValid,
                    descriptionValid: descriptionValid,
                    locationValid: locationValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.nameValid && this.state.emailValid && this.state.phoneValid &&
      this.state.dateValid && this.state.timeValid && this.state.buildingValid && this.state.descriptionValid && this.state.locationValid });
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <div className = "onSubmit">
      <form onSubmit={this.handleSubmit}>
        <div class="headerfont">
          <h4>Enter Information For Food Pickup</h4>
        </div>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
          <label htmlFor="name">Name</label>
          <input type="name" required className="form-control" name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.phone)}`}>
          <label htmlFor="phone">Phone Number</label>
          <input type="phone" required className="form-control" name="phone"
            placeholder="Phone"
            value={this.state.phone}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.date)}`}>
          <label htmlFor="date">Date</label>
          <input type="date" className="form-control" name="date"
            placeholder="Date"
            value={this.state.date}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.time)}`}>
          <label htmlFor="time">Time</label>
          <input type="time" required className="form-control" name="time"
            placeholder="Time"
            value={this.state.time}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.building)}`}>
          <label htmlFor="building">Building</label>
          <input type="building" className="form-control" name="building"
            placeholder="Building"
            value={this.state.building}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.description)}`}>
          <label htmlFor="description">Food Description</label>
          <input type="description" className="form-control" name="description"
            placeholder="Food Description"
            value={this.state.description}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.location)}`}>
          <label htmlFor="location">Food Location</label>
          <input type="location" className="form-control" name="location"
            placeholder="Room No. (LS307) or Area (Gleeson Lawn)"
            value={this.state.location}
            onChange={this.handleUserInput}  />
        </div>
        <br/>
        <button type="submit" className="submitbutton" disabled={!this.state.formValid}>Submit</button>
        <br/>
        <br/>
        <br/>
      </form>
      </div>
    )
  }
}

export default Form;
