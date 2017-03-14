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
			       <KrField name="uploadImage" 
								component="uploadImageList" 
								style={{marginTop:10}} 
								photoSize={'212*136'} 
								pictureFormat={'JPG'} 
								pictureMemory={'32K'}
								//requestURI = {this.state.requestURI}
					/>

			   </form>

               <div 
                style={{width:200,height:'auto'}}
                 onMouseOver={this.liOver}
               >
                <div 
                 style={{display:'inline-block',width:100,background:'red'}}            
                 >
                 {
                  hour.map((item,index)=>{
                     return <p>{item}</p>
                  })	
                 }
                 </div>
                 <div 
                 	style={{display:'inline-block',width:100,background:'blue',verticalAlign: 'top'}}
                    onMouseOut={this.liOut}
                 	>
                 {
                  minute.map((item,index)=>{
                     return <p>{item}</p>
                  })	
                 }
                 </div>
                             
               </div>
              
		</div>


		);
	}
}

export default reduxForm({ form: 'ZhangQu'})(ZhangQu);
