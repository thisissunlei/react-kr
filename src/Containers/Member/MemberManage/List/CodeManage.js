import React from 'react';
import {
	Http
} from 'kr/Utils';
import {
	KrField,
	Button,
    Message,
    KrDate,
    Dialog
} from 'kr-ui';
import './index.less';

export default class CodeManage extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state={
            codeList:[],
            codeValue:'',
            openUncode:false,
            codeItem:''
        }
		this.getCodeList();
    }
    getCodeList=()=>{
        let {detail}=this.props;
        var _this=this;
        Http.request('get-member-code',{id:detail.id}).then(function (response) {
			_this.setState({
                codeList:response.cards
            })

		}).catch(function (err) { 
			Message.error(err.message)
		});
    }
    openUncode=(item)=>{
        this.setState({
            codeItem:item,
            openUncode:!this.state.openUncode
        })
    }
	
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
    }
    
	onUnBindCode=()=>{
        let {detail}=this.props;
        let {codeItem}=this.state;
        var _this=this;
        var form={
            memberId:detail.id,
            cardId:codeItem.id,
        }
        Http.request('unbind-member-code',form).then(function (response) {
            Message.success('解绑成功！')
            _this.getCodeList()
            _this.setState({
                openUncode:!_this.state.openUncode
            })
		}).catch(function (err) { 
			Message.error(err.message)
		});
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
      
        var form={
            memberId:detail.id,
            outerCard:codeValue,
        }
        Http.request('bind-member-code',{},form).then(function (response) {
			_this.refs.memberCode.value='';
            Message.success('绑定成功！')
            _this.getCodeList()
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
                                        <td><KrDate value={item.holdAt}/></td>
                                        <td onClick={this.openUncode.bind(this,item)}><span className="u-txt-blue">解绑</span></td>
                                    </tr>
                                )
                            })}
                </tbody>		
            </table>
            <Dialog
            title="解绑"
            modal={true}
            contentStyle ={{ width: '444',overflow:'visible'}}
            open={this.state.openUncode}
            onClose={this.openUncode}
            >
            <div className='u-list-delete'>
                <p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确认要解除绑定吗？</p>
                <div style={{textAlign:'center',marginBottom:10}}>
                    <div  className='ui-btn-center'>
                        <Button  label="确定" onClick={this.onUnBindCode}/></div>
                        <Button  label="取消" type="button" cancle={true} onClick={this.openUncode} />
                    </div>
                </div>
            </Dialog>
		</div>
		);
	}
}