import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import Section from 'kr-ui/Section';

import LocationMap from 'kr-ui/Global/LocationMap';




import {List, ListItem} from 'material-ui/List';

import './index.less';



import {Form,Field} from 'kr-ui/MyForm';


class Undefined extends Component{

	constructor(props,context){
		super(props, context);

		this.submit = this.submit.bind(this);
		this.setGet = this.setGet.bind(this);

		this.state={
			get:false
		}

	}

	componentDidMount() {

	}

	submit(values){
		console.log('---values',values);
	}

	setGet(){
		console.log('click setGet');
		this.setState({
			get:true
		})
	}

	render(){



		return(

			<div>
					<Section title="出错了" description="" >
						<LocationMap />
					</Section>
			</div>		

		);

	}

}




function mapStateToProps(state){


	return {
		items:state.notify.items,
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Undefined);


