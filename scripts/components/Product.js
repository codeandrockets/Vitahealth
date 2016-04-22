import React from 'react';

//<Product />
var Product = React.createClass({
	onButtonClick : function() {
		console.log('Whoop', this.props.index);
		this.props.addToOrder(this.props.index);
	},	
	render : function() {
		var details = this.props.details;
		var isAvailable = (details.status === 'available' ? true : false);
		var buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');
		return (
			<li className="menu-product">
				<img src={this.props.details.image} alt="" />
				<h3 className="product-name">
					{details.name}
					<span className="price">{h.formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
			</li>
		)
	}
});

export default Product;