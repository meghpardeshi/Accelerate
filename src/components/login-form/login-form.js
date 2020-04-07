import React from "react";
import "./login-form.css"
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import image from "./logo192.png";
import {Link} from 'react-router-dom';
import {Redirect} from "react-router";
import { connect } from "react-redux";
import { LoginUser } from "../../REDUX/actions"
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
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
class LoginForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: "",
            password: "",
          formErrors:{
            email:"",
            password:""
          } 
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        
    }
    

    handleOnSubmit=(event)=>{
        event.preventDefault();
        if (formValid(this.state)) {
          console.log(`
            --SUBMITTING--
            Email: ${this.state.email}
            Password: ${this.state.password}
          `);
          const user={
            email: this.state.email,
            Password: this.state.password
          }
          //redux action handler
          this.props.LoginUser(user);
          
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    }
    
    handleOnChange=(e)=>{
      const { name, value } = e.target;
      let formErrors = { ...this.state.formErrors };
        switch(name){
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "invalid email address";
            break;
          case "password":
            formErrors.password =
              value.length < 6 ? "minimum 6 characaters required" : "";
            break;
            default:
              break;

        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }
handleCheck=()=>{
  
}
    render() {
      const { formErrors } = this.state;
      if (this.props.user.Response_data > 1) {
        return <Redirect to={{
          pathname:'/dashboard',
          state:{userData:this.props.user}
        }}/>;
      }else{

      }
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col>
                            <img src={image}/>
                </Col>
                        <Col>
                        <form className="form-signin container-fluid" onSubmit={this.handleOnSubmit}>
                  <div className="form-group">
                  <TextField
                      type="email"
                      id="inputEmail"
                      name="email"
                      label="User Email"
                      onChange={this.handleOnChange}
                      required
                      autoFocus
                    />
                   </div>
                  {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>
            )}

                  <div className="form-group">
                  <TextField
                      type="password"
                      id="inputPassword"
                      name="password"
                      onChange={this.handleOnChange}
                      label="Password"
                      required
                    />
                  </div>
                  {formErrors.password.length > 0 && (
              <span className="errorMessage">{formErrors.password}</span>
            )}
                  <div className="text-left">
                    <input
                      type="checkbox"
                      id="customCheck1"
                    /> {' '}
                    <label
                      htmlFor="customCheck1"
                    >
                       Remember Password
                    </label>
                    </div>
                  <br/>
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Login
                  </button>
                  <hr className="my-4" />
                  <Link to ="/registerUser">New User Register</Link>
                </form>

                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
  return { user: state.user.RESPONSE };
};
const mapDispacthToProps = dispatch => {
  return {
    LoginUser: user => dispatch(LoginUser(user)),
  };
};
export default connect( mapStateToProps,mapDispacthToProps)(LoginForm)
