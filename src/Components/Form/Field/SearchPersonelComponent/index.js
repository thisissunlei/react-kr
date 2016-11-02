import React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import {Actions,Store} from 'kr/Redux';


import WrapComponent from '../WrapComponent';

export default class  SearchPersonelComponent extends React.Component {


	static defaultProps = {
		placeholder:'请选择...'
	}

	static PropTypes = {
		placeholder:React.PropTypes.string
	}

	constructor(props){
		super(props)

		this.onChange = this.onChange.bind(this);
		this.getOptions = this.getOptions.bind(this);
	}

	componentDidMount(){
		let {input} = this.props;
	}

	onChange(item){
		let {input,onChange} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
		onChange && onChange(item);
	}

	getOptions(lastname){
		return new Promise((resolve, reject) => {
			Store.dispatch(Actions.callAPI('getHrmResourceExtListByLastname',{ lastname:lastname })).then(function(response){
				response.forEach(function(item,index){
					item.value = item.id;
					item.label = item.lastname;
				});
				resolve({options:response});
			}).catch(function(err){
				reject(err);
			});
		});
	}

	render(){

		let { input, label, type, meta: { touched, error },placeholder,children,disabled,style,requireLabel,...other} = this.props;

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel}>
					<ReactSelect.Async
					name={input.name}
					value={input.value}
					loadOptions={this.getOptions}
					clearable={true}
					clearAllText="清除"
					onChange={this.onChange}
					placeholder={placeholder}/>
			<p>	{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }</p>
		</WrapComponent>
		);
	}
}
