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
} from 'kr-ui';


export default class Earnest extends Component{

	static PropTypes = {
		detailResult:React.PropTypes.object
	}

	constructor(props,context){
		super(props, context);
	}

	componentDidMount() {

	}

	render(){
		const {detailResult}=this.props;
		let items=detailResult.items;

		if(!items){
			items=[];
		}

		//console.log("kkkkk",items);

		return(

			 <div>
				  <Row>
					<Col md={2}><Button label="回款" primary={true}/></Col>
					<Col md={2}><Button label="转押金" primary={true}/></Col>
					<Col md={2}><Button label="转营业外收入" primary={true}/></Col>
                  </Row>

                  
                  <Table displayCheckbox={false}>
			          <TableHeader>
			          <TableHeaderColumn>序号</TableHeaderColumn>
			          <TableHeaderColumn>交易日期</TableHeaderColumn>
			          <TableHeaderColumn>代码</TableHeaderColumn>
			           <TableHeaderColumn>类别</TableHeaderColumn>
			          <TableHeaderColumn>款项</TableHeaderColumn>
			          <TableHeaderColumn>金额</TableHeaderColumn>
			           <TableHeaderColumn>备注</TableHeaderColumn>
			           <TableHeaderColumn>操作</TableHeaderColumn>
			         </TableHeader>
			         <TableBody>        
          
			         {items.map((item,index)=><TableRow key={index}>
			              <TableRowColumn>{index+1}</TableRowColumn>
			              <TableRowColumn>{item.occurday}</TableRowColumn>
			              <TableRowColumn>{item.accountname}</TableRowColumn>
			              <TableRowColumn>{item.proptypename}</TableRowColumn>
			              <TableRowColumn>{item.propname}</TableRowColumn>
			              <TableRowColumn>{item.finaflowAmount}</TableRowColumn>
			               <TableRowColumn>{item.finaflowdesc}</TableRowColumn>
			              <TableRowColumn>
							  <Button label="查看" component="labelText" type="link"/>
						 </TableRowColumn>
			            </TableRow>
			         )}

           </TableBody>
       </Table> 



				  
			</div>		

		);

	}

}







