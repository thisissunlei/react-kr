import React from 'react';

export default class Field extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		name: React.PropTypes.string,
		onChange:React.PropTypes.func
	}

	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);
		this.initData = this.initData.bind(this);

		this.state = this.initData();

	}

	componentDidMount(){

	}

    initData(){

        const {name} = this.props;
		let obj = {

		}

		obj[name] = '';

        return  obj;
    }


	onChange(event){
		event && event.preventDefault();

		const {type,name} = this.props;


		if(type == 'text'){
			this.state[name] = event.target.value;
		}

		if(type == 'file'){
			this.state[name] = event.target.files[0];
		}

		if(this.props.onChange){
			this.props.onChange(event,this.props.name,event.target.value);
		}

	}

	render() {

		const {name,type} = this.props;

		if(type == 'text'){
			return (
				<div className="input" >
						<input type="text" name={name}  onChange={this.onChange} />
				</div>
			);
		}

		if(type == 'file'){
			return (
				<div className="input" >
						<input type="file" name={name}  onChange={this.onChange} />
				</div>
			);
		}

	}


}


