var React = require('react');

var ListingForm = React.createClass({
  render: function () {
    var photo;
    photo =
      <div className="listing-form-photo">
        <h4>Photo</h4>
        <div className="listing-form-photo-polaroid">
          <div className="listing-form-photo-image">
            <span className="fa fa-camera fa-lg"></span>
            <p>Add a photo</p>
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
            type="text"></input>
          <p>Include keywords that buyers would use to search for your item.</p>
        </div>
      </div>;

    var price =
      <div className="price-input group">
        <label htmlFor="price">Price</label>
        <div>
          <input
            id="price"
            type="text"></input>
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
            type="text"></input>
        </div>
      </div>;

    var description;
    description =
      <div className="description-input group">
        <label htmlFor="description">Description</label>
        <div>
          <textarea
            id="description"></textarea>
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
      <div className="listing-form">
        <div className="lising-form-underlay"></div>
        <a>Back to shop</a>
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
