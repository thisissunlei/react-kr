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


export default class SearchParam extends Component{

	static defaultProps = {
		detail:{

		},
	}

	static PropTypes = {
		detail:React.PropTypes.object
	}

	constructor(props,context){
		super(props, context);
	}

	componentDidMount() {

	}

	render(){

		return(

			<div>

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
				
			</div>		

		);

	}

}




