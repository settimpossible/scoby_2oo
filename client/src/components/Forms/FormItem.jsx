import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import API from "../../api/apiHandler";
import "../../styles/form.css";
import Avatar from "../icon/Avatar";
import apiHandler from "../../api/apiHandler";

class ItemForm extends Component {
  state = {
    name: "hey",
    category: [],
    quantity: null,
    address: "",
    description: "",
    avatar: "",
    tmpAvatar: "",
    contact: "",
    geometry: {
      type: "",
      coordinates: [],
    },
    // id_user: "",
  };

  buildFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        this.buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? "" : data;

      formData.append(parentKey, value);
    }
  }

  jsonToFormData(data) {
    const formData = new FormData();
    this.buildFormData(formData, data);
    return formData;
  }

  handleChange(event) {
    let key = event.target.name;
    let value = event.target.value;
    console.log(event.target.value);
    console.log(event.target.name);
    this.setState({ [key]: value });
  }

  handleImage = (event) => {
    this.setState({
      avatar: event.target.files[0],
      tmpAvatar: URL.createObjectURL(event.target.files[0]),
    });
  };

  handleSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();
    apiHandler
      .createItem(this.jsonToFormData(this.state))
      .then((apiRes) => console.log(apiRes))
      .catch((err) => console.log(err));
  };
  // In order to send back the data to the client, since there is an input type file you have to send the
  // data as formdata.
  // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
  // Check out the stackoverflow solution below : )

  // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509

  handlePlace = (place) => {
    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.
    console.log(place);
  };

  render() {
    const {
      name,
      category,
      quantity,
      address,
      tmpAvatar,
      description,
    } = this.state;
    return (
      <div className="ItemForm-container">
        <form
          className="form"
          onSubmit={this.handleSubmit}
          onChange={(e) => this.handleChange(e)}
        >
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input"
              value={this.state.name}
              name="name"
              type="text"
              placeholder="What are you giving away ?"
              defaultValue={name}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select id="category" name="category" defaultValue="Kombucha">
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="input"
              name="quantity"
              defaultValue="1"
              id="quantity"
              type="number"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="address" name="address">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="text-area"
              placeholder="Tell us something about this item"
            ></textarea>
          </div>

          <div className="form-group">
            {/* <label className="custom-upload label" htmlFor="image">
              Upload image
            </label> */}
            <Avatar avatar={tmpAvatar} clbk={this.handleImage} />

            {/* <input className="input" id="image" type="file" /> */}
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input type="radio" value="email" name="contact" />
              user email
            </div>
            <input type="radio" value="phone" name="contact" />
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>
          <button className="btn-submit">Add Item</button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
