import React from 'react';
import {
	Title,
	Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,TableFooter,
	Button,
	Section,
	Dialog,
	Message,
	Grid,Row,
	ListGroup,ListGroupItem,
	Tooltip,
	Drawer ,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';
import company from './images/company.svg';


import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class EmptyPage extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
		}
	}

	componentDidMount(){
	}




	render() {

		return (
		    <div className="empty-page" style={{width:200,backgroundColor:"#fff",margin:"0 auto",marginTop:20,paddingTop:20}} >
				<img src={company} style={{diaplay:"inline-block",width:200}}/>
                <p style={{width:200,textAlign:"center"}}>请选择您要查询的公司</p>
			</div>
		);

	}

}
