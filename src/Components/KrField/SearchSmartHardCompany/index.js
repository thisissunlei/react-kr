import React from 'react';
import {
	Http
} from "kr/Utils";

import ReactSelectAsync from '../../Select/Async';

import {Actions,Store} from 'kr/Redux';


import WrapComponent from '../WrapComponent';

export default class  SearchSmartHardCompany extends React.Component {

	static defaultProps = {
		placeholder:'请输入公司名称'
	}

	static PropTypes = {
		placeholder:React.PropTypes.string,
		inline:React.PropTypes.bool
	}

	constructor(props){
		super(props)
		this.state = {
			ValueInfo: {}
		}
		
	}

	componentDidMount(){
		let {input,ValueInfo } = this.props;
		let Info=ValueInfo?ValueInfo:{}
		this.setState({
			ValueInfo: Info
		})
	}
	componentWillReceiveProps(nextProps) {
		var _this = this;
		if(nextProps.ValueInfo && nextProps.ValueInfo.csrId){
			this.setState({
				ValueInfo:nextProps.ValueInfo
			}, function() {
				_this.selects.loadOptions()
			})
		}
		
	}

	onChange=(item)=>{
		let {input,onChange} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
		onChange && onChange(item);
	}
	getOptions=(companyName)=>{
		let {ValueInfo}=this.state;
		
		var flag=[];
		return 	Http.request('get-smart-hard-company',{ companyName:companyName || ''}).then(function(response){
				let items=response.items;
				items.forEach(function(item,index){
					item.value = item.id;
					item.label = item.companyName;
					if(ValueInfo.csrId){
						if(item.id==ValueInfo.csrId){
							flag.push('0');
						}
					}
				});
				
				if (flag.indexOf('0')== -1){
					items.push(ValueInfo);
				}
				
				return {options:items}
			})
			
	}
	render(){
		let { input, label, type, meta: { touched, error },placeholder,children,disabled,style,requireLabel,...other} = this.props;
		
		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel}>
					<ReactSelectAsync
					name={input.name}
					value={input.value}
					ref={(selects)=>this.selects=selects}
					loadOptions={this.getOptions}
					clearable={true}
					clearAllText="清除"
					onChange={this.onChange}
					noResultsText=""
					placeholder={placeholder}/>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div>}
		</WrapComponent>
		);
	}
}
