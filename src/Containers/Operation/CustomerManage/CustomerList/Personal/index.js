import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
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
	Drawer

} from 'kr-ui';
import State from './State';
@observer
class Personal extends Component{

	constructor(props,context){
		super(props, context);
		let params="22"
		State.getBasicInfo(params);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
test=()=>{
	State.witchs("12")
	
	console.log(this,"233")
}


	render(){

		return(

			<div>
      <h1 onClick={this.test}>222222</h1>
			<h2>{State.name}</h2>
			<Drawer
	        open={State.values}
	        width={900}
	        openSecondary={true}
	        className='m-finance-drawer'
	        containerStyle={{top:60,paddingBottom:228,zIndex:20}}
	     >
	       <div style={{height:10000}}>
          	<h1>rrrrrrr</h1>
         </div>
      </Drawer>
			</div>
		);
	}

}
export default Personal;
