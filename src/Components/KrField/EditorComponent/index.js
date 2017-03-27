import React from 'react';

import WrapComponent from '../WrapComponent';
import Editor from '../../Editor';
import './index.less';

export default class EditorComponent extends React.Component {

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

		}
	}

	onChange(value){
		const {onChange,input} = this.props;
		input.onChange(value);
		onChange && onChange(value);
	}

	render() {

		let {
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

		let {
			inputSize
		} = this.state;
		inputSize=this.props.input.value.length||0;

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
        <Editor onChange={this.onChange} />
				{touched && error && <div className="error-wrap"> <span>{error}</span></div> }
			</WrapComponent>
		);

	}

}
