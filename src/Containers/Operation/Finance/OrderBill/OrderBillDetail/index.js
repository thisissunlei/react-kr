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
	Dialog,
} from 'kr-ui';
import ReceivedPayment from './ReceivedPayment';
import IncomePayment from './IncomePayment';
import CatchPayment from './CatchPayment';

export default class AttributeSetting  extends Component{

	constructor(props,context){
		super(props, context);
		

		this.state = {			
			item:{}			
		}
	}

	componentDidMount() {
       var _this = this;
		Store.dispatch(Actions.callAPI('getAccountFlow')).then(function(response){
         
			_this.setState({
				item:response,
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
        
        console.log("vvv",this.state.item)
		return(

			<div>
					<Section title="订单明细账" description="" > 


                   

				
					<Row>
						<Col md={4} ><LabelText label="社区名称" /></Col>
						<Col md={4} ><LabelText label="客户名称" /></Col>
						<Col md={4} ><LabelText label="订单名称"/></Col>
					</Row>

					<Row>
						<Col md={4} ><LabelText label="当前工位数" /></Col>
						<Col md={4} ><LabelText label="起始日期" /></Col>
						<Col md={4} ><LabelText label="结束日期"  type="date"/></Col>
					</Row>
					<Row>
						<Col md={4} ><LabelText label="撤场日期" type="date"/></Col>
						<Col md={4} ><LabelText label="订单总额" type="date"/></Col>
						<Col md={4} ><LabelText label="回款总额"  /></Col>
					</Row>

					<Row>
						<Col md={4} ><LabelText label="未回款额" /></Col>
						<Col md={4} ><LabelText label="工位回款" /></Col>
						<Col md={4} ><LabelText label="实收押金" /></Col>
					</Row>

					<Row>
						<Col md={4} ><LabelText label="实收定金" /></Col>
						<Col md={4} ><LabelText label="其他回款" /></Col>
						<Col md={4} ><LabelText label="营业外收入汇款" /></Col>		
					</Row>

					<Row>
						<Col md={4} ><LabelText label="生活消费收入回款"  width={150}/></Col>
						<Col md={4} ><LabelText label="工位收入"  width={160}/></Col>
						<Col md={4} ><LabelText label="其他收入" /></Col>
					</Row>

					<Row>

						<Col md={4} ><LabelText label="营业外收入" /></Col>
						<Col md={4} ><LabelText label="生活消费收入" /></Col>
						<Col md={4} ></Col>
					</Row>
					<Row>						
						<Col md={4} ><LabelText label="订单描述" /></Col>
					</Row>


              <Row>                  
                <Col md={4} >
                        
                       
						<Table  style={{marginTop:10}} displayCheckbox={false}>
						  <TableHeader>
							<TableHeaderColumn></TableHeaderColumn>
							<TableHeaderColumn>回款</TableHeaderColumn>
						   </TableHeader>

						 <TableBody>
						      <TableRow displayCheckbox={false}>						
								<TableRowColumn>押金</TableRowColumn>
								<TableRowColumn>123</TableRowColumn>					
							 </TableRow>
						</TableBody>
						</Table>

						<Table  style={{marginTop:10}} displayCheckbox={false}>
						  <TableHeader>
							<TableHeaderColumn></TableHeaderColumn>
							<TableHeaderColumn>收入</TableHeaderColumn>
						   </TableHeader>

						 <TableBody>
						      <TableRow displayCheckbox={false}>						
								<TableRowColumn>押金</TableRowColumn>
								<TableRowColumn>123</TableRowColumn>					
							 </TableRow>
						</TableBody>
						</Table>

						<Table  style={{marginTop:10}} displayCheckbox={false}>
						  <TableHeader>
							<TableHeaderColumn></TableHeaderColumn>
							<TableHeaderColumn>余额</TableHeaderColumn>
						   </TableHeader>

						 <TableBody>
						      <TableRow displayCheckbox={false}>						
								<TableRowColumn>押金</TableRowColumn>
								<TableRowColumn>123</TableRowColumn>					
							 </TableRow>
						</TableBody>
						</Table>
                     </Col> 

                   

                      <Col md={8}>


							

                         
                      </Col> 	 
                  
                    </Row>

				
				

                    

                   
              

				</Section>
			</div>		

		);

	}

}



