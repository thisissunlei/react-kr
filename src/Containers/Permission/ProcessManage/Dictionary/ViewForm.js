import React from 'react';
import {reduxForm,change,initialize,reset} from 'redux-form';
import {Store} from 'kr/Redux';
import {Http,DateFormat} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	Button,
	Message,
	ListGroup,
	ListGroupItem,
	TabelEdit,
	FRow,
	FdTabel,
	FContent
} from 'kr-ui';

import {
	observer
} from 'mobx-react';
import {
	toJS
} from 'mobx';

import State from './State';
import nothings from './images/nothings';


import './index.less';
import './detail.less';

@observer
class ViewForm extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount() {
		Store.dispatch(initialize('ViewForm',State.data));
		Store.dispatch(change('ViewForm','datadetail',toJS(State.data.items)));
		Store.dispatch(change('ViewForm','tableData',toJS(State.list)));

		
	}
	onCancel=()=>{
		State.closeAll();
	}
	edit=()=>{
		State.openEdit = true;
	}
	showAll=()=>{
		State.heightAuto = !State.heightAuto;
	}

	render(){
		const { handleSubmit} = this.props;
		let heightAuto = true;
		// 对应功能选项
		return (
			<div className="new-create-activity edit-dictionary">
				<form>
					<div className="title-box">
						<img src={require('./images/activity.svg')} className="title-img"/>
						<span className="title-text">查看公共字典</span>
						<span className="close-page" onClick={this.onCancel}>
							<img src={require('./images/closeIMG.svg')} className="close-page-img" />
						</span>
					</div>
					<div className="detail-info">
								<KrField grid={1/2} name="dictName" type="labelText" label="字典名称" requireLabel={true}
								value={State.data.dictName} style={{width:252,zIndex:11}} inline={false}/>
								<KrField grid={1/2} name="code" type="labelText" left={50} inline={false}
								value={State.data.dictCode} label="字典编码" requireLabel={true} style={{width:252}}/>
								<KrField grid={1} name="dictCode" type="labelText" label="字典类型" 
								value={State.data.dataTypeStr} requireLabel={true} inline={false}/>
								<KrField grid={1} name="descr" type="labelText" 
								value={State.data.descr} label="描述" inline={false}/>
								<div>
									<TabelEdit 
									 	name = "datadetail" 	
									 >
										 <FRow name = "label"  type = "label"  label = "选项文字" />
										 <FRow name = "value" type = "label" label = "选项值" />
										 <FRow name = "orderNum" type = "label" label = "排序号" />
										 <FRow name = "isDefault" type = "checkBox" disabled = "disabled" label = "是否默认" />
									 </TabelEdit>
								</div>
						<Grid style={{paddingBottom:20,textAlign:'center',paddingTop:30}}>
						<Row>
							<Button label="编辑"  type="button"  onTouchTap={this.edit} />
						</Row>
						</Grid> 
					</div>
					<div>
						<div style={{textAlign:'center',marginBottom:20}}>
							<span className="list-title">引用记录</span>
						</div>
						<div style={{width:544,marginLeft:25}}>
							<FdTabel
								name = "tableData"
								isFold = {true}
				 				initFoldNum = "3"
							>
								<FRow name = "formName" label = "引用表单" />
								<FRow name = "lastUseTime" type='date' label = "最近一次使用时间" />
							</FdTabel>
						</div>
					</div>

				</form>
		  	</div>
		);
	}
}
export default ViewForm = reduxForm({
	form: 'ViewForm',
})(ViewForm);
