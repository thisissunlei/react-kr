import React from 'react';

export default class Basic extends React.Component {

	constructor(props,context){
		super(props, context);
	}


  render() {


    return (
      <div>
					{this.props.children}
      </div>
    );
  }
}
