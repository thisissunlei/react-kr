import React from 'react';

import WrapComponent from '../WrapComponent';
import './index.less';

export default class TextareaComponent extends React.Component {

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

	render() {

		var styleHeight={};

		let {
			input,
			label,
			type,
			meta: {
				touched,
				error
			},
			onlyRead,
			requireLabel,
			disabled,
			placeholder,
			col,
			row,
			style,
			inline,
			heightStyle,
			maxSize,
			lengthClass,
			item
		} = this.props;

	
		 if(item&&item.setting){
			var seeting=JSON.parse(item.setting);
			seeting.height=seeting.wsheight;
			delete seeting.wsheight;
			styleHeight=seeting;
		}else{
			styleHeight=heightStyle;
		}
        
		let {
			inputSize
		} = this.state;
		inputSize=this.props.input.value.length||0;

		if (onlyRead) {
			return (
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
					<span style={{ display: "inline-block", padding: "10px 10px 10px 0px" }}>{input.value}</span>
				</WrapComponent>
			)
		}
		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
				<textarea {...input} placeholder={placeholder|| label} disabled={disabled} col={col} row={row} onChange={this.onChange} style={styleHeight}></textarea>
				<div style={{width:40,height:30,lineHeight:"30px",color:'#cccccc',float:'right',fontSize:'14px'}} className={lengthClass}><span className="len">{inputSize}</span>/<span className="size">{maxSize?maxSize:200}</span></div>
				{touched && error && <div className="error-wrap"> <span>{error}</span></div> }
			</WrapComponent>
		);

	}

}
