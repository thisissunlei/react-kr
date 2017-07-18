import React, {
	Component,
	PropTypes
} from 'react';
import {
	KrField,
	Button,
	Section,
	Grid,
	Row,
	Col,
	ListGroupItem,
	ListGroup,
	Dialog,
	SearchForms,
	KrDate,
	Drawer,
	Message
} from 'kr-ui';
import {
	Http
} from "kr/Utils";
import './index.less';
import CreateDialog from './CreateDialog';
import EditDialog from './EditDialog';

export default class Home extends React.Component {

	constructor(props,context){
		super(props, context);
    this.state={
      dimension:[{name:'name1'},{name:'name2'},{name:'name3'},{name:'name4'},{name:'name5'},{name:'name6'},{name:'name7'}],
      openEdit:false,
			openCreate:false,  
      itemDetail:{},
    }
	}

  componentDidMount() {
    this.updateData();
  }
  openEdit=(item)=>{
		let openEdit = this.state.openEdit;
		var _this = this;
    console.log(item);
		this.setState({
			itemDetail:item,
			openEdit:!openEdit
		})
	}
	openCreate=()=>{
		let openCreate = this.state.openCreate;
		var _this = this;
		this.setState({
			openCreate:!openCreate
		})
	}
  renderDimension=(item,index)=>{
    var imageNum = (index+1)%6;
    if (imageNum == 0){
      imageNum = 6;
    }
    var style = {
      'background':'url('+require("./images/b"+imageNum+".svg")+') no-repeat center'
    };
    return (
      <div className="item" key={index} style={style}>
        <span className="item-edit" onClick={this.openEdit.bind(this,item)}>
          
        </span>
        <span className="item-text">
          {item.name}
        </span>
      </div>
    )
  }
  onNewCreateSubmit=(form)=> {
        var form = Object.assign({},form);
        var _this = this;   
        // Http.request('createSsoUser', {}, form).then(function(response) {
        //     Message.success('新建机构成功');
        //     _this.openCreate();
        // }).catch(function(err) {
        //     Message.error(err.message);
        // });
    }
    onNewEditSubmit = (form) => {
        var form = Object.assign({},form);
        var _this = this;
        // Http.request('editSsoUser', {}, form).then(function(response) {
        //     Message.success('修改成功');
        //     _this.openEdit();
        // }).catch(function(err) {
        //     Message.error(err.message);
        // });
    }
    updateData=()=>{
		    var _this = this;
        // Http.request('get-menu-list', {

        // },{}).then(function(response) {
        //     _this.setState({dimension: response.items},function(){
      
        //     })
        // }).catch(function(err) {});
	}
updateData=()=>{
		  var _this = this;
			// Http.request('dim-list', {

      // },{}).then(function(response) {
      //     _this.setState({dimension: response.items},function(){
    
      //     })
      // }).catch(function(err) {});
    
	}
  render() {


    return (
      <div className="g-oa">
        <Section title="机构维度">
        			<div className="main">
                {this.state.dimension.map((item,index)=>{
                  return this.renderDimension(item,index);
                })}
                <div className="item-add item" onClick={this.openCreate}>
                 
                </div>
              </div>
        </Section>
        <Dialog 
                title="新建机构维度" 
                modal={true} 
                open={this.state.openCreate} 
                onClose={this.openCreate} 
                contentStyle={{
                    width: 374
                }}
        >
                <CreateDialog onSubmit={this.onNewCreateSubmit} onCancel={this.openCreate} />
        </Dialog>
        <Dialog 
                title="编辑机构维度" 
                modal={true} 
                open={this.state.openEdit} 
                onClose={this.openEdit} 
                contentStyle={{
                    width: 374
                }}
        >
                <EditDialog detail={this.state.itemDetail} onSubmit={this.onNewEditSubmit} onCancel={this.openEdit} />
        </Dialog>
      </div>
    );
  }
}
