import React from 'react';
import { observer } from 'mobx-react';


@observer
export default class Form extends React.Component {

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		style:React.PropTypes.object,
	}


	constructor(props){
		super(props);

		this.createFormElement = this.createFormElement.bind(this);
		this.createOtherElement = this.createOtherElement.bind(this);

		this.onChange = this.onChange.bind(this);

		this.index = 0;
	}


	componentDidMount(){
	}

	componentWillReceiveProps(){
	}


	onChange(event){
		const {store} = this.props;
		store.set(event.target.name,event.target.value);
	}


	createFormElement(base){

		const {store} = this.props;

		const index = this.index++;
		let children = [];

		const props = {
			key:index,
			value:store[base.props.name]
		}

		const handlers = {
			onChange:this.onChange
		}

		if (React.isValidElement(base)) {
			React.Children.forEach(base.props.children, (child) => {
				children.push(child);
			});
			return React.cloneElement(base, {...props,...handlers}, children);
		}

		return null;

	}

	createOtherElement(base){

		const index = this.index++;

		let children = [];
		const props = {
			key:index
		}

		if (React.isValidElement(base)) {
			React.Children.forEach(base.props.children, (child) => {
				children.push(child);
			});
			return React.cloneElement(base, {...props}, children);
		}

		return null;
	}


	render() {


		this.index = 0;

		let {className,children,style} = this.props;


		let formElement = [];

		React.Children.map(children, (child) => {
			if (!React.isValidElement(child)) return;
			const {muiName,name} = child.type;
			if (name === 'FormControl') {
				formElement.push(this.createFormElement(child));
			} else {
				formElement.push(this.createOtherElement(child));
			} 
		});

		return (
			<div>
				{formElement}
			</div>
		);

	}


}







