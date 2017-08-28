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
} from 'kr-ui';

import {
	observer
} from 'mobx-react';

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
		console.log('===will==',State.data)
		Store.dispatch(initialize('ViewForm',State.data));

		
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
			<div className="new-create-activity">
				<form>
					<div className="title-box">
						<img src={require('./images/activity.svg')} className="title-img"/>
						<span className="title-text">查看公共字典</span>
						<span className="close-page" onClick={this.onCancel}>
							<img src={require('./images/closeIMG.svg')} className="close-page-img" />
						</span>
					</div>
					<div className="detail-info">
								<KrField grid={1/2} name="name" type="labelText" label="字典名称" requireLabel={true}
								value={State.data.name} style={{width:252,zIndex:11}} inline={false}/>
								<KrField grid={1/2} name="code" type="labelText" left={50} inline={false}
								value={State.data.code} label="字典编码" requireLabel={true} style={{width:252}}/>
								<KrField grid={1} name="type" type="labelText" label="字典类型" 
								value={State.data.type} requireLabel={true} inline={false}/>
								<KrField grid={1} name="remark" type="labelText" 
								value={State.data.remark} label="描述" inline={false}/>
						<Grid style={{paddingBottom:20,textAlign:'center'}}>
						<Row>
							<Button label="编辑"  type="button"  onTouchTap={this.edit} />
						</Row>
						</Grid> 
					</div>
					<div className="log-table">
						<div style={{textAlign:'center',marginBottom:20}}>
							<span className="list-title">引用记录</span>
						</div>
						<div style={{height:State.heightAuto?253:'auto'}}  className="list-table">
						<table>
							<thead>
								<tr>
									<td ><div>引用表单</div></td>
									<td ><div>最后一次使用时间</div></td>
								</tr>
							</thead>
							<tbody>
								{!State.list.length && State.list.map((item,index)=>{
									return (
										<tr key={index} >
											<td>{item.name}</td>
											<td >{DateFormat(item.time,'yyyy-mm-dd HH:MM:ss')}</td>
										</tr>

									)
								})}
								{!!State.list.length && 
										<tr style={{border:'none'}} className="noHover">
											<td colSpan={2}>
												<div style={{textAlign:'center'}}>
													<img src={nothings} style={{height:133,width:95,marginTop:30}}/>
													<p style={{fontSize:'12px',color:'#666',marginTop:15}}>亲，暂时还没有数据哦！</p>
												</div>
											</td>
										</tr>
								}
							</tbody>
						</table>
						</div>
						{State.list.length>6?<p style={{textAlign:'center',fontSize:'12px',color:'#666',marginTop:16}}><span style={{ cursor: 'pointer'}} onTouchTap={this.showAll}>{State.heightAuto?'展开':'收起'}</span><span className='bottomRow'></span></p>:''}
						{/*<div style={{textAlign:'center'}}>
							<img src={nothings} style={{height:133,width:95}}/>
							<p style={{fontSize:'12px',color:'#666',marginTop:15}}>亲，暂时还没有数据哦！</p>
						</div>*/}
					</div>

				</form>
		  	</div>
		);
	}
}
export default ViewForm = reduxForm({
	form: 'ViewForm',
})(ViewForm);
