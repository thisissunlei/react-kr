import React, { PropTypes} from 'react';
import { connect } from 'react-redux';

export default class Basic extends React.Component {

	constructor(props,context){
		super(props, context);
	}

  componentWillMount() {

  }

  render() {


    return (
      <div>
					{this.props.children}
      </div>
    );
  }
}









