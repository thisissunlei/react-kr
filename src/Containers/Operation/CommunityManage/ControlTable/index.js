import React from 'react';
import {DateFormat,Http} from 'kr/Utils';
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
import SearchFormControlTable from './SearchForm';
class ControlTable  extends React.Component{

	constructor(props){
		super(props);
		
		this.state={
		
			communityIdList:[]
		}
		this.getcommunity();
   
	}

	componentDidMount(){

	}
	getcommunity = () => {
		let _this = this;
		let {communityIdList} = this.state;
		Http.request('getCommunity').then(function(response) {

			communityIdList = response.communityInfoList.map(function(item, index) {

				item.value = item.id;
				item.label = item.name;
				return item;
			});
			_this.setState({
				communityIdList,
			});


		}).catch(function(err) {



		});
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
		const {communityIdList} = this.state;

		return(
			<div className="m-control-table" style={{minHeight:'910'}}>
				<Title value="访客记录"/>
      		<Section title="访客记录"  style={{marginBottom:-5,minHeight:910}}>
           <SearchFormControlTable />
          </Section>
          
	     </div>

		);
	}
}

export default ControlTable;
