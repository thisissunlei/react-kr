import React from 'react';

import './index.less';

export default  class Input extends React.Component {

	static displayName = 'Input';

	static defaultPorps = {
		value:'',
		type:'text'
	}

	static propTypes = {
				style: React.PropTypes.object,
				className: React.PropTypes.string,
				type: React.PropTypes.string,
				children:React.PropTypes.node,
	}

	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);

		this.state = {
			value:this.props.value
		}

	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.props.value){
			 this.setState({
				 value:nextProps.value
			 });
		}
	}

	onChange(event){

			var value = event.target.value;
			const {onChange} = this.props;

			this.setState({
				value
			});

			onChange && onChange(value);
	}
	render() {

		let {children,className,style,type} = this.props;

		let {value} = this.state;

		let classNames = 'ui-input';
		classNames+=' '+className;

		return (
			 <input type={type} style={style} className={classNames} value={value} onChange={this.onChange} />
		);
	}
}
