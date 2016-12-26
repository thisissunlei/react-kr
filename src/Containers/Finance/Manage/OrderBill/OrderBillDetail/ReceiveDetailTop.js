import React,{Component} from 'react';
import { connect } from 'react-redux';
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

export default class ReceiveDetailTop  extends Component{

	constructor(props,context){
		super(props, context);   
		
	}
	static PropTypes = {
		contractTopReceive:React.PropTypes.arr,
	}

  iconClose=()=>{
  	const {iconClose} = this.props;
	iconClose && iconClose();
  }
  
 



	render(){
         
         let {
		 contractTopReceive
		} = this.props;

         //console.log('44444',contractTopReceive)

		 
		return(

              <div className='ui-receive-money'>

						     <div className='receiveRightClose' onClick={this.iconClose}></div>

			                  <div  className='finance-receive-title'>
							   <Grid>
									<Row>
										<Col align="left" md={4} > 
										 <span className='addReceivePic'>添加回款</span>
										</Col> 
										<Col align="right" md={8}> 
										  <span className='currentReceivePic'>剩余:</span>
										  <span className='sumMoneyRange'></span>
										</Col> 
									</Row>
								</Grid>
                             
						    
								          
			              
			                    <div className='receive-detail-table'>
			                      <ul className='table-head'>
                                      <li>类型</li>
                                      <li>款项</li>
                                      <li>金额</li>
                                      <li>未回款</li>
                                      <li>操作</li>
			                      </ul>
			                      {contractTopReceive.map(function(item,index){
			                      
                                        if(item.contractcode=='213213'){
                                        	return (
                                          <ul className='admin-ul'>
                                        	 <li>{item.contactName}</li>
                                             <li>定金</li>
                                             <li>{item.frontmoney}</li>
                                             <li>{item.nFrontmoney}</li>
                                             <li>合同</li>
                                          </ul>  
                                        	)
                                        }
                                        if(item.contractcode!='213213'){
                                        	return (
                                         <div className='joinBook'>
                                           <ul>	
                                        	 <li>{item.contactName}</li>
                                             <li>押金</li>
                                             <li>{item.deposit}</li>
                                             <li>{item.nDeposit}</li>
                                             <li>合同</li>
                                           </ul>
                                           <ul>	
                                        	 <li></li>
                                             <li>租金</li>
                                             <li>{item.totalrent}</li>
                                             <li>{item.nTotalrent}</li>
                                             <li>合同</li>
                                           </ul> 
                                          </div>   
                                        	)
                                        }
                                        

                                        
                                                                          
			                     
			                         })
			                       }

			                    </div>	                                
                        </div>
				</div>
		);
	}

}
