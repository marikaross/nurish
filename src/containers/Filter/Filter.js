import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Dropdown, Input, Button } from 'semantic-ui-react';
import './Filter.css'

const specialties = [{ key: 'VHP', value: 'HighProtein', text: 'Very High Protein (VHP)'}]
const allergies = [{ key: 'Gluten', value: 'Wheat', text: 'Wheat and/or Gluten'},
{ key: 'Corn', value: 'Corn', text: 'Corn'}, { key: 'Soy', value: 'Soy', text: 'Soy'}]
const mctSplit = [{ key: '50:10:40', value: '50:10:40', text: '50:10:40'},
{ key: '30:40:30', value: '30:40:30', text: '30:40:30'}, { key: '20:20:10', value: '20:20:10', text: '20:20:10'}]

class Filter extends Component {
	constructor() {
		super()

		this.state = {
			allergens: [],
			specialty: [],
			mct: []
		}
	}

	handleSubmit = async (event) => {
		event.preventDefault()
		const specialty = await this.fetchFormulas('specialty')
		const allergens = await this.fetchFormulas('allergens')
		const mct = await this.fetchFormulas('mct')
		// this.filterFormulas(allergens, specialty, mct)
	}

	handleSpecialty = (event, data) => {
		this.setState({ specialty: [data.value]})
	}

	handleAllergens = (event, data) => {
		this.setState({ allergens: [...data.value]})
	}

	handleMCT = (event, data) => {
	this.setState({ mct: [data.value]})
	}
 
	fetchFormulas = async (criteria) => {
		let urlParam = this.state[criteria].join()	
		let url = `https://nurish-app.herokuapp.com/api/v1/formulas?${criteria}=${urlParam}`
		const response = await fetch(url)
		return await response.json()
	}

	// filterFormulas = (allergens = [], specialty = [], mct = []) => {
	// 	switch (allergens) {
	// 		case allergens.length:

	// 	}
 // }

	render() {
		return (
			<div className='form-container filter-container'>
				<div className='link-container'>
					<NavLink to='/'>back</NavLink>
					<NavLink to='/search'>search</NavLink>
					<NavLink to='/browse'>browse</NavLink>
				</div>
				<form className='filter-form' onSubmit={this.handleSubmit}>
				<Dropdown onChange={this.handleSpecialty} placeholder='specialty' fluid search selection options={specialties}/>
				<Dropdown onChange={this.handleAllergens} placeholder='allergies' fluid multiple search selection options={allergies}/>
				<Dropdown onChange={this.handleMCT} placeholder='mct split' fluid search selection options={mctSplit}/>
    		<Button fluid>Search</Button>
				</form>
			</div>
		)
	}
}

export default withRouter(Filter);