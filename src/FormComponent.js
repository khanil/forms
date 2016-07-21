import React, { Component, PropTypes } from 'react';
import Input from './Input';
import { connect } from 'react-redux';

/*
@param:
@scheme
 */
export default class FormComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			model: []
		};

		this.state.model = this.buildModel(this.props.scheme);
	}

	/**
	 * builds model from scheme
	 * @param  {object}  scheme
	 * @return {object}
	 */
	buildModel(scheme) {
		//copying scheme to solo object
		const model = scheme.questions.map( (item, i) => (Object.assign({}, item)));

		let nextAvailableResponsesKey = 0;
		for (let key in model) {
			let item = model[key];

			if (item._type === 'question') {
				//set pointer to element in responses object, where the value of input field will be stored
				item._responseKey = nextAvailableResponsesKey;
				nextAvailableResponsesKey++;

				//dynamic changing value of field
				Object.defineProperty(item, "value", { 
					get: () => (this.props.store[item._responseKey]),
					set: (value) => {
						// const newResponsesState = this.store.slice();
						// newResponsesState[item._responseKey] = value;
						// this.setState({responses: newResponsesState});
						this.props.dispatch({
							type: 'FIELD_VALUE_CHANGED',
							payload: {
								formKey: this.props._formKey,
								fieldKey: item._responseKey,
								value: value
							}
						});
					}
				});
			}
		}

		console.log('Builded model: ');
		console.log(model);
		return model;
	}

	render() {

		const model = this.state.model;
		const formTitle = this.props.scheme.title;

		return (
			<form action="" method="POST" role="form">
				<legend>{formTitle}</legend>
			
					{
						model.map( (item, i) => {
							const itemType = item._type;

							switch (itemType) {
								case 'question':
									return <Input key={i} model={item}/>;

								default:
									return <div key={i}>Delimeter</div>
							}
						})
					}

				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		)
	}
}

FormComponent.propTypes = {
  scheme: PropTypes.object.isRequired
}