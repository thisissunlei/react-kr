import React from 'react';
import { connect } from 'react-redux';
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
import './DataPermission.less';

export default class DataPermission extends React.Component{
	static PropTypes = {
        detail: React.PropTypes.object,
        onCancel: React.PropTypes.func,
    }

	constructor(props,context){
		super(props, context);
    this.state = {
			idList:[],
			cityList:[],
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
			Store.dispatch(Actions.callAPI('findCommunities',{
				userId:_this.props.detail.id,
			})).then(function(response){
			  _this.setState({
					cityList: response.cities,
				});
			}).catch(function(err){
			})
	}
	//点击全选
	allSelect = (item,index) => {
    var _this = this;
    let {cityList}=this.state;
    var list;
		list = cityList;
		if (item.flag) {
			item.flag = 0;
			item.communities.map((itemC,index) => {
				itemC.ownFlag = 0;
			})
			_this.setState({
				outSelect:false,
			})
		}else {
			item.flag = 1;
			item.communities.map((itemC,index) => {
				itemC.ownFlag = 1;
			})
		}
		list[index] = item;
		var allSelect = 0;
		list.map((itemA,indexA)=>{
			if(itemA.flag==1){
				allSelect++;
			}
		})
		if (allSelect==list.length) {
			_this.setState({
				outSelect:true,
			})
		}else{
			_this.setState({
				outSelect:false,
			})
		}
		_this.setState({
			cityList:list,
		})
	}
	checked = (item,itemC,index,indexC) =>{
		var _this = this;
		let {cityList} = this.state;
		var list = cityList;
		var checked = [];
		if(itemC.ownFlag==0){
			itemC.ownFlag=1;
		}else{
			itemC.ownFlag=0;
		}
		list[index].communities[indexC] = itemC;
		item.communities.map((itemA, index) => {
			checked.push(itemA.ownFlag);
		})
		if (checked.indexOf(0) == -1) {
			item.flag = 1;
		} else {
			item.flag = 0;
		}
		list[index] = item;
		var allSelect = 0;
		list.map((itemA,indexA)=>{
			if(itemA.flag==1){
				allSelect++;
			}
		})
		if (allSelect==list.length) {
			_this.setState({
				outSelect:true,
			})
		}else{
			_this.setState({
				outSelect:false,
			})
		}
		_this.setState({
			cityList:list,
		})
	}
	renderData=(item,index)=>{
		return (
			<div key={index}>
				<div style={{display:'block',textAlign:'left',lineHeigitemht:'32px',color:'#333',marginBottom:8}}>
						<div style={{color:'#333',fontWeight:500,fontSize:14}}>{item.name}</div>
						<Checkbox label="全选" style={{color:'#333',display:'inline-block'}} checked={item.flag==1?true:false} onCheck={this.allSelect.bind(this,item,index)}/>
						{item.communities.map((itemC,indexC)=>{return (
								<div style={{display:'inline-block',lineHeight:'32px'}} key={indexC}>
									<Checkbox
											style={{display:'inline-block',color:'#666'}}
											label={itemC.communityName}
											checked={itemC.ownFlag==1?true:false}
											onCheck={this.checked.bind(this,item,itemC,index,indexC)}
									/>
								</div>
							)
						 })
						}
				</div>
			</div>
		);
	}
	onSubmit = () => {
		let {cityList} = this.state;
		const {detail} = this.props;
		var idList = [];
		cityList.map((item, index) => {
			item.communities.map((itemC,indexC)=>{
				if(itemC.ownFlag==1){
					idList.push(itemC.communityId);
				}
			})
		})
		console.log(idList);
		Store.dispatch(Actions.callAPI('editUserCommunity',{},{
			id:detail.id,
			communityIds:idList
		})).then(function(response) {
				Message.success('修改成功')
				window.setTimeout(function(){
					window.location.reload();
				},800)
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
		var cityList = this.state.cityList;
		var _this = this;
		this.setState({
			outSelect:!this.state.outSelect,
		},function (){
			if(_this.state.outSelect){
				cityList.map((item,index)=>{
					item.flag = 1;
					item.communities.map((itemC,indexC)=>{
						itemC.ownFlag = 1;
					})
				})
			}else{
				cityList.map((item,index)=>{
					item.flag = 0;
					item.communities.map((itemC,indexC)=>{
						itemC.ownFlag = 0;
					})
				})
			}
			_this.setState({
				cityList
			})
		})
		
		console.log(this.state.cityList);
		console.log(outSelect);
		
	}

	render(){
		let {cityList,outSelect} = this.state;
		return(
			<div className="g-DataPermission">
				<Checkbox label="全选" style={{display:'inline-block',lineHeight:'30px',marginBottom:6,color:'#000'}} checked={outSelect?true:false} onCheck={this.outSelect}/>
          <div className="leftSec">
						{cityList.map((item,index)=>{return this.renderData(item,index)})}
          </div>
					<ListGroup>
                <ListGroupItem style={{
                    paddingLeft: 165,
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
