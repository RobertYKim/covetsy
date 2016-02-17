var React = require('react');

var ListingForm = React.createClass({
  changeFile: function (event) {
    var reader = new FileReader();
    var file = event.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({imageFile: file, imageUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({imageFile: null, imageUrl: ""});
    }
  },

  handleClick: function (event) {
    if (event.target.id !== "price") {
      this.convertPrice();
    }
  },

  handleChange: function (event) {
    var id = event.target.id;
    var value = event.target.value;
    var validQuantity = /^[0-9]+$/;
    var validPrice = /^[0-9]+[\.]?[0-9]{0,2}$/;
    if (id === "title") {
      this.setState({title: value});
    } else if (id === "price") {
      var oldPrice = this.state.price;
      if (validPrice.test(value) || value === "") {
        this.setState({price: value});
      } else {
        this.setState({price: oldPrice});
      }
    } else if (id === "quantity") {
      var oldQuantity = this.state.quantity;
      if (validQuantity.test(value) || value === "") {
        this.setState({quantity: value});
      } else {
        this.setState({quantity: oldQuantity});
      }
    } else if (id === "description") {
      this.setState({description: value});
    }
  },

  convertPrice: function () {
    if (this.state.price !== "") {
      this.setState({price: parseFloat(this.state.price).toFixed(2)});
    }
  },

  getInitialState: function () {
    return {
      imageFile: null,
      imageUrl: "",
      title: "",
      price: "",
      quantity: "",
      description: ""
    };
  },

  render: function () {
    var shopPath = "#/shop/" + this.props.params.shop_name;

    var image;
    if (this.state.imageUrl) {
      image = <img src={this.state.imageUrl}></img>;
    } else if (this.props.imageUrl) {
      image = <img src={this.props.imageUrl}></img>;
    } else {
      image =
        <div>
          <span className="fa fa-camera fa-lg"></span>
          <p>Add a photo</p>
        </div>;
    }

    var photo;
    photo =
      <div className="listing-form-photo">
        <h4>Photo</h4>
        <div className="listing-form-photo-polaroid">
          <input
            className="listing-form-photo-input"
            type="file"
            onChange={this.changeFile}/>
          <div className="listing-form-photo-image">
            {image}
          </div>
          <div className="listing-form-photo-bottom">

          </div>
        </div>
      </div>;

    var title;
    title =
      <div className="title-input group">
        <label htmlFor="title">Title</label>
        <div>
          <input
            id="title"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}></input>
          <p>Include keywords that buyers would use to search for your item.</p>
        </div>
      </div>;

    var price =
      <div className="price-input group">
        <label htmlFor="price">Price</label>
        <div>
          <input
            id="price"
            type="text"
            value={this.state.price}
            onChange={this.handleChange}></input>
          <p>Factor in the costs of materials and labor, plus any related business expenses.</p>
        </div>
      </div>;

    var quantity;
    quantity =
      <div className="quantity-input group">
        <label htmlFor="quantity">Quantity</label>
        <div>
          <input
            id="quantity"
            type="text"
            value={this.state.quantity}
            onChange={this.handleChange}></input>
        </div>
      </div>;

    var description;
    description =
      <div className="description-input group">
        <label htmlFor="description">Description</label>
        <div>
          <textarea
            id="description"
            value={this.state.description}
            onChange={this.handleChange}></textarea>
          <div>
            <p>Start with a brief overview that describes your item's finest features.</p>
            <p>List details like dimensions and key features in easy-to-read bullet points.</p>
            <p>Tell buyers a bit about your process or the story behind this item.</p>
          </div>
        </div>
      </div>;

    var input;
    input =
      <div className="listing-form-inputs">
        <h4>Listing details</h4>
        <p>Tell the world all about your item and why they'll love it.</p>
        {title}
        {price}
        {quantity}
        {description}
      </div>;

    return (
      <div className="listing-form" onClick={this.handleClick}>
        <div className="lising-form-underlay"></div>
        <a href={shopPath}>Back to shop</a>
        <h3>Add a new listing</h3>
        <form>
          {photo}
          {input}
          <button>Publish</button>
        </form>
      </div>
    );
  }
});

module.exports = ListingForm;
