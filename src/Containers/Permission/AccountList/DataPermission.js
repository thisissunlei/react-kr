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
			allCheck:false,
			allCheckC:false,
			idList:[],
			cityList:[],
			comList:[],
    };
		this.onCancel = this.onCancel.bind(this);
	}
  componentDidMount() {
			this.getInfo();
  }
	getInfo=()=>{
			var _this = this;
			Store.dispatch(Actions.callAPI('findCityList',{})).then(function(response){
			  _this.setState({
					cityList: response.cityList,
				});
			})
	}
	//点击全选
	allSelect = () => {
    var _this = this;
    var id = [];
    let {cityList}=this.state;
    var list;
    _this.setState({
      allCheck:!_this.state.allCheck,
    },function(){
      console.log("trueOrfalse",_this.state.allCheck);
      if (_this.state.allCheck) {
        list=cityList.map((item, index) => {
              item.ownFlag = 1;
              return item;
          })
        } else {
          list=cityList.map((item, index) => {
                item.ownFlag = 0;
                return item;
          })
       }
       this.setState({
         cityList:list
       })
    })
	}
	//社区点击全选
	allSelectC = () => {
    var _this = this;
    var id = [];
    let {comList}=this.state;
    var list;
    _this.setState({
      allCheckC:!_this.state.allCheckC,
    },function(){
      console.log("trueOrfalse",_this.state.allCheckC);
      if (_this.state.allCheckC) {
        list=comList.map((item, index) => {
              item.ownFlag = 1;
              return item;
          })
        } else {
          list=comList.map((item, index) => {
                item.ownFlag = 0;
                return item;
          })
       }
       this.setState({
         comList:list
       })
    })
	}
	checked=(item,index)=>{
		var _this = this;
		let {cityList} = this.state;
		const {detail} = this.props;
		var checked = [];
		if(item.ownFlag==0){
			item.ownFlag=1;
		}else{
			item.ownFlag=0;
		}
		this.id = item.id;
		cityList.map((item, index) => {
			checked.push(item.ownFlag);
		})
		if (checked.indexOf(0) == -1) {
			this.setState({
				allCheck:true,
			})
		} else {
			this.setState({
				allCheck:false,
			})
		}
		console.log(detail.id,this.id);
		Store.dispatch(Actions.callAPI('findCommunityList',{
			userId:detail.id,
			cityId:this.id
		})).then(function(response){
			_this.setState({
				comList: response.communityList,
			});
		})
	}
//该做社区全选功能了
	checkedC=(item,index)=>{
		let {comList} = this.state;
		var checked = [];
		if(item.ownFlag==0){
			item.ownFlag=1;
		}else{
			item.ownFlag=0;
		}
		console.log(this.state.comList);
		comList.map((item, index) => {
			checked.push(item.ownFlag);
		})
		if (checked.indexOf(0) == -1) {
			this.setState({
				allCheckC:true,
			})
		} else {
			this.setState({
				allCheckC:false,
			})
		}
	}
	renderData=(item,index)=>{
		return (
			<div key={index}>
				<Checkbox
						style={{display:'block',textAlign:'left',lineHeigitemht:'32px',color:'#333'}}
						label={item.name}
						onCheck={this.checked.bind(this,item,index)}
				/>
			</div>
		);
	}
	renderDataC=(item,index)=>{
		console.log(item);
		return (
			<div key={index}>
				<Checkbox
						style={{display:'block',textAlign:'left',lineHeigitemht:'32px',color:'#333'}}
						label={item.communityName}
						checked={item.ownFlag==1?true:false}
						onCheck={this.checkedC.bind(this,item,index)}
				/>
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
		let {comList} = this.state;
		return(
			<div className="g-DataPermission">
          <div className="leftSec">
            <Checkbox label="全选" style={{color:'#333'}} checked={this.state.allCheck} onCheck={this.allSelect}/>
						{cityList.map((item,index)=>{return this.renderData(item,index)})}
          </div>
					<div className="rightSec">
						<Checkbox label="全选" style={{color:'#333'}} checked={this.state.allCheckC} onCheck={this.allSelectC}/>
						{comList.map((item,index)=>{return this.renderDataC(item,index)})}
					</div>
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
