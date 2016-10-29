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
import DismantlingForm from './DismantlingForm';


export default  class ItemTable extends Component {

	static PropTypes ={
		onDismantling:React.PropTypes.func,
	}

	constructor(props,context){
		super(props, context);

		 this.onStation = this.onStation.bind(this);
		 this.onDismantlingDialog =this.onDismantlingDialog.bind(this);
		 this.onDismantling = this.onDismantling.bind(this);

		this.state = {
			activity:false,
			Dismantling:false,
		}

	}

	componentDidMount(){

	}
	//撤场
	onDismantling(){

		const {onDismantling} = this.props;

		onDismantling && onDismantling();

	}
	//分配工位
	onStation(){
		this.setState({
			activity:!this.state.activity
		});
	}
	onDismantlingDialog(){
		this.setState({
			Dismantling:!this.state.Dismantling
		})

	}
	
  render() {

	  let {activity} = this.state;
	  var contractInstallmentplanVo =  [
          {
            "installmentAmount": 3000,
            "installmentBegindate": 1451620800000,
            "installmentEnddate": 1459483200000,
            "name": "唐朝",
            "phone": "13317199888",
            "stationnum": 5
          },
          {
            "installmentAmount": 3000,
            "installmentBegindate": 1459483200000,
            "installmentEnddate": 1467345600000,
            "name": "唐朝",
            "phone": "13317199888",
            "stationnum": 10
          },
          {
            "installmentAmount": 3000,
            "installmentBegindate": 1467345600000,
            "installmentEnddate": 1475294400000,
            "name": "唐朝",
            "phone": "13317199888",
            "stationnum": 10
          },
          {
            "installmentAmount": 3000,
            "installmentBegindate": 1475294400000,
            "installmentEnddate": 1483156800000,
            "name": "唐朝",
            "phone": "13317199888",
            "stationnum": 10
          },
        ];
        var finaBluePointVo = [
          {
            "finaName": "入驻意向书",
            "pointDate": 1477557209000
          },
          {
            "finaName": "入住协议书",
            "pointDate": 1466049600000
          },
          {
            "finaName": "增租协议书",
            "pointDate": 1477568858000
          },
          {
            "finaName": "续租协议书",
            "pointDate": 1477572574000
          }
        ];

        var finaRedPointVo = [
          {
            "pointDate": 1477568292000
          },
          {
            "pointDate": 1451620800000
          },
          {
            "pointDate": 1458187200000
          },
          {
            "pointDate": 1466049600000
          },
          {
            "pointDate": 1473998400000
          },
          {
            "pointDate": 1477568862000
          },
          {
            "pointDate": 1477572578000
          },
          {
            "pointDate": 1477454400000
          },
          {
            "pointDate": 1458187200000
          },
          {
            "pointDate": 1466049600000
          },
          {
            "pointDate": 1473998400000
          }
        ];

	 
    return (

				<tr>
						<td>
							<div className="company-name"> 诚意有限公司 </div>
						</td>
						<td colSpan="12">
							<D3Content detail={contractInstallmentplanVo} finaBluePointVo={finaBluePointVo} finaRedPointVo={finaRedPointVo}/>
							<EmployessTable activity={activity}/>
						</td>
						<td>
							<Button type="link" primary={true} label="分配工位" onTouchTap={this.onStation}/>
							<Button type="link" primary={true} label="撤场" 	onTouchTap={this.onDismantling}/>
							<Button type="link" primary={true} label="员工"/>
						</td>
					</tr>
				
	);
  }
}





