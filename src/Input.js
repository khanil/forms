import React, { Component } from 'react';

export default class Input extends Component {

	constructor(props) {
		super(props);

		this.changeHandler = this.changeHandler.bind(this);
	}

	changeHandler(e) {
		this.props.model.value = e.target.value;
	}

	render() {
		const {
			model
		} =  this.props;

		return (
			<div className="form-group">
				<label>{model.title}</label>
				<input type="text" className="form-control" value={model.value} onChange={this.changeHandler}/>
			</div>
		);
	}
}