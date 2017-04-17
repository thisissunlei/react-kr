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
    };
		this.onCancel = this.onCancel.bind(this);
	}
  componentDidMount() {
		var _this = this;
		window.setTimeout(function(){
			_this.getInfo();
		},800)

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
		if (item.flag) {
			item.communities.map((item,index) => {
				item.ownFlag = 1;
				return item;
			})
		}else {
			item.communities.map((item,index) => {
				item.ownFlag = 0;
				return item;
			})
		}


	}
	//社区点击全选
	// allSelectC = () => {
  //   var _this = this;
  //   var id = [];
  //   let {comList}=this.state;
  //   var list;
  //   _this.setState({
  //     allCheckC:!_this.state.allCheckC,
  //   },function(){
  //     console.log("trueOrfalse",_this.state.allCheckC);
  //     if (_this.state.allCheckC) {
  //       list=comList.map((item, index) => {
  //             item.ownFlag = 1;
  //             return item;
  //         })
  //       } else {
  //         list=comList.map((item, index) => {
  //               item.ownFlag = 0;
  //               return item;
  //         })
  //      }
  //      this.setState({
  //        comList:list
  //      })
  //   })
	// }
	checked=(item,itemC,index)=>{
		var _this = this;
		let {cityList} = this.state;
		const {detail} = this.props;
		var checked = [];

		if(itemC.ownFlag==0){
			itemC.ownFlag=1;
		}else{
			itemC.ownFlag=0;
		}
		console.log("dasfs",itemC);
		this.id = item.id;
		// item.communities.map((itemA, index) => {
		// 	checked.push(itemA.ownFlag);
		// })
		// if (checked.indexOf(0) == -1) {
		// 	item.flag = 1;
		// } else {
		// 	item.flag = 0;
		// }
		// Store.dispatch(Actions.callAPI('findCommunityList',{
		// 	userId:detail.id,
		// 	cityId:this.id
		// })).then(function(response){
		// 	_this.setState({
		// 		comList: response.communityList,
		// 	});
		// })
	}
// //该做社区全选功能了
// 	checkedC=(item,index)=>{
// 		let {comList} = this.state;
// 		var checked = [];
// 		if(item.ownFlag==0){
// 			item.ownFlag=1;
// 		}else{
// 			item.ownFlag=0;
// 		}
// 		console.log(this.state.comList);
// 		comList.map((item, index) => {
// 			checked.push(item.ownFlag);
// 		})
// 		if (checked.indexOf(0) == -1) {
// 			this.setState({
// 				allCheckC:true,
// 			})
// 		} else {
// 			this.setState({
// 				allCheckC:false,
// 			})
// 		}
// 	}
	renderData=(item,index)=>{
		return (
			<div key={index}>
				<div style={{display:'block',textAlign:'left',lineHeigitemht:'32px',color:'#333'}}
					 		onClick={this.checked.bind(this,item,index)}
					>
						{item.name}
						<Checkbox label="全选" style={{color:'#333',display:'block'}} checked={item.ownFlag==1?true:false} onCheck={this.allSelect.bind(this,item)}/>
						{item.communities.map((itemC,index)=>{return (
								<div style={{display:'inline-block',lineHeight:'32px'}} key={index}>
									<Checkbox
											style={{display:'inline-block',color:'#333'}}
											label={itemC.communityName}
											checked={itemC.ownFlag==1?true:false}
											onCheck={this.checked.bind(this,item,itemC,index)}
									/>
								</div>

							)
						 })
						}
				</div>
			</div>
		);
	}
	//ing
	onSubmit = () => {
		let {comList} = this.state;
		const {detail} = this.props;
		var idList = [];
		comList.map((item, index) => {
			if(item.ownFlag==1){
				idList.push(item.id);
			}
		})
		console.log("idList",idList);
		Store.dispatch(Actions.callAPI('editUserRole', {}, {
			id:detail.id,
			roleIds:idList
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
	allSelect=()=>{
	  console.log(111);
	  this.setState({
	    citySelect:!this.state.citySelect,
	  })
	}

	render(){
		let {cityList} = this.state;
		return(
			<div className="g-DataPermission">
          <div className="leftSec">
            <Checkbox label="全选" style={{color:'#333',display:'block'}} checked={this.state.allCheck} onCheck={this.allSelect}/>
						{cityList.map((item,index)=>{return this.renderData(item,index)})}
          </div>
				{/*
					<div>
							<Checkbox label="全选" style={{color:'#333'}} checked={this.state.allCheckC} onCheck={this.allSelectC}/>
							{comList.map((item,index)=>{return this.renderDataC(item,index)})}
						</div>
				*/}
					<ListGroup>
                <ListGroupItem style={{
                    paddingLeft: 110,
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
