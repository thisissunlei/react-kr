import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';
import {reduxForm,submitForm,change,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';

import {
	Tabs,
	Tab,
	Dialog,
	Section,
	Grid,
	Button,
	Notify,
	BreadCrumbs,
} from 'kr-ui';

import './index.less';

import EmployessTable from './EmployessTable';
import D3Content from './D3Content';


export default  class ItemTable extends Component {

	constructor(props,context){
		super(props, context);

		 this.onStation = this.onStation.bind(this);
			
		this.state = {
			activity:false
		}

	}

	componentDidMount(){

	}

	//分配工位
	onStation(){
		this.setState({
			activity:!this.state.activity
		});
	}

  render() {

	  let {activity} = this.state;

    return (

			<tr>
						<td>
							<div className="company-name"> 诚意有限公司 </div>
						</td>
						<td colSpan="12">
							<D3Content />
							<EmployessTable activity={activity} />
						</td>
						<td>
							<Button type="link" primary={true} label="分配工位" onTouchTap={this.onStation}/>
							<Button type="link" primary={true} label="撤场"/>
							<Button type="link" primary={true} label="员工"/>
						</td>
					</tr>
	);
  }
}





