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
var arr1=[];
export default class SearchResult extends Component{

	static PropTypes = {
		detailResult:React.PropTypes.object,
		params:React.PropTypes.object,
		
	}

	static childContextTypes =  {
        onInitSearchDialog: React.PropTypes.func,
    }

	getChildContext() {
    	return {onInitSearchDialog: this.onInitSearchDialog};
 	}

	constructor(props,context){
		super(props, context);
		this.urlFunctionAccount=this.urlFunctionAccount.bind(this);
		this.urlFunctionProp=this.urlFunctionProp.bind(this);
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

	}

    urlFunctionAccount(){
         var _this = this;
	      Store.dispatch(Actions.callAPI('findAccountList',{
	      	accountType:'PAYMENT'
	      })).then(function(response){

            response.map(function(item,index){ 
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
 		        _this.setState({
			      arr:arr
		       });             		 
		    
 		    
 		}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		 });
    }
    urlFunctionProp(){
         var _this = this;
	      Store.dispatch(Actions.callAPI('getPropList',{
	      	accountType:'PAYMENT'
	      })).then(function(response){

            response.map(function(item,index){ 
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
			      arr1:arr1
		       });             		 
		    
 		    
 		}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		 });
    }
	onInitSearchDialog(onSuccess){

		console.log("aaaa");
		this.urlFunctionAccount();
	    this.urlFunctionProp()
		this.onSearchSuccess = onSuccess;
		this.openSearchDialog();
	}

	openSearchDialog(){
        
		this.setState({
			openSearch:!this.state.openSearch
		});
	}
	onSearch(forms){

		this.onSearchSuccess(forms);
	    this.openSearchDialog();

	}


	onCancel(){	
       this.openSearchDialog();
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
		
		console.log("fgfg",this.state.arr);

       


		return(

			 <div>
			      
                  <Row>
			        <Received params={this.props.params} type="RECEIVED" detailResult={this.props.detailResult} />
                    <Income params={this.props.params} type="INCOME" />
                  </Row>


                  	<Dialog
					title="高级查询"
					open={this.state.openSearch}
					>
						<SearchForm onSubmit={this.onSearch} onCancel={this.onCancel} optionList={this.state.arr} propList={this.state.arr1}/>
		  	       </Dialog>


                   
			</div>		

		);

	}

}







