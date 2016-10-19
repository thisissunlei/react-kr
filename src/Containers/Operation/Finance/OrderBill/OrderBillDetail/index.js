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
		

		this.state = {			
			item:{},
			detailT:{},
			detailPayment:[],
			detailIncome:[],
			detailBalance:'',			
		}
	}

	componentDidMount() {
       var _this = this;
		Store.dispatch(Actions.callAPI('getAccountFlow',{
			accountType:'PAYMENT',
			mainbillid:'3'
		})).then(function(response){
                
			_this.setState({
				item:response,
				detailT:response.topdata,
				detailPayment:response.paymentdata,
				detailIncome:response.incomedata,
				detailBalance:response.balance,
				loading:false

			});
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});
	}
    
	render(){
        
        console.log("vvv",this.state.item);
		return(

			<div>
					<Section title="订单明细账" description="" > 

						   <BasicInfo detail={this.state.detailT}/>

							<Row>
							<Col md={5} >
								<SearchParam detailPayment={this.state.detailPayment} detailIncome={this.state.detailIncome} detailBalance={this.state.detailBalance}/>
							</Col>
							<Col md={5} >
								<SearchResult />
							</Col>
						</Row>

				</Section>
			</div>		

		);

	}

}



