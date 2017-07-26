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
      dimension:[],
      openEdit:false,
			openCreate:false,  
      itemDetail:{},
      addLastLineDim:false,
      addLastLineDimArr:[],
    }
	}

  componentDidMount() {
    this.updateData();
    //this.renderAddWhite();
  }
  // renderAddWhite=()=>{
  //   var that = this;
  //   var width = this.refs.main.getBoundingClientRect().width*0.94;
  //   var num = Math.floor(width/200);
  //   window.setTimeout(function(){
  //     that.lastLineDimNum = num-1-that.dimLength%num;
  //     if (that.lastLineDimNum) {
  //       that.setState({
  //         addLastLineDim:true
  //       })
  //     }
  //   },500)
  // }
  openEdit=(item)=>{
		let openEdit = this.state.openEdit;
		var _this = this;
		this.setState({
			itemDetail:item,
			openEdit:!openEdit
		})
	}
	openCreate=()=>{
		let openCreate = this.state.openCreate;
		var _this = this;
		this.setState({
			openCreate:!openCreate,
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
      <div onClick={() =>{
          this.toLabour(item)
        }} className="item" key={index} style={style}>
        <span className="item-edit" onClick={(event)=>{
            event.stopPropagation();
            this.openEdit(item)
          }}>
          
        </span>
        <span className="item-text">
          {item.name}
        </span>
      </div>
    )
  }
  onNewCreateSubmit=(data)=> {
        var _this = this;   
        Http.request('dim-save', {}, data).then(function(response) {
            _this.updateData();
            Message.success('新建维度成功');
            _this.openCreate();
        }).catch(function(err) {
            Message.error(err.message);
        });
    }
    onNewEditSubmit = (form) => {
        var form = Object.assign({},form);
        var _this = this;
        Http.request('dim-update', {}, form).then(function(response) {
            _this.updateData();
            Message.success('修改成功');
            _this.openEdit();
        }).catch(function(err) {
            Message.error(err.message);
        });
    }
    updateData=()=>{
          var that = this;
          Http.request('dim-list', {
          },{}).then(function(response) {
              that.dimLength = response.items.length;
              renderAddWhite();
              that.setState({dimension: response.items})
              function renderAddWhite() {
                  var width = that.refs.main.getBoundingClientRect().width*0.94;
                  var num = Math.floor(width/200);
                    that.lastLineDimNum = num-1-that.dimLength%num;
                    if (that.lastLineDimNum) {
                     that.addLastLineDim();
                    }
              }
          }).catch(function(err) {});
  }
  toLabour=(item)=>{
    var dimId = item.id;
    window.open(`./#/oa/organization/${dimId}/labour`, dimId);
  }
  addLastLineDim=()=>{
    console.log("afdafds",this.lastLineDimNum);
    var arr = [];
    for (var i=0;i<this.lastLineDimNum;i++) {
      arr.push({i})
    }
    this.setState({
      addLastLineDimArr:arr,
    })
   
  }
  renderAddDim=(item,index)=>{
    
    return(
      <div className="item" key={index}>

      </div>
    )
  }
  render() {
    console.log(this.state.addLastLineDimArr);
    //console.log(this.state.addLastLineDim);
    console.log("render",this.lastLineDimNum);
    return (
      <div className="g-oa">
        <Section title="机构维度">
        			<div className="main" ref="main">
                {this.state.dimension.map((item,index)=>{
                  return this.renderDimension(item,index);
                })}
                <div className="item-add item" onClick={this.openCreate}>
                 
                </div>
                {this.state.addLastLineDimArr.map((item,index)=>{
                  return this.renderAddDim(item,index);
                })}
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
