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

export default class SearchCityCommunity extends React.Component {

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
		this.state={
			id:''
		}
		this.onChange = this.onChange.bind(this);
		this.getOptions = this.getOptions.bind(this);
	}

	componentDidMount() {
		let {
			input
		} = this.props;
		
		
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			id:nextProps.cityId
		},function(){
			this.select.loadOptions()
		})
		
	}
	onInputChange = () => {


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

	getOptions(lastname) {
		let {id}=this.state;
		return new Promise((resolve, reject) => {
			Http.request('getcommunity-list').then(function(response){
				let options=[];
				response.items.map(function(item, index) {
					if(item.id==id){
						item.communitys.map((items)=>{
							items.value = items.id;
							items.label = items.name;
							return items;
						})
						options=item.communitys;
					}
				});
				resolve({
					options: options
				});
					
				
			}).catch(function(err){
				reject(err);
			});
		});
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
		return (
			<WrapComponent label={label} wrapStyle={style} inline={inline} requireLabel={requireLabel}>
					<ReactSelectAsync
					name={input.name}
					value={input.value}
					ref={(select)=>this.select=select}
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
