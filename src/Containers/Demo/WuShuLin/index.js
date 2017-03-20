import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {reduxForm,formValueSelector,initialize,change,FieldArray} from 'redux-form';
import {
	bindActionCreators
} from 'redux';

import {
	Section,
	PlanMap,
	Dialog,
	Button,
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,

} from 'kr-ui';

class ZhangQu extends Component {

	constructor(props, context) {
		super(props, context);
		this.state={
			open:false,
	    }

	
    }

	

	componentDidMount() {
		
	}

	liOver=()=>{
      this.setState({
      	 open:true,
      })
	}
	liOut=()=>{
	  this.setState({
      	 open:false
      })	
	}
    



	render() {

		let {open,widthState}=this.state;
        
        var hour=[];
        var minute=['00','10','20','30','40','50'];
        for(var i=0;i<25;i++){
           if(i<10){
             i='0'+i;
           }
          hour.push(i); 
        }
        
       
       
        
		return (
			<div>
               <form>
			       <KrField component="selectTime" />
			       	<h1>sdfsdf</h1>

			       <KrField component="file" />	
			   </form>

               
		</div>


		);
	}
}

export default reduxForm({ form: 'ZhangQu'})(ZhangQu);
