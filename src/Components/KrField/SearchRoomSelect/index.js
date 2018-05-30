import React from 'react';

import {
	Http
} from "kr/Utils";
import ReactSelectAsync from '../../Select/Async';

import {
	Actions,
	Store
} from 'kr/Redux';


import WrapComponent from '../WrapComponent';

export default class SearchCommunity extends React.Component {

	static defaultProps = {
		placeholder: '请输入...',
		inline: true
	}

	static PropTypes = {
		placeholder: React.PropTypes.string,
		inline: React.PropTypes.bool
	}

	constructor(props) {
		super(props)

		this.onChange = this.onChange.bind(this);
		this.getOptions = this.getOptions.bind(this);
		this.state={
			communityId : '',
			floor : '',
			spaceName :'',
			initialEdit : false
		}
	}

	componentWillReceiveProps(nextProsp){
		console.log("dslf;ld;lf;dl;fl;dlf;============")
		let _this =this;
		let {initialEdit} = this.state;
		let {communityId,floor,spaceName}= _this.props;
		this.setState({
			initialEdit : false
		},function(){
			if(!nextProsp.communityId || !nextProsp.floor ||!nextProsp.spaceName){
				console.log("dldfkldkdfld");
				if(!nextProsp.communityId || !nextProsp.floor){
					console.log("dfl;dlf;dl====>",_this.state.initialEdit,nextProsp)
					this.setState({
						initialEdit : true
					},function(){
						_this.getOptions(nextProsp.spaceName)
						return
					})
				}else{
					console.log("dfl;dlf;dl<<<<=>",_this.state.initialEdit,nextProsp)
					_this.setState({
						initialEdit : false
					},function(){
						_this.setState({
							initialEdit : true,
							communityId : nextProsp.communityId,
							floor : nextProsp.floor,
							spaceName :nextProsp.spaceName,
						},function(){
							_this.getOptions(nextProsp.spaceName)
							return;
						})
					})
					
				}
				
				
			}else{
				consol.log("dfl;dlf;dl")
				_this.setState({
					communityId : nextProsp.communityId,
					floor : nextProsp.floor,
					spaceName :nextProsp.spaceName,
					initialEdit : true
				},function(){
					_this.getOptions(nextProsp.spaceName)
				})
			}
		})
		
		

		
		
	}

	componentDidMount() {
		let {
			input
		} = this.props;
	}

	onInputChange = () => {
		// console.log("kdkffld")

	}

	onChange(item) {
		let {
			input,
			onChange
		} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
		onChange && onChange(item);
	}

	getOptions=(lastname)=> {
		let _this =this;
		let {communityId,floor} = this.state;
		let {input} = this.props;
		if(!communityId || !floor){
				return Promise.resolve({ options: [] });
		}
		return 	Http.request('getspacelistapi', {
					name: lastname,
					communityId : communityId,
					floor : floor
				}).then(function(response) {
					var obj = [].concat(response.items);
					obj.forEach(function(item, index) {
						item.value = item.id;
						item.label = item.name;
					});
					
					return {options: obj}
					
				})
	}

	render() {

		let {
			input,
			label,
			type,
			inline,
			meta: {
				touched,
				error
			},
			placeholder,
			children,
			disabled,
			style,
			requireLabel,
			...other
		} = this.props;
		let {initialEdit} = this.state;
		return (
			<WrapComponent label={label} wrapStyle={style} inline={inline} requireLabel={requireLabel}>
					{initialEdit &&<ReactSelectAsync
					name={input.name}
					value={input.value}
					loadOptions={this.getOptions}
					clearable={true}
					clearAllText="清除"
					onChange={this.onChange}
					onInputChange={this.onInputChange}
					noResultsText=""
					placeholder={placeholder}/>}
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div>}
		</WrapComponent>
		);
	}
}
