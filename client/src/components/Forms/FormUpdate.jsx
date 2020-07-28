import React, { Component } from "react";
// import { Link, withRouter } from "react-router-dom";
// import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class FormUpdate extends Component {
  state = {};

  handleChange = (event) => {
    let key = event.target.name;
    let value = event.target.value;
    console.log(key, value);
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
      
    event.preventDefault();
    // const userId = this.props.match.par
    apiHandler
      .updateProfile(this.state)
      .then((data) => {
          console.log(data)
    //    this.props.data.setUser(data);
    //     this.props.data.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <section className="form-section">
        <header className="header">
          <h1>
            Update your Profile
            <span role="img" aria-label="hand">
              👋
            </span>
          </h1>
        </header>

        <form
          autoComplete="off"
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h2 className="title">Update account</h2>

          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              name="lastName"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="input" id="email" type="email" name="email" defaultValue={this.props.email}/>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              type="password"
              name="password"
            />
          </div>

          <button className="btn-submit">Update !</button>
        </form>

        <div className="form-section-bottom">
         
        </div>
      </section>
    );
  }
}

export default FormUpdate;
