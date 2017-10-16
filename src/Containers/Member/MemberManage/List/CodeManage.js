import React from 'react';
import {
	Http
} from 'kr/Utils';
import {
	KrField,
	Button,
    Message,
    KrDate
} from 'kr-ui';
import './index.less';

export default class CodeManage extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state={
            codeList:[],
            codeValue:''
        }
		this.getCodeList();
    }
    getCodeList=()=>{
        let {detail}=this.props;
        var _this=this;
        console.log('detail====>',detail)
        Http.request('get-member-code',{id:detail.id}).then(function (response) {
			_this.setState({
                codeList:response.cards
            })

		}).catch(function (err) { 
			Message.error(err.message)
		});
    }
	
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
    }
    
	onUnBindCode=()=>{

    }
    getCodeValue=()=>{
        var value=this.refs.memberCode.value;
        this.setState({
            codeValue:value
        })
        
    }
    addCode=()=>{
        let {detail}=this.props;
        let {codeValue}=this.state;
        var _this=this;
        if(codeValue==''){
            return;
        }
        console.log(codeValue)
        var form={
            memberId:detail.id,
            outerCard:codeValue,
        }
        Http.request('bind-member-code',{},form).then(function (response) {
			//_this.getCodeList()

		}).catch(function (err) { 
			Message.error(err.message)
		});
    }
	
	render() {
		let {
			detail
		} = this.props;
		let {
            codeList
        }=this.state;
		return (
			<div className="g-create-member">
			<div className="u-create-title">
					<div className="title-text">门禁卡管理</div>
					<div className="u-create-close" onClick={this.onCancel}></div>
			</div>
            <div className="u-add-code">
                <input className="ui-input" ref="memberCode" type="text" onChange={this.getCodeValue}/> <Button  label="绑定" type="button" height={36} onClick={this.addCode} />
            </div>
            <table className="u-table">	
                <thead>
                    <tr>
                        <th width={100}>会员卡号</th>
                        <th width={100}>绑定时间</th>
                        <th width={100}>操作</th>
                    </tr>
                </thead>
				<tbody>	
                    {codeList && codeList.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.outerCode}</td>
                                        <td><KrDate value={item.cTime}/></td>
                                        <td onClick={this.onUnBindCode.bind(this,item)}><span className="u-txt-blue">解绑</span></td>
                                    </tr>
                                )
                            })}
                </tbody>		
            </table>
		</div>
		);
	}
}