var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;

var History = ReactRouter.History; 
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');

//Firebase
var Rebase = require('re-base');
var base = Rebase.createClass('https://app-of-the-day.firebaseio.com/');

var Catalyst = require('react-catalyst');

//**************************** IMPORT COMPONENTS *************************************//

import NotFound from './components/NotFund';

//App *********************  FRONT PAGE  *********************************************//
var App = React.createClass({
	mixins : [Catalyst.LinkedStateMixin],
	getInitialState : function() {
		return {
			products : {},
			order : {}
		}
	},
	componentDidMount : function() {
		base.syncState(this.props.params.storeId + '/products', {
			context : this,
			state : 'products'	
		});

		var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

		if(localStorageRef) {
			//update our component state to reflect what is in the localstorage
			this.setState({
				order : JSON.parse(localStorageRef)
			});
		}

	},
	componentWillUpdate : function(nextProps, nextState) {
		localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
	},
	addToOrder : function(key) {
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({ order : this.state.order});
	},
	removeFromOrder : function(key){
		delete this.state.order[key];
		this.setState({
			order : this.state.order
		});
	},
	addProduct : function(product) {
		var timestamp = (new Date()).getTime();
		//Update the state
		this.state.products['product-' + timestamp] = product;
		//Set the state
		this.setState({ products : this.state.products });
	},
	removeProduct : function(key) {
		if(confirm("Are you sure you want to remove this product?")) {
			this.state.products[key] = null;
			this.setState({
				products : this.state.products
			});
		}
	},
	renderProduct : function(key){
		return <Product key={key} index={key} details={this.state.products[key]} addToOrder={this.addToOrder} />
	},
	render : function() {
		return (
			<div className="">
				<div className="">
					<Header tagline="Keeping Kiwis Healthy"/>
					<Navigation />
					<ul className="list-of-products">
						{Object.keys(this.state.products).map(this.renderProduct)}
					</ul>
				</div>
				<Order products={this.state.products} order={this.state.order} removeFromOrder={this.removeFromOrder} />
				<Inventory addProduct={this.addProduct} products={this.state.products} linkState={this.linkState} removeProduct={this.removeProduct}/>
			</div>
		)
	}
});




//Product
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

//Add Product Form
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


//Header
//<Header />
var Header = React.createClass({
	render : function() {
		return (
			<header className="top">
				<h1>Vitahealth</h1>
				<h3 className="tagline"><span>{this.props.tagline}</span></h3>
			</header>
		)
	}
})

//Order
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

//Inventory
//<Inventory />
var Inventory = React.createClass({
	renderLogin : function() {
		<div>
			<h2>Log in to manage the store</h2>
			<button>Log Facebook</button>
		</div>
	},
	renderInventory : function(key) {
		var linkState = this.props.linkState;
 		return (
			<div className="product-edit" key={key}>
				<input type="text" valueLink={linkState('products.'+ key +'.name')}/>
				<input type="text" valueLink={linkState('products.'+ key +'.price')}/>
				<select valueLink={linkState('products.' + key + '.status')}>
					<option value="unavailable">Sold Out</option>
					<option value="available">Available!</option>
				</select>

				<textarea valueLink={linkState('products.'+ key +'.desc')}></textarea>
				<input type="text" valueLink={linkState('products.'+ key +'.image')}/>
				<button onClick={this.props.removeProduct.bind(null, key)}>Remove Product</button>
			</div>
		)
	},
	render : function() {
		if(!this.state.userId) {
			return (
				{this.renderLogin()}
			)
		}
		return (
			<div>
				<h2>Inventory</h2>

				{Object.keys(this.props.products).map(this.renderInventory)}

				<AddProductForm {...this.props} />
			</div>
		)	
	}
});


//**********    Navigation Component **************************************************//

var Navigation = React.createClass({
	render : function() {
		return (
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/cart">Cart</a></li>
			</ul>
		)
	}
});

//Not Found Component 

var NotFound = React.createClass({
	render : function() {
		return <h1>Page Not Found!</h1>
	}
});

//Routes

var routes = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={App} />
		<Route path="/cart" component={App} />
		<Route path="*" component={NotFound} />
	</Router>
)

ReactDOM.render(routes, document.querySelector('#main'));