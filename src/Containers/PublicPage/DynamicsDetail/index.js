import {
	PlanMap,
	Dialog,
	Button,
	XTable,
	XTableRow,
	Section,
	SliderTree,
} from 'kr-ui';
import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';

@inject("NavModel")
@observer


export default class DynamicsDetail extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams:{
				name:'ddsdfs'
			},
		
		}

	}
	componentDidMount(){
		const { NavModel } = this.props;
		NavModel.setSidebar(false);

	}
	
	render() {
		
		return (
			<div title="demo">
				<div className='g-dynamics-detail'>
                    <div className='g-dynamics-detail-left'></div>
                    <div className='g-dynamics-detail-right'></div>
                    <div className='g-dynamics-detail-container'>
                        <li className='g-dynamics-detail-title'>浅谈用户体验数据化</li>
                        <li className='g-dynamics-detail-time'>2017/08/03</li>
                        <li className='g-dynamics-detail-img'></li>
                    </div>
                    <div className='g-dynamics-detail-content'></div>
                </div>
			</div>

		);
	}
}
