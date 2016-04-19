import React from 'react'
import Router from 'ampersand-router'

import HomePage from './pages/home'
import CategoriesPage from './pages/categories'
import BrandsPage from './pages/brands'
import SpecialsPage from './pages/specials'
import CartPage from './pages/cart'
import Layout from './layout'

export default Router.extend({
	renderPage (page) {
			page = (
			<Layout>
				{page}
			</Layout>
			)

		React.render(page, document.body)
	},

	routes: {
		'' : 'home',
		'categories' : 'categories',
		'brands' : 'brands',
		'specials' : 'specials',
		'cart' : 'cart',
	},

	home () {
		this.renderPage(<HomePage/>)
	},

	categories () {
		this.renderPage(<CategoriesPage/>)
	},

	brands () {
		this.renderPage(<BrandsPage/>)
	},

	specials () {
		this.renderPage(<SpecialsPage/>)
	},

	cart () {
		this.renderPage(<CartPage/>)
	},

	moltin () {
		this.renderPage(<Moltin/>)
	}
})