import React from 'react';
import {DateFormat} from 'kr/Utils';
import {
  reduxForm,
  change,
  arrayPush,
  initialize
} from 'redux-form';

import {
  Actions,
  Store
} from 'kr/Redux';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Dialog,
	Section,
	Grid,
	Row,
	Col,
	Drawer,
	SearchForms,
	Button,
	KrField,
	KrDate,
	Title,
	ListGroup,
	ListGroupItem,
	Message
} from 'kr-ui';
import {Http} from "kr/Utils";

class ControlTable  extends React.Component{

	constructor(props){
		super(props);
		
		this.state={
		

		}
   
	}

	componentDidMount(){

	}

 
  getEidtData = (id,itemDetail) =>{
    let _this= this;
    const {FormModel} = this.props;


    Http.request("visit-record-edit-deatil",{id:id}).then(function(editData){
     
    }).catch(function(err) {
      Message.error(err.message);
    });
  }
   //搜索列表
   onSearchSubmit = (value) =>{
   	
   }

   //打开新增访客
   openNewVisitors = () =>{
      const {FormModel} = this.props;
   		this.setState({
   			openNewVisitors:true,
   		});
      FormModel.getForm("NewVisitorsToRecord")
  		.changeValues({
        communityId:"",
        typeId:"",
        interviewTypeId:"",
        activityTypeId:"",
        name:"",
        tel:"",
        wechat:"",
        num:'',
        email:"",
        purposeId:'',
        interviewRoundId:'',
        vtime:'',
      })

   }
	render(){
		

		return(
			<div className="m-control-table" style={{minHeight:'910'}}>
				<Title value="访客记录"/>
      		<Section title="访客记录"  style={{marginBottom:-5,minHeight:910}}>
            <h1>销控表</h1>
          </Section>
          
	     </div>

		);
	}
}

export default ControlTable;
