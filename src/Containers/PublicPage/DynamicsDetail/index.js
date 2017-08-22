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
import {
	Http,
	DateFormat
} from "kr/Utils";
import './index.less';

@inject("NavModel")
@observer


export default class DynamicsDetail extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			infoList:{},
			searchParams:{},
		}

	}
	componentDidMount(){
		const { NavModel } = this.props;
		NavModel.setSidebar(false);
		const id = this.props.params.id;
		var _this = this;
		Http.request('base-dynamics-detail', {
                id: id,
		},{}).then(function(response) {
			console.log(response,"response");
			_this.setState({infoList: response})
		}).catch(function(err) {});
	}
	
	render() {
		let {infoList,searchParams} = this.state;
		
		if(infoList.photoUrl){
			var styles={};
			styles.backgroundImage = `url(${infoList.photoUrl})`;
			styles.backgroundSize = 'cover';
			styles.backgroundPosition = 'center center';
			styles.backgroundRepeat = 'no-repeat';
		}
		
		return (
			<div title="demo">
				<div className='g-dynamics-detail'>
                    <div className='g-dynamics-detail-left'></div>
                    <div className='g-dynamics-detail-right'></div>
                    <div className='g-dynamics-detail-container'>
                        <li className='g-dynamics-detail-title'>{infoList.title}</li>
                        <li className='g-dynamics-detail-time'>{infoList.time}</li>
                        {infoList.photoUrl && <li style={styles} className='g-dynamics-detail-img'></li>}
                    </div>
                    <div className='g-dynamics-detail-content'>
						{this.state.infoList.content || '无'}
					</div>
                </div>
			</div>

		);
	}
}
