import React from 'react';
import { connect } from 'react-redux';
import {
	Http,
	DateFormat,
} from "kr/Utils";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm, formValueSelector, change,initialize} from 'redux-form';
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
	Message,
	Dialog,
  ListGroup,
  ListGroupItem
} from 'kr-ui';
import './index.less';

export default class DataPermission extends React.Component{
	static PropTypes = {
        detail: React.PropTypes.object,
        onCancel: React.PropTypes.func,
    }

	constructor(props,context){
		super(props, context);
    this.state = {
			idList:[],
			codeList:[],
			outSelect:false,
    };
		this.onCancel = this.onCancel.bind(this);
	}
  componentDidMount() {
		var _this = this;
		window.setTimeout(function(){
			_this.getInfo();
		},1)

  }
	getInfo=()=>{
			var _this = this;
			const {detail} = this.props;
			Http.request('user-code',{
				roleId:_this.props.detail.id,
			}).then(function(response){
			  _this.setState({
					codeList: response.items,
				});
			}).catch(function(err){
			})
	}
	
	checked = (item,index) =>{
		var _this = this;
		let {codeList} = this.state;
		var list = codeList;
		var checked = [];
		if(item.flag==0){
			item.flag=1;
			list[index].flag = 1;
		}else{
			item.flag=0;
			list[index].flag = 0;
		}
		list.map((itemA) => {
			checked.push(itemA.flag);
		})
		if (checked.indexOf(0) == -1) {
			_this.setState({
				outSelect:true,
			})
		} else {
			_this.setState({
				outSelect:false,
			})
		}
		_this.setState({
			codeList:list,
		})
	}
	renderData=(item,index)=>{
		return (
					<div style={{display:'inline-block',width:'50%',lineHeight:'32px',height:32}} key={index}>
						<Checkbox
								style={{display:'inline-block',color:'#666'}}
								label={item.codeName}
								checked={item.flag==1?true:false}
								onCheck={this.checked.bind(this,item,index)}
						/>
					</div>
		);
	}
	onSubmit = () => {
		let {codeList} = this.state;
		const {detail,onSubmit} = this.props;
		var idList = [];
		codeList.map((item, index) => {
				if(item.flag==1){
					idList.push(item.id);
				}
		});
		console.log(idList);
		Http.request('user-code-submit',{},{
			roleId:detail.id,
			codeId:idList
		}).then(function(response) {
				Message.success('修改成功')
				onSubmit();
		}).catch(function(err) {
				Message.error(err.message);
		});
	}
	onCancel=()=>{
	  const {
	    onCancel
	  } = this.props;
	  onCancel && onCancel()
	}
	outSelect=()=>{
		let {outSelect} = this.state;
		var codeList = this.state.codeList;
		var _this = this;
		this.setState({
			outSelect:!this.state.outSelect,
		},function (){
			if(_this.state.outSelect){
				codeList.map((item,index)=>{
					item.flag = 1;
				})
			}else{
				codeList.map((item,index)=>{
					item.flag = 0;
				})
			}
			_this.setState({
				codeList
			})
		})
	}

	render(){
		
		let {codeList,outSelect} = this.state;
		console.log(codeList);
		return(
			<div className="g-code-user">
				<Checkbox label="全选" style={{display:'inline-block',lineHeight:'30px',marginBottom:6,color:'#000'}} checked={outSelect?true:false} onCheck={this.outSelect}/>
          <div className="leftSec">
						{this.state.codeList.map((item,index)=>{return this.renderData(item,index)})}
          </div>
					<ListGroup>
                <ListGroupItem style={{
                    paddingLeft: 136,
                    paddingRight: 40,
                    paddingTop: 20,
                    paddingBottom: 6
                }}>
                    <Button label="确定" type="submit" onClick={this.onSubmit} width={90} height={36} fontSize={14}/>
                </ListGroupItem>
                <ListGroupItem style={{
                    paddingTop: 20,
                    paddingBottom: 6
                }}>
                    <Button label="取消" cancle={true} type="button" onTouchTap={this.onCancel} width={90} height={34} fontSize={14}/>
                </ListGroupItem>
            </ListGroup>
			</div>
		);
	}

}
