import React, {

	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	KrField,
	ButtonGroup,
	Col,
	Row,
	Grid,
	Button
} from 'kr-ui';
import './index.less'
import {Http} from 'kr/Utils';

class BindCommunity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			jsonData: this.props.jsonData,
			checkedCmt:[],
			existing:this.props.existing
		}
		this.getBindCmtData();
	}

	//名称转化
	nameConversion = (data,existing) =>{
		if(!data){
			return ;
		}
		var allArr = [];
		data.map(function(item,index){
			var arr = [];
			for (let i = 0; i<item.community.length;i++){
				let every = item.community[i];
				var flag = false;
				for(let j=0;j<existing.length;j++){
					if(every.id == existing[j].id){
						flag = true;
						break;
					}
				}
				arr.push({
					 checked:flag,
					 value:every.id,
					 label:every.name,
				})
			}
			allArr.push({
				value:item.id,
				label:item.name,
				community:arr
			})
		})
		return allArr;
	}


	//选择绑定社区的数据准备
	getBindCmtData = (id) =>{
		let self = this;
		let values = {id:id||''};
		const {existing} = this.props;
		Http.request('bindCommunity', {}, values).then(function(response) {
			self.setState({
				checkedCmt:self.nameConversion(response.items,existing)
			})
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

	}
	

	onCancel = () => {

		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	onSubmit = () =>{
		let data = this.showCheckData();
		const {checkedSubmit} = this.props;
		checkedSubmit && checkedSubmit(data);
		this.onCancel();
	}
	//筛选选中的
	showCheckData = () =>{

		let {checkedCmt} = this.state;
		let checkedArr = [];
		let obj = [].concat(checkedCmt);
		for (let i = 0; i < obj.length; i++){
				obj[i].community.map(function(item,index){
						if(item.checked){
							checkedArr.push({
								id:item.value,
								name:item.label
							});
						}
				})
		}

		return checkedArr;
	}

	checkChange = (data,value,all) =>{

		const {checkedCmt} = this.state;
		let newCheckedCmt = [].concat(checkedCmt);
		for(let i=0; i<newCheckedCmt.length; i++){
			if(newCheckedCmt[i].id == all.value){
				newCheckedCmt[i].community = data;
			}
		}
		
		this.setState({
			checkedCmt:newCheckedCmt
		})

	}
 //生成CheckBox
  renderCheckBox = () =>{
	const _this = this;
	//数据转换
	if(this.state.checkedCmt && this.state.checkedCmt.length !=0 && this.state.checkedCmt[0].label!=''){
		
	
		
		let parentArr = this.state.checkedCmt;
		let arr = parentArr.map(function(item,index){

			return (<div key = {index}>
					<KrField
						label=""
						name='contract'
						component="groupCheckbox"
						defaultValue={item.community}
						requireLabel={false}
						checkAllData = {{label:item.label,value:item.value}}
						isCheckAll = {true}
						childrenInline = {true}
						indent = {true}
						onChange = {_this.checkChange}
					/>
					</div>)
		})
		return <div>{arr}</div>
	}
  }

	render() {
		const {handleSubmit} = this.props;

		return (
			<div className="bind-community"  style={{marginTop: -30}}>
				<div  style={{marginTop:40}}>
	          {this.renderCheckBox()}
	      </div>
				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" onClick={this.onSubmit}/></div>
								<Button  label="取消" type="button" cancle={true} onClick={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
		</div>
		);
	}
}
export default reduxForm({
	form: 'bindCommunity',
})(BindCommunity);
