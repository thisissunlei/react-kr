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
import State from './State';
import {Http,DateFormat} from "kr/Utils";
import {
	observer,
	inject
} from 'mobx-react';
@observer

class HomeLeft  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
	}


	render(){
		
		return(
			<div >
				<div className="item-left-line-one">

					<span className='item-one item'>
						<div className="tab-lists">
							<span className="tab-list ">已租工位</span>
							<span className="tab-list">空置工位</span>
							<span className="tab-list">总工位数</span>
						</div>
						<div className="stations-num">{State.info.communityId}2</div>
					</span>
					<span className='item-tow item'>{State.info.communityId}2</span>
					<span className='item-three item'>{State.info.communityId}3</span>
				</div>
				


	     	</div>

		);
	}
}

export default HomeLeft;
