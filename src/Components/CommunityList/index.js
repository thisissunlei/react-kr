import React, {
	Component
} from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import ReactDOM from 'react-dom';
import { default as CommunityListData } from './CommunityListData.json';
import Input from '../Input'
import './index.less';
export default class CommunityList extends Component {
	// static displayName = 'CircleStyle';
	static defaultProps = {
		num: 1,
		info: '',
		circle: 'center',
	}
	static propTypes = {
		/**
		 * num
		 */
		// num: React.PropTypes.any,
		/**
		 * info 文字描述
		 */
		// info: React.PropTypes.string,
		/**
		 * style 样式
		 */
		// style: React.PropTypes.object,
	};
	constructor(props) {
		super(props);
		this.state = {
			openChildCommunityList:false
		}
	}
	componentWillReceiveProps(nextProps) {
	}
	showChildCommunity=()=>{
		
	}
	getCityList=()=>{
		var cityList = [];
		cityList = CommunityListData.map((item)=>{
			
			var obj = {};
			obj.cityName = item.cityName;
			return obj;
		})
		return cityList;
	}
	getCommunityList=()=>{
		for(var i=0;i<CommunityListData.length;i++){
			console.log(CommunityListData.length)
		}
	}
	render() {
		let {
			style,
			...other
		} = this.props;
		let childCommunityList ={};
		let cityList=this.getCityList();
		console.log("cityList",cityList)
		let communityList = this.getCommunityList();
		return (
			<div className="ui-community-list-box" style={style}>
				<div className="ui-community-list-left">
					<Input placeholder={"输入查找关键字"}/>
					<div className="ui-community-list-all">
						<div className="ui-community-list-title">
							<span>全部社区</span>
							<span></span>	
						</div>
						<div className="ui-community-list-all-table">
							<ul className="ui-community-list-all-ul">
								{cityList.map((item,index)=>{
									return (<li className='ui-community-list-all-cityLi' key={item.cityName}>
												<span>{item.cityName}</span>
												<ul>
													
												</ul>
											</li>
									)
								})}
							</ul>
						</div>
					</div>
				</div>
				<div className="ui-community-list-right"></div>
			</div>
		);
		
	}
}



