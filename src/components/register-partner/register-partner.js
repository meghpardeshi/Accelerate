import TextField from "@material-ui/core/TextField";
import React from 'react';
import history from "../../history";
import "./register-partner.css";
//import { Container } from 'react-bootstrap';
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const phoneNumberRegex=RegExp(
  /^[0][1-9]\d{9}$|^[1-9]\d{9}$/
);
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
export  default class registerPartner extends React.Component{
  constructor(props){
    super();
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber:null,
      password: null,
      image:null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        image:""
      }
    };
  }
  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        PhoneNumber:${this.state.phoneNumber}
        Password: ${this.state.password}
        image:${this.state.image}
      `);
      
    //   history.push({
    //     pathname:'/finalsetpsforRegistration',
    //     state:{
    //      firstName: this.state.firstName,
    //       lastName: this.state.lastName,
    //       email: this.state.email,
    //       PhoneNumber:this.state.phoneNumber,
    //       Password: this.state.password,
    //       image:this.state.image
    //     }
        
       
    // })
    let temp={
      firstName: this.state.firstName,
       lastName: this.state.lastName,
       email: this.state.email,
       PhoneNumber:this.state.phoneNumber,
       Password: this.state.password,
       image:this.state.image
     }
     console.log(temp);
     history.push({
       pathname:'/finalsetpsforRegistration',
       state:temp
      } )
      //redux action handler
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    if(e.target.files) {
      const file=e.target.files[0];
      if(file){
        this.setState({[e.target.id]:file});
      }
    }
    
    const { name, value } = e.target;
    console.log(e.target.value);
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      // case "lastName":
      //   formErrors.lastName =
      //     value.length < 3 ? "minimum 3 characaters required" : "";
      //   break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "phoneNumber":
          formErrors.phoneNumber = phoneNumberRegex.test(parseInt(value))
          ? ""
          : "Enter 10 digit mobile number";
          break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      // case "pancardImg":
      //   formErrors.file= accept!=='.jpg'?"only jpg file accepted":"";
      //   break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  }
  handleFileChange=(event)=>{
    console.log(event.target.files);
    this.setState({image:event.target.files});
  }
  render() {
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Account For Partner</h1>
        <form onSubmit={this.handleSubmit} noValidate 
        id="registerPartner" 
        name="registerPartner" enctype="multipart/form-data">
          <div className="email">
            {/* <label htmlFor="firstName">First Name</label> */}
            <TextField
              className={formErrors.firstName.length > 0 ? "error" : null}
              label="Full Name"
              type="text"
              name="firstName"
              noValidate
              required
              onChange={this.handleChange}
            />
            {formErrors.firstName.length > 0 && (
              <span className="errorMessage">{formErrors.firstName}</span>
            )}
          </div>
          {/* <div className="lastName">
            <label htmlFor="lastName">Last Name</label>
            <input
              className={formErrors.lastName.length > 0 ? "error" : null}
              placeholder="Last Name"
              type="text"
              name="lastName"
              noValidate
              onChange={this.handleChange}
            />
            {formErrors.lastName.length > 0 && (
              <span className="errorMessage">{formErrors.lastName}</span>
            )}
          </div> */}
          <div className="email">
            {/* <label htmlFor="email">Email</label> */}
            <TextField
              className={formErrors.email.length > 0 ? "error" : null}
              label="Email"
              type="email"
              name="email"
              noValidate
              required
              onChange={this.handleChange}
            />
            {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>
            )}
          </div>
          <div className="phoneNumber">
            {/* <label htmlFor="phoneNumber">Mobile Number</label> */}
            <TextField
              className={formErrors.phoneNumber.length > 0 ? "error" : null}
              label="Mobile Number"
              type="text"
              name="phoneNumber"
              noValidate
              required
              onChange={this.handleChange}
            />
            {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.phoneNumber}</span>
            )}
          </div>
          <div className="password">
            {/* <label htmlFor="password">Password</label> */}
            <TextField
              className={formErrors.password.length > 0 ? "error" : null}
              label="Password"
              type="password"
              name="password"
              noValidate
              required
              onChange={this.handleChange}
            />
            {formErrors.password.length > 0 && (
              <span className="errorMessage">{formErrors.password}</span>
            )}
          </div>
          <div className="myfile">
            <input type="file"
            multiple
            name="pancardImg"
            id="image"
            noValidate
            accept='image/*'
            onChange={this.handleFileChange}
            />
          </div>
          <div className="createAccount">
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </div>
    );
  };
};