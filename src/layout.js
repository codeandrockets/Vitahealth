import React from 'react'
import NavHelper from './components/nav-helper'

export default React.createClass({
	displayName: 'layout',
	render () {
		return (
			<NavHelper>
					<h1>Vita Health</h1>
					<h2>Keeping Kiwis Healthy</h2>
					<nav>
						<ul>
							<li><a href="/">Home</a></li>
							<li><a href="/categories">Categories</a></li>
							<li><a href="/brands">Brands</a></li>
							<li><a href="/specials">Specials</a></li>
							<li><a href="/cart">Cart</a></li>
						</ul>
					</nav>
					<div>
						{this.props.children}
					</div>
			</NavHelper>
		)
	}
})