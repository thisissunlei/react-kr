import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

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
        }

	}


	onInitSearchDialog(onSuccess){

		console.log("aaaa");
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
		
		//console.log("fgfg",this.props.detailResult);




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
						<SearchForm onSubmit={this.onSearch} onCancel={this.onCancel}/>
		  	       </Dialog>


                   
			</div>		

		);

	}

}







