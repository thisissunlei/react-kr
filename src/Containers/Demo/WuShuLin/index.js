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
	KrField
} from 'kr-ui';

class ZhangQu extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			open:false,
			checkedStations:[],
			openUl:false,
		}

	}

	

	confirm = ()=>{
		this.close();
		console.log('resule:',this.state.checkedStations);
	}

	onCheckedStation =(clickStation,checkedStations)=>{
		this.setState({
			checkedStations
		});
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
        
        let styleLI={};
        if(open){
         styleLI={
         	background:'red',
        	height:'40px',
        	width:'220px',
        	lineHeight:'40px'
         }	
        }else{
          styleLI={
         	background:'red',
        	height:'40px',
        	width:'100px',
        	lineHeight:'40px'
          }		
        }
         
       
        
		return (
			<div>
               <form>
			       <KrField name="uploadImage" 
								component="uploadImage" 
								style={{marginTop:10}} 
								photoSize={'212*136'} 
								pictureFormat={'JPG'} 
								pictureMemory={'32K'}
								//requestURI = {this.state.requestURI}
					/>

			   </form>


             <ul style={{position:'relative',padding:'0px'}} className='first-ul'>  
             {
             	hour.map((item,index)=>{
                  return <li 
                   style={styleLI}
                   className='first-li'
                  
                   >
                     <span style={{display:'inline-block',width:'100px'}}>{item}</span>
                     <ul 
                      style={{
                      	display:'inline-block',
                      	width:'100px',
                      	background:'blue',
                      	padding:0
                      }}
                      >  
			             {
			             	minute.map((item,index)=>{
			                  return <li 
			                  style={{width:'100%',height:'40px',lineHeight:'40px',marginBottom:'5px'}}
                               
			                   >
			                    {item}
			                  </li>
			             	})
			             }

                     </ul>
                  </li>
             	})
              }
           </ul>
		</div>

		);
	}
}

export default reduxForm({ form: 'ZhangQu'})(ZhangQu);
