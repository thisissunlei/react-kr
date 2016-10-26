import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions,Store} from 'kr/Redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';

import {
	Table,
 	TableBody,
	TableHeader,
	TableHeaderColumn, 
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Notify,
	List,
 	ListItem,
	LabelText,
	Dialog
} from 'kr-ui';

import Received from './Received';
import Income from './Income';

import SearchForm from './SearchForm';



var arr=[];
var selectType='';
var arr1=[];
export default class SearchResult extends Component{

	static PropTypes = {
		
		params:React.PropTypes.object,
		
	}

	static childContextTypes =  {
        onInitSearchDialog: React.PropTypes.func,
        accountType:React.PropTypes.string,
    }

	getChildContext() {
    	return {onInitSearchDialog: this.onInitSearchDialog};
 	}

	constructor(props,context){
		super(props, context);
		this.urlFunctionAccount=this.urlFunctionAccount.bind(this);
		
		this.openSearchDialog=this.openSearchDialog.bind(this);
		this.closeSearchDialog=this.closeSearchDialog.bind(this);


		this.onInitSearchDialog = this.onInitSearchDialog.bind(this);
		this.openSearchDialog = this.openSearchDialog.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.onSearchSuccess = '';

        this.state={
        	searchParams:{},
        	openSearch:false,     	
        	arr:[],
        	arr1:[]
        }



        console.log('---->>>',this.props.params);

	}
    

    urlFunctionAccount(){
         var _this = this;      
	      Store.dispatch(Actions.callAPI('findAccountAndPropList',{
	      	accountType:selectType
	      })).then(function(response){
             
             //console.log("dddd",response)

             response.account.map(function(item,index){ 
 		      	 var list ={}
 		      	 list.id=item.id;
 		      	 list.accountname=item.accountname;
 		      	 arr.push(list);		      	 	      	                                            
              })
              arr.map(function(item,index){
				 item.label=item.accountname;
                 item.value=item.id;
				 return item;
			    });
		      response.property.map(function(item,index){ 
 		      	 var list ={}
 		      	 list.id=item.id;
 		      	 list.propname=item.propname;
 		      	 arr1.push(list);		      	 	      	                                            
              })
              arr1.map(function(item,index){
				 item.label=item.propname;
                 item.value=item.id;
				 return item;
			    });
 		        _this.setState({
			      arr1:arr1,
			      arr:arr
		       });             	           		   
 		}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		 });
    }
    
	onInitSearchDialog(onSuccess,type){
		selectType=type;
		this.urlFunctionAccount();
		this.onSearchSuccess = onSuccess;
		this.openSearchDialog();
	}

	openSearchDialog(){
        
		this.setState({
			openSearch:!this.state.openSearch
		});
	}
	onSearch(forms){
		var _this = this;
		this.onSearchSuccess(forms);
	    this.openSearchDialog();

		 arr=[];
	     arr1=[];

	}


	onCancel(){	
       this.openSearchDialog();
       arr=[];
       arr1=[];
	}

	closeSearchDialog(){
		this.setState({
			openSearch:!this.state.openSearch
		}) 
	}

	componentDidMount() {
	   const {params,detailResult} = this.props;
	}


	render(){

		return(

			 <div style={{paddingLeft:15,paddingTop:10}}>

				<Received params={this.props.params} type="RECEIVED" />
				<Income params={this.props.params} type="INCOME" />

				<Dialog
				title="高级查询"
				open={this.state.openSearch}
				>
					<SearchForm onSubmit={this.onSearch} onCancel={this.onCancel} optionList={this.state.arr} propList={this.state.arr1} select={selectType}/>
			   </Dialog>
			</div>		
		);
	}
}



