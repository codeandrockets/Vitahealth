import React from 'react';

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

export default Header;