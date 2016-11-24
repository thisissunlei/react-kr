import React,{Component} from 'react';


class KrCheckbox extends Component{

	static displayName = 'KrCheckbox';

	static defaultProps = {
		checked:false
	}

	static propTypes = {
		/**
		 * Checkbox 选中时值为true
		 */
		checked:React.PropTypes.bool,
		/**
		 * 点选时回调该方法
		 */
		onCheck:React.PropTypes.func
	};

	constructor(props){
		super(props);

		this.onCheck = this.onCheck.bind(this);

		this.state = {
			checked:this.props.checked
		}

	}

  componentWillReceiveProps(nextProps) {
		if(nextProps.checked !== this.props.checked){
			  this.setState({
					checked:nextProps.checked
				});
		}
	}

	onCheck(){

		this.setState({
			checked:!this.state.checked
		});

		const {onCheck} = this.props;
		onCheck && onCheck();

	}


	render(){

		let {checked} = this.state;

		return (
			<input type="checkbox" onClick={this.onCheck} checked={checked}/>
		);

	}
}

export default KrCheckbox;
