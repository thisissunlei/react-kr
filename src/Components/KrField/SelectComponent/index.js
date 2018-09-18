import React from 'react';

import ReactSelect from '../../Select/Select';

import WrapComponent from '../WrapComponent';
import './index.less';

//import 'react-select/dist/react-select.css';

export default class SelectComponent extends React.Component {


	static defaultProps = {
		inline: false
	}

	static PropTypes = {
		onChange: React.PropTypes.func,
		inline: React.PropTypes.bool,
		search: React.PropTypes.bool,
	}

	constructor(props) {
		super(props)

		this.onChange = this.onChange.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.setInitValue = this.setInitValue.bind(this);

		this.isInit = false;

		this.state = {
			value: []
		}
	}

	componentDidMount() {

		this.setInitValue(this.props.input.value);
	}


	componentWillReceiveProps(nextProps) {
		if (!this.isInit && nextProps.input.value) {
			this.setInitValue(nextProps.input.value);
		}
	}

	setInitValue(value) {

		if (!value) {
			return;
		}

		this.setState({
			value
		});
		this.isInit = true;
	}

	handleChange(value) {

		let {
			input
		} = this.props;
		this.setState({
			value
		});

		input.onChange(value);
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

	onChangeOne=(value)=>{
		let {onChangeOne}= this.props;
		onChangeOne && onChangeOne(value);
	}

render() {
		let {
			input,
			label,
			inline,
			search,
			type,
			meta: {
				touched,
				error
			},
			children,
			disabled,
			style,
			requireLabel,
			options,
			multi,
			isPlace,
			onChangeOneOperation,
			...other
		} = this.props;
		var onChangeOneOperationT = onChangeOneOperation?true:false;
		var placeholder='';
		if(isPlace){
		 	placeholder=this.props.placeholder
		}else{
		    placeholder='请选择'	
		}

		if (multi) {
			return (
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
					<div className="ui-select">
						<ReactSelect
									multi
									onChangeOneOperation={onChangeOneOperationT}
									simpleValue
									name={input.name}
									value={this.state.value}
									clearable={true}
									options={options}
									onChange={this.handleChange}
									placeholder="请选择..."
									noResultsText=""
									onChangeOne={this.onChangeOne}
								/>
					</div>

						{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				</WrapComponent>
			);

		}
		if (options) {

        
			return (

				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
						<ReactSelect
									name={input.name}
									searchable={false}
									value={input.value}
									clearable={true}
									options={options}
									onChange={this.onChange}
									placeholder={placeholder}
									// onValueClick={()=>{this.onChange()}}
								/>

					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
		</WrapComponent>

			);

		}

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
					<select {...input}  disabled={disabled}>
									{children}
					</select>
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
			</WrapComponent>

		);
	}
}
