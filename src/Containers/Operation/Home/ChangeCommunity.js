import React from 'react';
import {
  reduxForm,
  change,
  arrayPush,
  initialize,
  formValueSelector
} from 'redux-form';

import {
  Actions,
  Store,
  connect
} from 'kr/Redux';
import {
	Title,Dialog,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,

} from 'kr-ui';
import home from './images/home-community.svg';
import  "./index.less";
import State from './State';
import {Http,DateFormat} from "kr/Utils";
import {
	observer,
	inject
} from 'mobx-react';
@observer

class ChangeCommunity  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.cityId = '';
	}

	componentDidMount(){
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	onSubmit=(value)=>{
		let {onSubmit} = this.props;
		onSubmit && onSubmit(value);
	}
	ChangeCommunity=(value)=>{
		Store.dispatch(change('ChangeCommunity', 'communityName', value.label));

	}
	changeCity=(value)=>{
		this.cityId = value.id;
		console.log('======',value,this.cityId)

		
	}

	render(){
		let {handleSubmit} = this.props;
		let communityList = State.cityList.filter((item)=>{
			if(item.id === this.cityId){
				return item.communitys
			}else{
				return []
			}
		})
		console.log('render====>'.this.cityId,communityList)
		return(
			<div style={{padding:'30px 0 10px 0'}}>
				<form  onSubmit={handleSubmit(this.onSubmit)}>

					<KrField grid={1/2} 
						label="城市" 
						name="cityId" 
						component="select" 
						right={20} 
						options={State.cityList} 
						inline={false}
						onChange={this.changeCity}
					/>
					<KrField 
						grid={1/2} 
						label="社区" 
						name="communityId" 
						component="select" 
						left={20} 
						options={communityList}  
						inline={false} 
						onChange={this.ChangeCommunity}
					/>
					<KrField grid={1/2} label="社区名称" name="communityName" type="hidden" component="hidden"  />

					<Grid style={{marginTop:20}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>

									<div style = {{display:"inline-block",marginRight:40}}><Button  label="确定" type="submit" joinEditForm /></div>
									<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
								</ButtonGroup>
							</Col>
						</Row>
					</Grid>
				</form>


	     	</div>

		);
	}
}
const validate = values => {
	const errors = {};
	if (!values.cityId) {
		errors.cityId = '请选择城市';
	}

	if (!values.communityId ) {
		errors.communityId = '请选择社区';
	}

	return errors
}
export default reduxForm({ form: 'ChangeCommunity',validate})(ChangeCommunity);
