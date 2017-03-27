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
	}

	constructor(props) {
		super(props)

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
		} = this.props;


		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
        <Editor onChange={this.onChange} />
				{touched && error && <div className="error-wrap"> <span>{error}</span></div> }
			</WrapComponent>
		);

	}

}
