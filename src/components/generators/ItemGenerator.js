import React, { Component } from 'react';
import FormComponent from '../FormComponent';
import { Map, List, fromJS } from 'immutable';
import { bindFunctions } from '../../utils';
import CComponent from '../CComponent';

/**
 * Presentational component that renders input fields specified in fields prop
 * @param {object} fields object passed from store, specified which input fields must be rendered
 * @param {func} setFieldValue transmits user input changes to store
 * @param {func} getFieldValue extracts user input value from store
 * @param {func} addField inserts new input field in store
 * @param {func} removeField removes input field from store
 * @param {string} path util passed in setFieldValue and getFieldValue func
 */
export default class ItemGenerator extends CComponent {
    constructor(props, getSchemeTemplate, generatorType) {
        super(props);

        this.state = {
            scheme: Map()
        }

        if (getSchemeTemplate === undefined)
            console.error('You need to pass getSchemeTemplate func in ItemGenerator component');

        bindFunctions.call(this, ['toggleFields', 'buildSchemeItems', 'updateSchemeItems']);
        this.schemeTemplate = getSchemeTemplate.bind(this)();
        this.type = generatorType;
    }

    componentWillMount(){
        // console.log(`ItemGenerator #${this.props.id}. Just created.`);

        const items = this.buildSchemeItems(this.props.fields);

        this.setState(({scheme}) => ({
            scheme: scheme.set('items', items)
        }));
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props);
        // console.log(nextProps);

        if (this.props.fields === nextProps.fields) {

            if (this.props.path !== nextProps.path) {
                // console.log(`ItemGenerator #${this.props.id}. Supplied path changed.`);
                return;
            }

            // console.log(`ItemGenerator #${this.props.id}. Nothing changed.`);
            return;
        }

        //if fields object keys changed, then update scheme
        const keys = this.props.fields.keySeq();
        const nextKeys = nextProps.fields.keySeq();
        const equal = nextKeys.equals(keys)
        const updated = !equal;

        if (updated) {
            // console.log(`ItemGenerator #${this.props.id}. Fields keys changed, rebuild scheme...`);
            const newItems = this.updateSchemeItems(this.props.fields, nextProps.fields, this.state.scheme.get('items'));
            // console.log('New scheme:');
            // console.log(newItems.toJS());

            this.setState(({scheme}) => ({
                scheme: scheme.set('items', newItems)
            }));

            return;
        }
        // console.log(`ItemGenerator #${this.props.id}. Nothing changed.`);
    }

    /**
     * [toggleFields description]
     * @param  {object} fields map of fieldName : fieldValue
     */
    toggleFields(fields) {
        for (let key in fields) {
            const fieldName = key;
            const defaultValue = fields[key];

            if (this.props.fields.get(fieldName) === undefined) {
                this.props.addField(fieldName, defaultValue);
            } else {
                this.props.removeField(fieldName);
            }
        }
    }

    // toggleFields(fieldName, defaultValue) {
    //  if (this.props.fields.get(fieldName) === undefined) {
    //      this.props.addField(fieldName, defaultValue);
    //  } else {
    //      this.props.removeField(fieldName);
    //  }
    // }

    /**
     * builds scheme object that include items specified in fields object
     * @return {obj} scheme
     */
    buildSchemeItems(fields) {
        //if template item name was found in fields object, item adds to scheme object
        const items = this.schemeTemplate.filter((item, i) => (fields.get(item.name) !== undefined));
        return fromJS(items);
    }

    updateSchemeItems(oldFields, newFields, items) {
        let newItems = List();
        newItems = newItems.withMutations((newItems) => {
            this.schemeTemplate.forEach((item, i) => {
                //if item unedfined in newFields object, continue
                if (newFields.get(item.name) === undefined)
                    return;

                //item scheme was added in previous items object state
                if (oldFields.get(item.name) !== undefined) {
                    newItems = newItems.push( items.find(value => value.get('name') === item.name) );
                    return;
                }

                //need to add item scheme
                newItems.push( fromJS(item) );
            });
        });

        return newItems;
    }

    render() {
        return (
            <div className={`form-generator-item__item-generator form-generator-item__item-generator_type_${this.type}`}>
                <FormComponent
                    //TODO: delete id
                    id={this.props.id}
                    ref='form'
                    path={this.props.path}
                    scheme={this.state.scheme}
                    setFieldValue={this.props.setFieldValue}
                    getFieldValue={this.props.getFieldValue}
                />
            </div>
        );
    }
}