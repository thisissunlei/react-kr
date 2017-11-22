import React from 'react';
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
import { FromsConfig} from "kr/PureComponents";
import './index.less';
import DeleteDialog from './DeleteDialog';
import FirstMenu from './FirstMenu';
import { data } from "./config";
export default class NewOffice extends React.Component {

	constructor(props,context){
		super(props, context);
    this.state={
        thingsType:[],
        newThings:[],
        openDelete:false,
        openNew:false,
        detail:[],
        introData:''
    }
    this.newSubmitData = {};
    this.name = '';
	}

  componentDidMount() {
    this.updateData();
  }
  //渲染色块
  renderThingsType=(item,index)=>{
    var imageNum = (index+1)%7;
    if (imageNum == 0){
      imageNum = 7;
    }
    if (item) {

      return (
          <div 
            onClick={()=>{
              this.toHz(item)
            }} 
            className="item" 
            key={index}
          >
            <span className={`top-circle class-${imageNum}`} >
              <span>{item.name.substring(0,2)}</span>
            </span>
            <span className="item-text">
              {item.name}
            </span>
            <span className="close" 
              onClick={(event)=>{
                  event.stopPropagation();
                  this.toDelete(item)
              }}
            >

            </span>
          </div>
      )
    }
              
  }
  //获取表单模板的数据
  getTemplateData = (itemData,type) =>{
    var id=''
    if(type=='new'){
      id=itemData.id;
    }else{
      id=itemData.wfId;
    }
    let _this = this;
    Http.request('get-config-template-edit', { wfId:id}).then(function (response) {
      _this.swidthNew();
      _this.newSubmitData = {
        formId: itemData.formId,
        wfName: itemData.name,
        wfId:id,
        printed:response.printed
      }
      _this.setState({
        detail: response.tables,
        introData:response.comment?response.comment:''
      })
    }).catch(function (err) { 
      Message.error(err.message);
    });
  }
  leftClick = (item) =>{
    this.name = item.name;
    this.getTemplateData(item,'new');
  }
  renderNewThings=(item,index)=>{
    return (
        <FirstMenu key={index} detail={item} leftClick = {this.leftClick} onSubmit={this.updateData}/>
    )
  }
  toHz=(item)=>{
   
    this.name = item.name;
    this.getTemplateData(item);
    if(item.click){
      //window.open(`${item.hzUrl}`);
    }
  }
  //移除部分
  openDelete=()=>{
    this.setState({
      openDelete:!this.state.openDelete,
    })
  }
  toDelete=(item)=>{
      var _this = this;
      Http.request('office-new-delete', {
      },{myCommonId:item.id}).then(function(response) {
          _this.updateData();
        Message.success('删除成功');
      }).catch(function(err) {
        Message.error(err.message);
      });
  }
  swidthNew = () =>{
    
    let {openNew} = this.state;
    this.setState({
      openNew: !openNew
    })
  }
  updateData=()=>{
		    var _this = this;
        Http.request('process-common', {}).then(function(response) {
              _this.setState({thingsType: response.items.slice(0,6)},function(){
              })
        }).catch(function(err) {});
        Http.request('process-new-request', {
            }).then(function(response) {
              _this.setState({newThings: response.items},function(){
        
              })
            }).catch(function(err) {
              Message.error(err.message);
            });
    
  }
  //新建页面提交
  onSubmit = (values) =>{
    var _this = this;
    var params = Object.assign({}, this.newSubmitData);
    params.dataJson = JSON.stringify(values);
    Http.request('post-config-detail-new', {}, params).then(function (response) {
      _this.swidthNew();
      Message.success('保存成功');
    }).catch(function (err) { 
      Message.error(err.message);
    });
    
    
  }
  render() {
    const { detail,introData} = this.state;
   
    return (
      <div className="g-deal-newthings">
        <Section borderBool={false} title="我的常用">
            <div className="first-main">
                {this.state.thingsType.length?this.state.thingsType.map((item,index)=>{
                    return this.renderThingsType(item,index)
                }):
                  <div className="null-image">
                    
                   </div>
                }

            </div>
            
        </Section>
        <Section borderBool={false} title="新办事宜">
            <div className="second-main">
                {this.state.newThings.map((item,index)=>{
                    return this.renderNewThings(item,index)
                })}
            </div>
        </Section>
        <Dialog 
                title="新建机构维度" 
                modal={true} 
                open={this.state.openDelete} 
                onClose={this.openDelete} 
                contentStyle={{
                    width: 374
                }}
        >
                <DeleteDialog onSubmit={this.onDeleteSubmit} onCancel={this.openDelete} />
        </Dialog>
        <Drawer
            title="新建"
            modal={true}
            open={this.state.openNew}
            onClose={this.swidthNew}
            width = {750}
            containerStyle={{ top: 60, paddingBottom: 228, zIndex: 20 }}
        >
          <FromsConfig title={`${this.name}-新建`} detail={detail} introData={introData} onSubmit={this.onSubmit} onCancel={this.swidthNew} />
        </Drawer>
      </div>
    );
  }
}
