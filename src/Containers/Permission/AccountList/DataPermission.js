import React from 'react';
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

export default class DataPermission extends React.Component{

	constructor(props,context){
		super(props, context);
    this.state = {
      roleList: [],
      citySelect:false,

    };
		this.onCancel = this.onCancel.bind(this);
	}
  componentDidMount() {
		var _this = this;
		setTimeout(function() {
			_this.getInfo();
		}, 0)
  }
getInfo=()=>{
		let {roleList}=this.state;
		console.log('sdafsdafsadf',this.props.detail);

		let id=this.props.detail.id;
		var _this = this;
		Store.dispatch(Actions.callAPI('findRoleData',{id:id})).then(function(response) {
		  _this.setState({
				roleList: response.roleList
			});
		}).catch(function(err) {

		});
}
renderData=(item,index)=>{
	return (
		<div key={index}>
			<Checkbox
					style={{display:'block',textAlign:'left',lineHeigitemht:'32px',color:'#333'}}
					label={item.name}
					checked={item.ownFlag==1?true:false}
					onCheck={this.checked(item,index)}
			/>

		</div>
	);
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
		return(
			<div className="g-DataPermission">
          <div className="leftSec">
            <Checkbox label="全选" style={{color:'#333'}} onCheck={this.allSelect}/>
						{roleList.map((item,index)=>{return this.renderData(item,index)})}
          </div>
					<div className="rightSec">
						<Checkbox label="全选" style={{color:'#333'}} onCheck={this.allSelect}/>
						{roleList.map((item,index)=>{return this.renderData(item,index)})}
					</div>
			</div>
		);
	}

}
