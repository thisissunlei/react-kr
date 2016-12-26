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



		 let contractTopReceive=[
          {
            "contactName":"入驻",
            "contactType":21707,
            "contractcode":"123",
            "deposit":77712,
            "detailid":26384,
            "frontmoney":33206,
            "nDeposit":80437,
            "nFrontmoney":27103,"nTotalrent":17240,"totalrent":52135
          },
          {
            "contactName":"意向",
            "contactType":21707,
            "contractcode":"444",
            "deposit":77712,
            "detailid":26384,
            "frontmoney":33206,
            "nDeposit":80437,
            "nFrontmoney":27103,"nTotalrent":17240,"totalrent":52135
          },
           {
            "contactName":"增租",
            "contactType":21707,
            "contractcode":"234",
            "deposit":77712,
            "detailid":26384,
            "frontmoney":33206,
            "nDeposit":80437,
            "nFrontmoney":27103,"nTotalrent":17240,"totalrent":52135
          },
          {
            "contactName":"续租",
            "contactType":21707,
            "contractcode":"235",
            "deposit":77712,
            "detailid":26384,
            "frontmoney":33206,
            "nDeposit":80437,
            "nFrontmoney":27103,"nTotalrent":17240,"totalrent":52135
          }
        ]

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
			                      
                                        if(item.contractcode=='444'){
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
                                        if(item.contractcode=='123'){
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
                                        

                                        if(item.contractcode=='234'){
                                        	return (
                                         <div className='increaseBook'>
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
                                        if(item.contractcode=='235'){
                                        	return (
                                         <div className='continueBook'>
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
