import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup
} from 'kr-ui';

// import './index.less';

class Switchover extends Component{
	constructor(props) {
		super(props);
    this.state={
			allData:this.props.allData,
			okData:this.props.okData,
    }
  }

  rightAdd(value){
		var _this=this;
    var arr=this.state.okData;
    arr.push(value);
    this.setState({okData:arr},function(){
			_this.props.changeMudle(_this.state.okData)

		});
  }
  leftAdd(value){
		var _this=this;
    var arr=this.state.allData;
    console.log(arr)
    arr.push(value);
    this.setState({allData:arr},function(){
			_this.props.changeMudle(_this.state.okData)
		});
  }
	//数组的状态
	swapItems =(arr, index1, index2)=> {

			var _this=this;
       arr[index1] = arr.splice(index2, 1, arr[index1])[0];
       this.setState({okData:arr},function(){
	 			_this.props.changeMudle(_this.state.okData)
	 		});
   }




  render(){
		var boxStyle={
			marginLeft:"10px",
			width:"auto",
			display:"inline-block",
			position:"relative",
			marginBottom:"15px"
		}
    var moddleStyle={
      display:"inline-block",
      width:"40px",
			height:"48px",
			float:"left",
			marginTop:"101px",



    }

    return (
      <div style={boxStyle}>
          <ZhuanHuan  iconShow="false"
                      Data={this.state.allData}
                      addOther={this.rightAdd.bind(this)}

          />
          <div className="ui-moveIcon" style={moddleStyle}>

          </div>
          <ZhuanHuan  iconShow="true"
                      Data={this.state.okData}
                      addOther={this.leftAdd.bind(this)}
											swapItems={this.swapItems}
                      />
      </div>
    );

  }
}



class ZhuanHuan extends React.Component{
	constructor(props) {
		super(props);
    this.state={
			mouldSort:this.props.Data
    }
  }

  swapItems (arr, index1, index2) {
		console.log(this);

       arr[index1] = arr.splice(index2, 1, arr[index1])[0];
       this.setState({mouldSort:arr});
   }
	 //上移
  upMove=(index,event)=>{
    if(index==0){
      return;
    }
     this.props.swapItems(this.state.mouldSort, index, index- 1);


  }
  //下移
  downMove=(index,event)=>{
    if(index == this.state.mouldSort.length -1) {
           return;
       }
			 this.props.swapItems(this.state.mouldSort, index, index + 1);
  }
  upArrow(index){
    return index>0?true:false;
  }
  downArrow(index){
    return index<this.state.mouldSort.length-1?true:false;
  }
  //点击删除
  removeMould(_this,arr,index){

    var remove=arr.splice(index,1)[0];
    _this.setState({mouldSort:arr});

    _this.props.addOther(remove);
  }

  render(){
    var _this=this;
    var boxStyle={
      border:"1px solid #dfdfdf",
      width:"252px",
			float:"left",
      height:"250px",
			lineHeight:"26px",
      display:'inline-block',
      overflow:"auto",
			borderRadius:"3px",
    }
    var arr=this.state.mouldSort.map(function(item,index){
      var j=index;

      return <KrMould
                        upMoves={

                          function(event,index){

                             _this.upMove(j);
                             event.stopPropagation();


                           }
                        }



                        downMove={
                          function(event,index){

                             _this.downMove(j);

                             event.stopPropagation();

                           }
                        }
                        iconShow={_this.props.iconShow}
                        upShow={_this.upArrow(index)}
                        downShow={_this.downArrow(index)}
                        text={item.templateName}
                        onClick={_this.removeMould.bind(this,_this,_this.state.mouldSort,index)}
                        />
    })


    return (
      <div style={boxStyle}>
          {arr}
      </div>

    )
  }
}




 /**
  * 模板条组件
  * @return {[type]} [description]
  */
  class KrMould extends Component{
    render(){
      var upShow,downShow;

      if(this.props.iconShow=="false"){
        upShow="hidden";
        downShow="hidden";
      }
      if (this.props.iconShow=="true") {
        upShow=this.props.upShow==true?"visible":"hidden";
        downShow=this.props.downShow==true?"visible":"hidden";
      }
      var contentStyle={
          width:"100%",
          height:"26px",
          lineHeight:"26px",
          paddingLeft:"10px",
          cursor:"pointer",
          fontSize:"14px",
          color:"#666666",
          boxSizing:"border-box",
      }
      //上移箭头的样式
      var upStyle={
        display:"inline-block",
        cursor:"pointer",
				width:"10px",
        float:"right",
				height:"26px",
        marginRight:"30px",
        visibility:upShow
      }
      //下移箭头的样式
      var downShow={
        cursor:"pointer",
        float:"right",
				height:"26px",
				width:"10px",
        marginRight:"30px",

        visibility:downShow
      }

      return(
        <div className="ui-groupMould " style={contentStyle} onClick={this.props.onClick}>
          <span >{this.props.text}</span>
          <span className="ui-iconDown" onClick={this.props.downMove} style={downShow}></span>
          <span className="ui-iconUp"  onClick={this.props.upMoves} style={upStyle}></span>

        </div>)
    }

  }



 class NewCreateForm extends Component{

	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
		 detail:React.PropTypes.object,
	 }

	constructor(props){
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.state={
			detail:this.props.detail
		}


		Store.dispatch(initialize('newCreateForm',this.props.detail));

	}

	 onSubmit(values){
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	 }

	 onCancel(){
		 const {onCancel} = this.props;
		onCancel && onCancel();
	 }

	 //分组名实时校验
	 groupNameCheck=(values)=>{
		 var _this=this;
		 values=this.Trim(values);
		 Store.dispatch(Actions.callAPI('groupNameCheck',{groupName:values,id:this.props.detail.id})).then(function(data) {

		 }).catch(function(err) {
			 Notify.show([{
				 message: err.message,
				 type: 'danger',
			 }]);
		 });
	 }

	 //排序实时校验
	 sortCheck=(values)=>{

		 var _this=this;
		 values=this.Trim(values);
		 Store.dispatch(Actions.callAPI('sortCheck',{sort:values,id:this.props.detail.id})).then(function(data) {

		 }).catch(function(err) {
			 Notify.show([{
				 message: err.message,
				 type: 'danger',
			 }]);
		 });

	 }
	 //去除前后空格
	Trim=(str)=>{
				str=str.toString();
					return str.replace(/(^\s*)|(\s*$)/g, "");
				}

	render(){
		const { error, handleSubmit, pristine, reset} = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>

				<KrField name="id" type="hidden" label="id"/>
				<KrField grid={1/2} style={{marginTop:25}} right={25} name="groupName" type="text" label="分组名称" requireLabel={true} onBlur={this.groupNameCheck}/>
				<KrField grid={1/2} right={25} name="sort" type="text" label="排序" requireLabel={true} style={{marginTop:25}} onBlur={this.sortCheck}/>
				<KrField grid={1} name="enable" component="group" label="启用状态" requireLabel={true}>
					<KrField name="enable" label="是" component="radio" type="radio" value="ENABLE"/>
						<KrField name="enable" label="否"  component="radio"  type="radio" value="DISABLE" />
				</KrField>
				<KrField grid={1/2} label="数据模板" requireLabel={true} component="labelText"/>
				<Switchover allData={this.state.detail.unselectedList} okData={this.state.detail.templateList} changeMudle={this.props.changeMudle}/>

			<KrField style={{width:558}} name="groupDesc" component="textarea" label="分组描述"  />

				<Grid style={{marginTop:0,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
		</form>
		);
	}
}
const validate = values =>{

		const errors = {}

		if(!values.accountcode){
			errors.accountcode = '请填写分组名称';
		}

		if (!values.sort) {
			errors.sort = '请填写排序号';
		}else if(isNaN(+values.sort)){
			errors.sort = '请输入数字';
		}else if(+values.sort<=0){
			errors.sort = '请输入正整数';
		}

		if (!values.accounttype) {
			errors.accounttype = '请填写科目类别';
		}

		if (!values.ordernum) {
			errors.ordernum = '请填写排序号';
		}
		if (!values.enableflag) {
			errors.enableflag = '请先选择是否启用';
		}


		return errors
	}
const selector = formValueSelector('newCreateForm');



export default reduxForm({ form: 'newCreateForm', validate,enableReinitialize:true, keepDirtyOnReinitialize:true })(NewCreateForm);
