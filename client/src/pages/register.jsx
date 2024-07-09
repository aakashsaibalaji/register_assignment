import React, { useState } from 'react';
import axios from 'axios';
const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phonenumber: '',
    countrycode: '+91'
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear the corresponding error message when user starts typing
    setErrors({
      ...errors,
      [e.target.name]: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, phonenumber, countrycode } = formData;
    const phoneWithCountryCode = `${countrycode}${phonenumber}`;

    // Validation checks before submitting
    let formValid = true;
    const newErrors = {};

    if (!firstname.trim()) {
      newErrors.firstname = 'First Name is required';
      formValid = false;
    }
    if (!lastname.trim()) {
      newErrors.lastname = 'Last Name is required';
      formValid = false;
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      formValid = false;
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      formValid = false;
    }
    if (!phonenumber.trim()) {
      newErrors.phonenumber = 'Phone Number is required';
      formValid = false;
    } else {
      // Validate phone number format (+91 followed by 10 digits)
      const phoneRegex = /^\+91[1-9]\d{9}$/;
      if (!phoneRegex.test(phoneWithCountryCode)) {
        newErrors.phonenumber = 'Invalid phone number format. Should be +91 followed by 10 digits.';
        formValid = false;
      }
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5500/auth/register', {
        firstname,
        lastname,
        email,
        password,
        phonenumber: phoneWithCountryCode
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.firstname && 'is-invalid'}`}
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.lastname && 'is-invalid'}`}
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
        </div>
        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${errors.email && 'is-invalid'}`}
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${errors.password && 'is-invalid'}`}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text">Country Code</span>
            <select
              className="form-select"
              name="countrycode"
              value={formData.countrycode}
              onChange={handleChange}
              required
            >
              <option value="+91">India (+91)</option>
              {/* Add more options for other countries as needed */}
            </select>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.phonenumber && 'is-invalid'}`}
            name="phonenumber"
            placeholder="Phone Number"
            value={formData.phonenumber}
            onChange={handleChange}
            required
          />
          {errors.phonenumber && <div className="invalid-feedback">{errors.phonenumber}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;