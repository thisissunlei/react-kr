import React from 'react';

import WrapComponent from '../WrapComponent';

export default class TextareaComponent extends React.Component {
	static PropTypes = {
		onChange: React.PropTypes.func,
		maxSize: React.PropTypes.num
	}

	constructor(props) {
		super(props)


		this.state = {
			len: 0,
		}
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
			maxSize,
		} = this.props;

		let {
			len
		} = this.state
		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
				<textarea {...input} placeholder={placeholder|| label} disabled={disabled} col={col} row={row}  ></textarea>
				<div style={{width:36,height:30,lineHeight:"30px",color:'#cccccc',float:'right'}}><span className="len">{len}</span>/<span className="size">{maxSize}</span></div>
				{touched && error && <div className="error-wrap"> <span>{error}</span></div> }
			</WrapComponent>
		);

	}

}