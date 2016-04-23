import React from 'react';

//<AddProductForm />

var AddProductForm = React.createClass({
	createProduct : function(event) {
	//1. Stop the form from submitting
	event.preventDefault();
	//2. Take the data from the form and create an object
	var product = {
		name : this.refs.name.value,
		price : this.refs.price.value,
		status : this.refs.status.value,
		desc : this.refs.desc.value,
		image : this.refs.image.value
	}

	//3. Add the product to the app state 	
	this.props.addProduct(product);
	this.refs.productForm.reset();
	},
	render: function() {
		return (
			<form className="product-edit" ref="productForm" onSubmit={this.createProduct}>
				<input type="text" ref="name" placeholder="Product Name"/>
				<input type="text" ref="price" placeholder="Product Price" />
				<select ref="status">
					<option value="available">Available!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" ref="desc" placeholder="Desc"></textarea>
				<input type="text" ref="image" placeholder="URL to Image" />
				<button type="submit">+ Add Item </button>
			</form>	
		)
	}
});

export default AddProductForm;