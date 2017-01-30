import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import FormComponent from '../components/FormComponent';
import { HeaderGenerator, QuestionGenerator, DelimeterGenerator,
    ImageGenerator } from '../components/generators';
import { addItem, removeItem, swapItems, initForm, handleUserInput,
    addItemField, removeItemField, addItemLive, removeItemLive, swapItemsLive } from '../actions';
import { bindFunctions, itemTypes, itemDefaults } from '../utils';
import FormItem from '../components/FormItem';
import FormGeneratorMenu from '../components/FormGeneratorMenu';
import CComponent from '../components/CComponent';

const defaultQuestion = itemDefaults.get(itemTypes.QUESTION);

const initialState = {
    title: '',
    type: '',
    basis: '',
    basisname: '',
    description: '',
    items: [
        defaultQuestion
    ]
}

/**
 * Container component that builds form scheme in redux state
 */
class FormGenerator extends CComponent {
    constructor(props) {
        super(props);
        this.formKey = 'scheme';

        bindFunctions.call(this, ['setFieldValue', 'getFieldValue', 'addItemField', 'removeItemField',
            'addItem', 'removeItem', 'swapItems', 'submitHandler', 'checkGeneratorValidity']);

        this.createAddItemFunc.call(this);
        this.refPrefix = 'itemGenerator';
    }

    componentWillMount() {
        const providedState = this.props.initialState;
        // make object in redux store to store responses of current form
        this.props.initForm(this.formKey, providedState ? providedState : initialState);
    }

    /**
     * returns the field value from store by field key
     * @param  {string} fieldKey [points at element that stores field value]
     * @return {any}          [stored value]
     */
    getFieldValue(localPath, fieldKey) {
        const schemeStore = this.props.scheme;
        const path = localPath ? localPath.split('.') : [];
        path.push(fieldKey)
        return schemeStore.getIn(path);
    }

    /**
     * handles user input into form fields
     * @param  {string} fieldKey [points at element that stores field value]
     * @param  {any} value    [new value]
     */
    setFieldValue(localPath, fieldKey, value) {
        this.props.handleUserInput(this.formKey, fieldKey, localPath, value);
    }

    /**
     * dispatches ADD_ITEM_FIELD action
     * that adds new prop in item object and cause corresponding input component render
     * @param {string} itemIndex    pointer on item object
     * @param {string} fieldName    prop name to add
     * @param {string} defaultValue default value of added prop
     */
    addItemField(itemIndex, fieldName, defaultValue) {
        this.props.addItemField(this.formKey, itemIndex, fieldName, defaultValue);
    }

    /**
     * dispatches REMOVE_ITEM_FIELD action
     * that remove prop from item object and cause corresponding input component removing
     * @param {string} itemIndex    pointer on item object
     * @param {string} fieldName    prop name to delete
     */
    removeItemField(itemIndex, fieldName) {
        this.props.removeItemField(this.formKey, itemIndex, fieldName);
    }

    /**
     * dispatches ADD_ITEM action
     * that inserts item picked by type or with provided scheme in scheme items array
     * @param {integer} position
     * @param {string} type     utils/itemTypes.js
     * @param {obj} scheme
     */
    addItem(position, type, scheme) {
        if (this.props.previewKey)
            this.props.addItemLive(this.formKey, this.props.previewKey, position, type, scheme);
        else
            this.props.addItem(this.formKey, position, type, scheme);
    }

    /**
     * dispatches REMOVE_ITEM action
     * that removes item from scheme items array
     * @param  {integer} position
     */
    removeItem(position) {
        if (this.props.previewKey)
            this.props.removeItemLive(this.formKey, this.props.previewKey, position);
        else
            this.props.removeItem(this.formKey, position);
    }

    /**
     * dispatches SWAP_ITEMS action
     * that swap to items in scheme items array
     * @param  {integer} fPos first item index
     * @param  {integer} sPos second item index
     */
    swapItems(fPos, sPos) {
        if (this.props.previewKey)
            this.props.swapItemsLive(this.formKey, this.props.previewKey, fPos, sPos);
        else
            this.props.swapItems(this.formKey, fPos, sPos);
    }

    /**
     * creates API functions for adding items of specific type
     */
    createAddItemFunc() {
        const supportedTypes = itemTypes;

        for (let key in supportedTypes) {
            const type = supportedTypes[key];
            const funcName = 'add' + type[0].toUpperCase() + type.slice(1);
            this[funcName] = pos => this.addItem(pos, type);
        }
    }

    /**
     * checks are all input fields valid
     * @return {boolean}
     */
    checkGeneratorValidity() {
        console.log(this.refs);
        //all item generators and form header generator
        const itemGeneratorsN = this.props.scheme.get('items').size + 1; //1 stands for header generator
        let isValid = true;

        for (let i = 0; i < itemGeneratorsN; i++) {
            isValid = this.refs[this.refPrefix + i].refs['form'].checkFormValidity() && isValid;
        }

        return isValid;
    }

    submitHandler() {
        const isFormValid = this.checkGeneratorValidity();
        console.log(`Generator valid? -${isFormValid}`);

        if (!isFormValid) {
            alert('Во время заполнения полей возникли ошибки.\nПроверьте правильность заполнения полей и повторите сохранение.');
            return;
        }

        //delete all util _id props in items
        const scheme = this.props.scheme.update('items', items => items.map(item => item.delete('_id'))).toJS();

        if (!this.props.onSubmit)
            console.warn('onSubmit function does\'nt provided as a prop to FormGenerator component');
        else
            this.props.onSubmit(scheme);

        console.log(JSON.stringify(scheme, "", 4));
    }

    /**
     * renders list of react components which represent form items generators
     * based on redux state scheme
     * @return {array}
     */
    renderItemGenerators() {
        //console.log('Form Generator items:');

        const items = this.props.scheme.get('items');

        return items.map( (item, i) => {
            //define the type of generator component
            const type = item.get('_type');

            //console.log(`item ${i} _id: ${item.get('_id')}`);

            const props = {
                key: item.get('_id'),
                id: item.get('_id'),
                ref: this.refPrefix + (i + 1), // i = 0 - header generator
                fields: item,
                path: `items.${i}`,
                addField: (fieldName, defaultValue) => { this.addItemField(i, fieldName, defaultValue) },
                removeField: (fieldName) => { this.removeItemField(i, fieldName) },
                getFieldValue: this.getFieldValue,
                setFieldValue: this.setFieldValue
            }

            const itemProps = {
                key: item.get('_id') + 'i',
                index: i,
                first: i === 0,
                last: i === items.size - 1,
                copyItem: () => (this.addItem(i + 1, '', item)),
                removeItem: () => this.removeItem(i),
                swapItems: this.swapItems
            }

            switch (type) {
                case itemTypes.QUESTION :
                    return (
                        <FormItem {...itemProps}>
                            <QuestionGenerator {...props}/>
                        </FormItem>
                    );

                case itemTypes.DELIMETER :
                    return (
                        <FormItem {...itemProps}>
                            <DelimeterGenerator {...props}/>
                        </FormItem>
                    );

                case itemTypes.IMAGE :
                    return (
                        <FormItem {...itemProps}>
                            <ImageGenerator {...props}/>
                        </FormItem>
                    );

                default:
                    console.error(`Unknown scheme item type: ${type}.`);
            }
        });
    }

    render() {
        //store doesn't set up yet
        if (this.props.scheme == undefined)
            return null;

        const headerGeneratorProps = {
            index: 'header',
            ref: this.refPrefix + '0',
            fields: this.props.scheme.delete('items'),
            basisTypes: this.props.basisTypes,
            formTypes: this.props.formTypes,
            path: null,
            getFieldValue: this.getFieldValue,
            setFieldValue: this.setFieldValue
        }

        return (
            <div className='form-generator'>
                <HeaderGenerator {...headerGeneratorProps} />

                {this.renderItemGenerators()}

                <FormGeneratorMenu 
                    addQuestion={this.addQuestion}
                    addDelimeter={this.addDelimeter}
                    addImage={this.addImage} />

                {/*<div className='form-group'>
                    <button type="button" className="btn btn-default" onClick={() => this.addItem(0, 'question')}>Q+</button>
                    <button type="button" className="btn btn-default" onClick={() => this.addItem(this.props.scheme.get('items').size, 'delimeter')}>D+</button>
                    <button type="button" className="btn btn-default" onClick={() => this.addItem(this.props.scheme.get('items').size, 'image')}>I+</button>
                    <button type="button" className="btn btn-default" onClick={() => this.removeItem(this.props.scheme.get('items').size-1)}>-</button>
                    <button type="button" className="btn btn-default" onClick={() => this.swapItems(0, 1)}>o</button>
                    </div>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        scheme: state.forms.get('scheme')
    }
};

const mapDispatchToProps = {
    addItem,
    removeItem,
    swapItems,
    initForm,
    handleUserInput,
    addItemField,
    removeItemField,
    addItemLive,
    removeItemLive,
    swapItemsLive
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(FormGenerator);