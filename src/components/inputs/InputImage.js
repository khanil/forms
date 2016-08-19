import React, { Component, PropTypes } from 'react';

export default class InputInteger extends Component {

  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(e.target.files[0]);

    oFReader.onload = (oFREvent) => {
      this.props.model.get('changeHandler')(oFREvent.target.result);
    };
  };

  render() {
    const {
      value
    } =  this.props.model.toObject();

    return (
      <div>
        {
          value
          ? <img style={{width: '100px', height: '100px'}} src={value}/>
          : ''
        }
        <form>
          <input type="file" name="myPhoto" onChange={this.changeHandler} />
        </form>
      </div>
    );
  }
}

{/*<input type="file" className="form-control" onChange={this.changeHandler} />*/}