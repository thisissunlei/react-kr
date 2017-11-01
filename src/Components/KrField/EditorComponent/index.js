import React from 'react';

import WrapComponent from '../WrapComponent';
import Editor from '../../Editor';
import './index.less';

export default class EditorComponent extends React.Component {

	static defaultProps = {
		defaultValue: 'ddd',
	}
	static propTypes = {
		onChange: React.PropTypes.func,
		defaultValue: React.PropTypes.string,
	}

	constructor(props) {
		super(props)
		this.state={
			changeValue:''
		}

	}
	

	onChange = (value) =>{
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
			style,
			inline,
			resizeChange,
			isReduxForm,
		} = this.props;


		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
        <Editor onChange={this.onChange} resizeChange = {resizeChange} defaultValue={isReduxForm?input.value:this.props.defaultValue} />
				{touched && error && <div className="error-wrap"> <span>{error}</span></div> }
			</WrapComponent>
		);

	}

}
