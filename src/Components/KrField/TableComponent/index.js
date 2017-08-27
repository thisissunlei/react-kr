import React from 'react';

import WrapComponent from '../WrapComponent';
import './index.less';
import {
	FTabel
} from '../../FieldTabel';

export default class TableComponent extends React.Component {

	static defaultProps = {
		maxSize:200
	}
	static PropTypes = {
		onChange: React.PropTypes.func,
		maxSize: React.PropTypes.number
	}

	constructor(props) {
		super(props)
		this.onChange = this.onChange.bind(this);
		this.state = {
			inputSize: this.props.input.value.length||1,
			tableData:[],

		}
	}

	onChange(event){
		var value = event.target.value;

		const {onChange,input,maxSize} = this.props;

		let inputSize = (value.length>maxSize)?maxSize:value.length;
		this.setState({
			inputSize
		});

		value = value.slice(0,maxSize);
		input.onChange(value);
		onChange && onChange(value);


	}
	componentDidMount() {
		
	}
	componentDidUpdate (prevProps, prevState) {
		console.log(this.props,"?????");
	}
	
	componentWillReceiveProps(nextProps) {
		console.log(nextProps,"-----");
	}
	
	
	

	render() {

		let {
			children,
			input,
			label,
			type,
			meta: {
				touched,
				error
			},
			requireLabel,
			disabled,
			placeholder,
			col,
			row,
			style,
			inline,
			heightStyle,
			maxSize,
			lengthClass
		} = this.props;

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
				<FTabel>
					{children}
				</FTabel>
			</WrapComponent>
		);

	}

}
