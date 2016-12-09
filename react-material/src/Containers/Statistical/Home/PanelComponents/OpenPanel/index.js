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
import './index.less';

class searchDateForm extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		



		return (
			<div>
                 
					     <form onSubmit={handleSubmit(this.onSubmit)}>
 
						    <KrField name="groupId" type="hidden"/>
                            <div><ListGroup>
								<ListGroupItem><div className='ui-date-start'><KrField  name="startDate" right={8} style={{marginLeft:-10}} component="date" /></div></ListGroupItem>
								<div className='ui-line-down-list'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
								<ListGroupItem><div className='ui-date-end'><KrField name="endDate" right={8} component="date" /></div></ListGroupItem>
							 </ListGroup>
		                    </div>
                         </form>
			   </div>

		);
	}
}

export default class Initialize  extends Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}



	render(){

		return(

			<div className='ui-open-info'>
				   <Grid>
						<Row>
							<Col align="left"> 
							 <span className='ui-pic-open'></span><span>招商数据统计</span>	
							</Col> 
							<Col align="right"> 
							  <searchDateForm />
							</Col> 
						</Row>
					</Grid>

			</div>
		);
	}

}
