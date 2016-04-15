import React from 'react'
import Router from 'ampersand-router'

import HomePage from './pages/home'
import CategoriesPage from './pages/categories'
import BrandsPage from './pages/brands'
import SpecialsPage from './pages/specials'

export default Router.extend({
	routes: {
		'' : 'home',
		'categories' : 'categories',
		'brands' : 'brands',
		'specials' : 'specials'
	},

	home () {
		React.render(<HomePage/>, document.body)
	},

	categories () {
		React.render(<CategoriesPage/>, document.body)
	},

	brands () {
		React.render(<BrandsPage/>, document.body)
	},

	specials () {
		React.render(<SpecialsPage/>, document.body)
	}
})