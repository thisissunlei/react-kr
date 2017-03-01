import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
  CheckboxGroup,
  Checkbox,
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
import './DataPermission.less';

export default class DataPermission extends Component{

	constructor(props,context){
		super(props, context);
    this.state = {
      roleList: [],
      citySelect:false,

    };
		this.onCancel = this.onCancel.bind(this);
	}
  componentWillReceiveProps(nextProps) {
		let {roleList}=this.state;
		if(nextProps.detail){
			let id=nextProps.detail.id;
			var _this = this;
			Store.dispatch(Actions.callAPI('findRoleData',{id:id})).then(function(response) {
        _this.setState({
					roleList: response.roleList
				});
			}).catch(function(err) {

			});
		}

  }
renderData=(item,index)=>{
	// return (
	// 	<div key={index}>
	// 		<CheckboxGroup
	// 				style={{display:'block',textAlign:'left',lineHeight:'32px',color:'#333'}}
	// 				name={item.name}
	// 				options={}
	// 				checked={item.ownFlag==1?true:false}
	// 		/>
	//
	// 	</div>
	// );
}
onCancel=()=>{
  const {
    onCancel
  } = this.props;
  onCancel && onCancel()
}
allSelect=()=>{
  console.log(111);
  this.setState({
    citySelect:!this.state.citySelect,
  })
}

	render(){

		let {roleList}=this.state;
		console.log("cccc",roleList);
		return(

			<div className="g-DataPermission">
          <div className="leftSec">
            <Checkbox label="全选" style={{color:'#333'}} onCheck={this.allSelect}/>
							<CheckboxGroup
									style={{display:'block',textAlign:'left',lineHeight:'32px',color:'#333'}}
									name={roleList.name}
									options={roleList}
									checked={item.ownFlag==1?true:false}
							/>
			      {/*roleList.map((item,index)=>{return this.renderData(item,index)})*/}
          </div>
			</div>
		);
	}

}
