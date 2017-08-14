import React from 'react';
import {
  reduxForm,
  change,
  arrayPush,
  initialize,
  reset,
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
		this.state = {
			communitys:[]
		}
		Store.dispatch(reset('ChangeCommunity'));

	}

	componentDidMount(){
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	onSubmit=(value)=>{
		console.log('=======',value)
		if(!value.communityId){
			return;
		}
		localStorage.setItem('OP_HOME_COMMUNITY',value.communityId);
		let {onSubmit} = this.props;
		onSubmit && onSubmit(value);
	}
	ChangeCommunity=(value)=>{
		Store.dispatch(change('ChangeCommunity', 'communityName', value.label));

	}
	changeCity=(value)=>{
		Store.dispatch(reset('ChangeCommunity'));
		Store.dispatch(change('ChangeCommunity', 'cityId', value.id));
		
		let list = [];
		list = State.cityList.filter((item)=>{
			if(item.id === value.id){
				return item;
			}
		})
		this.setState({
			communitys:list[0].communitys
		})

		
	}

	render(){
		let {handleSubmit} = this.props;
		let {communitys} = this.state;
		return(
			<div style={{padding:'30px 0 10px 0'}}>
				<form  onSubmit={handleSubmit(this.onSubmit)}>

					<KrField grid={1/2} 
						label="城市" 
						name="cityId" 
						component="select" 
						right={15} 
						left={30}
						options={State.cityList} 
						inline={false}
						onChange={this.changeCity}
					/>
					<KrField 
						grid={1/2} 
						label="社区" 
						name="communityId" 
						component="select" 
						left={15} 
						right={40}
						options={communitys}  
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
