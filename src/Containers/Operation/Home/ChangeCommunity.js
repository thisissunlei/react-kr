import React from 'react';
import {
  reduxForm,
  change,
  arrayPush,
  initialize
} from 'redux-form';

import {
  Actions,
  Store
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
import {Http,DateFormat} from "kr/Utils";
import {
	observer,
	inject
} from 'mobx-react';
@observer

class ChangeCommunity  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	onSubmit=(value)=>{
		console.log('====>',value)
		let {onSubmit} = this.props;
		onSubmit && onSubmit(value);
	}
	ChangeCommunity=(value)=>{
		Store.dispatch(change('ChangeCommunity', 'communityName', value.label));

	}

	render(){
		let {handleSubmit} = this.props;
		let options = [{label:'C1',value:'c1'},{label:'C2',value:'c2'},{label:'C3',value:'c3'},{label:'C4',value:'c4'},]
		
		return(
			<div style={{padding:'30px 0 10px 0'}}>
				<form  onSubmit={handleSubmit(this.onSubmit)}>

					<KrField grid={1/2} label="城市" name="cityId" component="select" right={20} options={options} inline={false}/>
					<KrField grid={1/2} label="社区" name="communityId" component="select" left={20} options={options}  inline={false} onChange={this.ChangeCommunity}/>
					<KrField grid={1/2} label="社区名称" name="communityName" type="hidden" component="hidden"  />

					<Grid style={{marginTop:20,marginRight:40}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>

									<div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit" joinEditForm /></div>
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

export default reduxForm({ form: 'ChangeCommunity'})(ChangeCommunity);
