import React from 'react';

export default class TableRow extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
	}

	 static contextTypes = {
         displayCheckbox: React.PropTypes.bool,
         selectAllSelected:React.PropTypes.bool
     }

	
	constructor(props){
		super(props);

		this.renderCheckbox = this.renderCheckbox.bind(this);
		this.checkboxChange = this.checkboxChange.bind(this);


		this.checked = false;
		this.state = {
			checked:false,
		}

	}

	componentWillReceiveProps(nextProps,nextContext){
		console.log('----->>>',nextContext);
	}

	componentWillUpdate(nextProps,nextState,nextContext){
	      console.log('-----',nextContext);
		
	}

	checkboxChange(){

		this.setState({
			checked:!this.state.checked
		})

	}

	renderCheckbox(){

        let {checked} = this.state;
		let {displayCheckbox,selectAllSelected} = this.context;

	

		if(!displayCheckbox){
			return null;
		}

		return (
				<td><input type="checkbox" checked={checked}  onChange={this.checkboxChange}/></td>
			);

	}

	render() {

		let {className,children} = this.props;


		return (
			<tr className={className}>

			    {this.renderCheckbox()}

				{children}	
			</tr>

		);

	}
}







