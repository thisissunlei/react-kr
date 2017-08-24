import React from 'react';
import {reduxForm,change,initialize,reset} from 'redux-form';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	Button,
	Message,
	ListGroup,
	ListGroupItem,
} from 'kr-ui';

import {
	observer
} from 'mobx-react';

import State from './State';

import './index.less';

@observer
class NewCreateForm extends React.Component{
	constructor(props){
		super(props);

		this.state={
			beginDate:'',
			endDate:'',
			beginTime:'',
			endTime:''
		}
	}
	componentWillMount() {
		
	}
	onSubmit=(value)=>{
		console.log('value',value)
	}

	render(){
		const { handleSubmit} = this.props;
		// 对应功能选项
		return (
			<div className="new-create-activity">
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<div className="title-box">
						<img src={require('./images/activity.svg')} className="title-img"/>
						<span className="title-text">新建活动</span>
						<span className="close-page" onClick={this.onCancel}>
							<img src={require('./images/closeIMG.svg')} className="close-page-img" />
						</span>
					</div>
					<div className="detail-info">
						<div className="activity-info">
							<div className="activity-title">
								<span>1</span>
								<span></span>
								<span>活动信息</span>
							</div>
							<div className="activity-detail-info">
								<img src={require('./images/selectOne.svg')} className="select-one"/>
								<KrField grid={1/2} name="name" type="text" label="活动名称" requireLabel={true} style={{width:252,zIndex:11}} />
								<KrField name="type"
									component="select"
									options={[]}
									label="活动类型"
									requireLabel={true}
									style={{width:252,marginLeft:24,zIndex:11}}
								/>
								<KrField grid={1/2} name="contact" type="text" label="活动联系人" style={{width:252}}/>
								<KrField grid={1/2} name="contactPhone" type="text" label="活动联系人电话" style={{width:252,marginLeft:24}}/>
								<KrField name="joinType"
									component="select"
									options={[]}
									label="参与人"
									style={{width:'252px'}}
								/>
								<KrField grid={1/2} name="maxPerson"  requireLabel={true} type="text" label="人数限制" style={{width:'252px',marginLeft:24}}/>
								<KrField grid={1/2} name="top" component="group" label="是否置顶"  style={{width:252}} >
									<KrField name="top" grid={1/2} label="置顶" type="radio" value='1' style={{marginTop:10,display:"inline-block"}} onClick={this.chooseStick}/>
									<KrField name="top" grid={1/2} label="不置顶" type="radio" value='0' onClick={this.noStick} style={{marginTop:10}}/>
				              	</KrField>
								<KrField name="sort" type="text" label="排序"  style={{display:State.isStick?"none":"inline-block",width:252,marginLeft:24}} onChange={this.NumRepeat}/>
							</div>
						</div>
					</div>

				</form>
		  	</div>
		);
	}
}
const validate = values => {
	console.log("values",values);

	let errors = {};
	if(values.communitys && !values.communitys.length){
		errors.communitys = '请选择推广社区'
	}
	return errors
}

export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
})(NewCreateForm);
