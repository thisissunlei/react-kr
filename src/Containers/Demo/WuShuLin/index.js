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
			open:true,
			checkedStations:[],
		}

	}

	close = ()=>{
		this.setState({
			open:!this.state.open
		})
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

	componentDidMount() {}

	render() {
       

        var skipMinut=10;
        var arrMinuts=[];
        var arrHour=[];
        var arrMinuts_new=[];
        var arrHour_new=[];
        var optionsTime=[];
        for(var i=0;i<25;i++){
          arrHour.push(i);	
        }

        for(var i=0;i<6;i++){
          arrMinuts.push(i*skipMinut);
        }
        arrHour.map(function(item,index){
           if(item<10){
           	 item='0'+item;
           }
         arrHour_new.push(item);
        })
        arrMinuts.map(function(item,index){
           if(item==0){
           	 item='0'+item;
           }
          arrMinuts_new.push(item); 
        })


        for(var i=0;i<arrMinuts_new.length;i++){
        	 for(var j=0;j<arrHour_new.length;j++){
        	 	console.log('lllll',arrHour_new[j]+':'+arrMinuts_new[i]);
        	 }
        }
        
         

		return (
			<div>
					{/*<Dialog
						title="平面图"
						contentStyle={{width:1000}}
						actions={<Button label="确定" onTouchTap={this.confirm}/>}
						onClose={this.close}
						bodyStyle={{paddingLeft:0,paddingRight:0}}
						open={this.state.open} >
								<PlanMap onCheckedStation={this.onCheckedStation} />
				</Dialog>*/}
              <form>
			       <KrField name="uploadImageList" 
								component="uploadImageList" 
								style={{marginTop:10}} 
								photoSize={'212*136'} 
								pictureFormat={'JPG'} 
								pictureMemory={'32K'}
								//requestURI = {this.state.requestURI}
					/>

			  </form>

             

			</div>

		);
	}
}

export default reduxForm({ form: 'ZhangQu'})(ZhangQu);
