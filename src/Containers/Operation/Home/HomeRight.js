import React from 'react';
import {
  reduxForm,
  change,
  arrayPush,
  initialize
} from 'redux-form';

import {
  Actions,
  Store
} from 'kr/Redux';
import {
	Title,Dialog,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,

} from 'kr-ui';
import home from './images/home-community.svg';
import  "./index.less";
import {Http,DateFormat} from "kr/Utils";
import {
	observer,
	inject
} from 'mobx-react';
@observer

class HomeRight  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
	}


	render(){
		
		return(
			<div >
				<div className="item-left-line-one">

					<span className='item-one item'>1</span>
					<span className='item-tow item'>2</span>
					<span className='item-three item'>3</span>
				</div>
				


	     	</div>

		);
	}
}

export default HomeRight;
