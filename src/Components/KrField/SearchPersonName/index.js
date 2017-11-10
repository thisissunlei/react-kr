import React from 'react';
import {
	Http
} from "kr/Utils";

import ReactSelectAsync from '../../Select/Async';

import {Actions,Store} from 'kr/Redux';


import WrapComponent from '../WrapComponent';

export default class  SearchPersonName extends React.Component {

	static defaultProps = {
		placeholder:'请输入姓名'
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
		this.onChange = this.onChange.bind(this);
		this.getOptions = this.getOptions.bind(this);
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
		if(nextProps.ValueInfo && nextProps.ValueInfo.memberId){
			this.setState({
				ValueInfo:nextProps.ValueInfo
			}, function() {
				_this.select.loadOptions()
			})
		}
		
		
		
		
	}


	onChange(item){
		let {input,onChange} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
		onChange && onChange(item);
	}

	getOptions(mbrNameStr){
		let {ValueInfo}=this.state;
		var flag=[];
		
			return Http.request('find-by-name',{ mbrNameStr:mbrNameStr || ''}).then(function(response){
				response.mbrList.forEach(function(item,index){
					item.value = item.memberId;
					item.label = item.managerName;
					if(ValueInfo.memberId){
						if(item.memberId==ValueInfo.memberId){
							flag.push('0');
						}
					}
				});
				
				if (flag.indexOf('0')== -1){
					response.mbrList.push(ValueInfo);
				}
				return {options:response.mbrList};
			})
	}

	render(){

		let { input, label, type, meta: { touched, error },placeholder,children,disabled,style,requireLabel,...other} = this.props;

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel}>
					<ReactSelectAsync
					name={input.name}
					ref={(select)=>this.select=select}
					value={input.value}
					loadOptions={this.getOptions}
					clearable={true}
					clearAllText="清除"
					onChange={this.onChange}
					onInputChange={this.onInputChange}
					noResultsText=""
					placeholder={placeholder}/>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div>}
		</WrapComponent>
		);
	}
}
