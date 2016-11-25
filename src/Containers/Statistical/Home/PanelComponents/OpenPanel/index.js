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
	ListGroup,
	ListGroupItem

} from 'kr-ui';

export default class Initialize  extends Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}



	render(){

		return(

			<div>
				<Grid>
						<Row>
							<Col align="left"> 
							 <span className='ui-pic-open'></span><span>招商数据统计</span>	
							</Col> 
							<Col align="right"> 
								<ListGroup>
									<ListGroupItem></ListGroupItem>
									<ListGroupItem></ListGroupItem>
								</ListGroup>	
							</Col> 
						</Row>
					</Grid>

			</div>
		);
	}

}
