import React, { Component } from 'react';
import './Form.css'


const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validPhoneRegex = 
  RegExp(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/);

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      phone: null,
      address: null,

      errors: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        address: ''
      }
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.firstname) {
      if(validateForm(this.state.errors)) {
        console.info('Valid Form')
      }else{
        console.error('Invalid Form')
      }
    }
    else{
      alert("field cant be empty")
    }
    
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
  
    switch (name) {
      case 'firstname': 
        errors.firstname = 
          value.length < 3
            ? 'First Name must be 3 characters long!'
            : '';
        break;

      case 'lastname': 
        errors.lastname = 
          value.length < 2
            ? 'Last Name must be 2 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;

        case 'phone': 
        let phoneno = /^\d{10}$/;
        errors.phone = 
        validPhoneRegex.test(value)
            ? ''
            : 'Phone Number is not valid!';
        break;

        case 'address': 
        errors.address = 
          value.length < 20
            ? 'Last Name must be 20 characters long!'
            : '';
        break;
      default:
        break;
    }
  
    this.setState({errors, [name]: value});
  }
    render() {
      const {errors} = this.state;
        return (
            <div className='wrapper'>
              <div className='form-wrapper'>

                <h3>Contact Us</h3>

                <form onSubmit={this.handleSubmit} noValidate >

                  <div className='firstname'>
                    <input type='text' name='firstname' placeholder="First Name" onChange={this.handleChange} noValidate />

                    {errors.firstname.length > 0 && 
                      <span className='error'>{errors.firstname}</span>}
                  </div>

                  <div className='lastname'>
                    <input type='text' name='lastname' placeholder="Last Name" onChange={this.handleChange} noValidate />

                    {errors.lastname.length > 0 && 
                      <span className='error'>{errors.lastname}</span>}
                  </div>

                  <div className='email'>
                    <input type='email' name='email' placeholder="Email Id" onChange={this.handleChange} noValidate />

                    {errors.email.length > 0 && 
                      <span className='error'>{errors.email}</span>}
                  </div>

                  <div className='password'>
                    <input type='password' name='password' placeholder="Password" onChange={this.handleChange} noValidate />

                    {errors.password.length > 0 && 
                      <span className='error'>{errors.password}</span>}
                  </div>

                  <div className='info'>
                    <small>Password must be 8 characters in length.</small>
                  </div>

                  <div className='phone'>
                    <input type='text' name='phone' placeholder="Phone No" onChange={this.handleChange} noValidate />

                    {errors.phone.length > 0 && 
                      <span className='error'>{errors.phone}</span>}
                  </div>

                  <div className='info'>
                    <small>Phone Number must be of 10 digits.</small>
                  </div>

                  <div className='address'>
                    <input type='text' name='address' placeholder="Address" onChange={this.handleChange} noValidate />

                    {errors.address.length > 0 && 
                      <span className='error'>{errors.address}</span>}
                  </div>

                  <div className='submit'>
                    <button>Submit</button>
                  </div>

                </form>
              </div>
            </div>
          );
    }
}

export default Form;