import React from 'react';



export default class Form extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		submit:React.PropTypes.func,
		get:React.PropTypes.bool
	}


	constructor(props){
		super(props);

		this.createField = this.createField.bind(this);
		this.onChange = this.onChange.bind(this);

		this.fields = [];
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.get){
			this.props.submit(this.fields);
		}

	}

	onChange(event,name,value){
		//console.log('name:',name,'value:',value);
		this.fields[name] = value;
		console.log('fields',this.fields);
	}

	createField(base){

		return React.cloneElement( base, {
				onChange:this.onChange
			});

	}

	render() {

		const {children} = this.props;

		let Fields = [];
		let Buttons = [];

		React.Children.forEach(children, (child) => {

			if (!React.isValidElement(child)) return;

			const {muiName,name} = child.type;

			if (name === 'Field') {
				Fields.push(this.createField(child));
			}

			if (name === 'Button') {
				Buttons.push(this.createButton(child));
			}

		});

		return (
			<form>
				{Fields}
				{Buttons}
			</form>
		);

	}


}


