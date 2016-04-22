import React from 'react';

//<Order />
var Order = React.createClass({
	renderOrder : function(key) {
		var product = this.props.products[key];
		var count = this.props.order[key];
		var removeButton = <button onClick={this.props.removeFromOrder.bind(null,key)}>&times;</button>

		if(!product) {
			return <li key={key}>Sorry, product no longer available! {removeButton}</li>
		}

		return (<li key={key}>
					{count}x
					{product.name}
					<span className="price">{h.formatPrice(count * product.price)}</span>{removeButton}
				</li>)
	},
	render : function() {
		var orderIds = Object.keys(this.props.order);
		var total = orderIds.reduce((prevTotal, key)=> {
		var product = this.props.products[key];
		var count = this.props.order[key];
		var isAvailable = product && product.status === 'available';

		if(product && isAvailable) {
			return prevTotal + (count * parseInt(product.price) || 0 );
		}

		return prevTotal;

		}, 0);
	return (
		<div className="order-wrap">
			<h2 className="order-title">Your Order</h2>
			<ul className="order">
				{orderIds.map(this.renderOrder)}
				<li className="total">
					<strong>Total:</strong>
					{h.formatPrice(total)}
				</li>
			</ul>
		</div>
		)	
	}
});

export default Order;