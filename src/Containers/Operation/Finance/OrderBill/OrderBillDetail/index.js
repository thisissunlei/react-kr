import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {LabelText} from 'kr-ui/Form';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
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
	Dialog,
} from 'kr-ui';


import BasicInfo from './BasicInfo';
import SearchParam from './SearchParam';
import SearchResult from './SearchResult';


export default class AttributeSetting  extends Component{ 

	constructor(props,context){
		super(props, context);


		this.onSearch = this.onSearch.bind(this);

		this.initBasicInfo = this.initBasicInfo.bind(this);
		
		this.state = {			
			item:{},
			params:{
				type:'RECEIVED',
				childType:'basic',
				id:'',
				orderId:this.props.params.orderId
			},
			basicInfo:{},
			detailPayment:[],
			detailIncome:[],
			detailBalance:'',	
		}
	}

	onSearch(params){
	  this.setState({params});
	}


	initBasicInfo(){

		 var _this = this;
		let {params} = this.props;

		Store.dispatch(Actions.callAPI('getAccountFlow',{
			mainbillid:params.orderId,
			accountType:'INCOME'
		})).then(function(response){
			_this.setState({
				item:response,
				basicInfo:response.topdata,
				detailPayment:response.paymentdata,
				detailIncome:response.incomedata,
				detailBalance:response.balance,
			});
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});
	}

	componentDidMount() {
     	this.initBasicInfo();
	}
    
	render(){
		return(
			<div>
					<Section title="订单明细账" description="" > 
						   <BasicInfo detail={this.state.basicInfo} detailPayment={this.state.detailPayment} detailIncome={this.state.detailIncome}/>
							<Row>
							<Col md={2} >
								<SearchParam onSearch={this.onSearch} params={this.state.params} detailPayment={this.state.detailPayment} detailIncome={this.state.detailIncome} detailBalance={this.state.detailBalance} />
							</Col>
							<Col md={10}>
								<SearchResult  params={this.state.params}/>
							</Col>
						</Row>

				</Section>
			</div>		
	);

	}
}



