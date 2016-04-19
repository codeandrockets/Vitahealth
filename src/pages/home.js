import React from 'react'
import Moltin from 'moltin'

export default React.createClass({
	getProducts: function() {
		var moltin = new Moltin({publicId: 'KSkSai1URaQH3xMyTAV86xS6TZoG371srasglQ69iU'});
		  moltin.Authenticate(function() {
		    // Code here...
		  });
	},
	render () {
		return (
			<div componentDidMount={this.getProducts()}>
				<h2 >Home</h2>
				
			</div>
		)
	}
})



