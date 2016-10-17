import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {bindActionCreators} from 'redux';
import {reduxForm,formValueSelector,change} from 'redux-form';
import * as actionCreators from 'kr-ui/../Redux/Actions';

import {Actions,Store} from 'kr/Redux';

import {
Dialog,
Snackbar,
  Table, 
  TableBody, 
  TableHeader, 
  TableHeaderColumn, 
  TableRow, 
  TableRowColumn,
  TableFooter,
  Section,
  KrField,
  LabelText,
  Grid,
  Row,
  Col,
  Button,
  BreadCrumbs,
  Loading,
  Notify
} from 'kr-ui';


let SettingCreateForm = function(props){

  	const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,cityName,onCancel} = props;

	return (

<form onSubmit={handleSubmit(onSubmit)}>

			<KrField name="dicName" type="text" component="input" label="字段名称" />  
       <KrField name="enableFlag" component="group" label="是否有效">
					<KrField name="enableFlag" label="是" type="radio" value="1"/>
					<KrField name="enableFlag" label="否" type="radio" value="0" />
              </KrField>
		 <KrField name="remark" type="textarea" label="备注"  placeholder="备注信息"/> 

        <Grid style={{marginTop:30}}>
          <Row>
            <Col md={8}></Col>
            <Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
            <Col md={2}> <Button  label="取消" type="button" onTouchTap={onCancel} /> </Col>
          </Row>
        </Grid>
    </form>
	);
}

SettingCreateForm= reduxForm({
  form: 'settingCreateForm',
})(SettingCreateForm);

const SettingViewForm = (props)=>{
	const {items} = props;
  return (
    <div>
        
        <KrField name="corporationName" component="labelText"  label="字段名称" value={items.sp.dicName}/> 
        <KrField name="enableflag" component="labelText"  label="是否有效" value={items.sp.enableFlag?'是':'否'}/> 
        <KrField name="corporationDesc" component="labelText" label="备注" value={items.sp.remark}/> 
  </div>
  );
}

const SettingChildViewForm = (props)=>{
  const {items} = props;
  return (
    <div>
        
        <KrField name="corporationName" component="labelText"  label="字段名称" value={items.dicName}/> 
        <KrField name="enableflag" component="labelText"  label="是否有效" value={items.enableFlag?'是':'否'}/> 
        <KrField name="corporationDesc" component="labelText" label="备注" value={items.remark}/> 
  </div>
  );
} 



let SettingUpdateForm = function(props){
    
    const { items,error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,onCancel} = props;
  
  return (

      <form onSubmit={handleSubmit(onSubmit)}>
              <KrField name="id" type="hidden" label="id"  /> 
              <KrField name="dicName" type="text" component="input" label="字段名称"  /> 
              <KrField name="enableFlag" component="group" label="是否有效" >
                <KrField name="enableFlag" label="是" component="radio" type="radio" value={true}/>
                <KrField name="enableFlag" label="否" component="radio" type="radio" value={false} />
              </KrField>
               <KrField name="remark" component="textarea" label="备注"  placeholder="备注信息"/> 
              <Grid style={{marginTop:30}}>
                <Row style={{marginTop:30}}>
                <Col md={8}></Col>
                <Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
                <Col md={2}> <Button  label="取消" type="button"  onTouchTap={onCancel}  /> </Col>
                </Row>
              </Grid>
        </form>
  );
}
 
 SettingUpdateForm= reduxForm({
  form: 'settingUpdateForm',
})(SettingUpdateForm);

let SettingChildUpdateForm = function(props){
    console.log(props)
    const { items,error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,onCancel} = props;
  
  return (

      <form onSubmit={handleSubmit(onSubmit)}>
              <KrField name="id" type="hidden" label="id"  /> 
              <KrField name="dicName" type="text" component="input" label="字段名称"  /> 
              <KrField name="enableflag" component="group" label="是否有效">
                <KrField name="enableflag" label="是" component="radio" type='radio' value={true}/>
                <KrField name="enableflag" label="否" component="radio"  type='radio'  value={false} />
              </KrField>
               <KrField name="remark" component="textarea" label="备注"  placeholder="备注信息"/> 
              <Grid style={{marginTop:30}}>
                <Row style={{marginTop:30}}>
                <Col md={8}></Col>
                <Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
                <Col md={2}> <Button  label="取消" type="button"  onTouchTap={onCancel}  /> </Col>
                </Row>
              </Grid>
        </form>
  );
}
 
 SettingChildUpdateForm= reduxForm({
  form: 'settingChildUpdateForm',
})(SettingChildUpdateForm);

let SettingAddForm = function(props){

    const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,onCancel} = props;

  return (

      <form onSubmit={handleSubmit(onSubmit)}>
              <KrField name="id" type="hidden" label="id"  /> 
              <KrField name="dicName" type="text" label="字段名称"  />
              <KrField name="round" type="text" label="拆分周期"  /> 
              <KrField name="enableflag" component="group" label="是否有效">
                <KrField name="enableflag" label="是" type="radio" value="1"/>
                <KrField name="enableflag" label="否" type="radio" value="0" />
              </KrField>
               <KrField name="remark" component="textarea" label="备注"  placeholder="备注信息"/> 
              <Grid style={{marginTop:30}}>
                <Row style={{marginTop:30}}>
                <Col md={8}></Col>
                <Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
                <Col md={2}> <Button  label="取消" type="button"  onTouchTap={onCancel}  /> </Col>
                </Row>
              </Grid>
        </form>
  );
}
 
 SettingAddForm= reduxForm({
  form: 'settingAddForm',
})(SettingAddForm);






export default class SettingList extends Component {

  constructor(props,context){
    super(props, context);

    this.confirmSubmit = this.confirmSubmit.bind(this);
    
    this.confirmUpdateSubmit=this.confirmUpdateSubmit.bind(this);
    this.openCreateDialog = this.openCreateDialog.bind(this);
    this.renderCustomerItem = this.renderCustomerItem.bind(this);
    this.confirmUpdateChildSubmit =this.confirmUpdateChildSubmit.bind(this);

    this.openUpdateDialog = this.openUpdateDialog.bind(this);
    this.getListData = this.getListData.bind(this);
    this.openAddDialog=this.openAddDialog.bind(this);
    this.openViewDialog=this.openViewDialog.bind(this);

    this.renderItemChild = this.renderItemChild.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.openUpdateChildDialog = this.openUpdateChildDialog.bind(this);
    this.openViewChildDialog=this.openViewChildDialog.bind(this);

    this.state = {
      open:false,
      openCreate:false,
      openView:false,
      openUpdate:false,
      openChildView:false,
      openChildUpdate:false,
      openAdddate:false,
      
    }

    this.getListData();

  }

	componentDidMount(){

		var _this = this;

		Store.dispatch(Actions.callAPI('sysDicPaymentList')).then(function(response){
        console.log('-----response----',response)
			_this.setState({
				items:response
			});

		}).catch(function(err){

      console.log('---err',err);
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		});

	}


  getListData(){
    var {actions} = this.props;
    var _this = this;
  }


  confirmSubmit(values){

    Store.dispatch(Actions.callAPI('addSysDicPayment',{},values)).then(function(response){
       Notify.show([{
        message:'创建成功!',
        type: 'success',
      }]);
    }).catch(function(err){
        Notify.show([{
        message:err.message,
        type: 'danger',
      }]);
      console.log(err.message)
    })
    this.openCreateDialog();
    
      window.setTimeout(function(){
        window.location.reload();
      },1000);


  }

  confirmUpdateSubmit(values){

    Store.dispatch(Actions.callAPI('editSysDicPayment',{},values)).then(function(response){
       Notify.show([{
        message:'编辑成功!',
        type: 'success',
      }]);
    }).catch(function(err){
        Notify.show([{
        message:err.message,
        type: 'danger',
      }]);
    });

    this.openUpdateDialog();


    window.setTimeout(function(){
        window.location.reload();
      },1000);

      

  }
  confirmUpdateChildSubmit(values){
     Store.dispatch(Actions.callAPI('editSysDicPayment',{},values)).then(function(response){
       Notify.show([{
        message:'编辑成功!',
        type: 'success',
      }]);
    }).catch(function(err){
        Notify.show([{
        message:err.message,
        type: 'danger',
      }]);
    });
    this.openUpdateChildDialog();
    window.setTimeout(function(){
        window.location.reload();
      },1000);
  }


 openViewChildDialog(item){
    
    console.log('list-----',item)
    this.setState({
      item:item,
      openChildView:!this.state.openChildView
    });

  };
  openUpdateChildDialog(item){
    this.setState({
      openChildUpdate:!this.state.openChildUpdate
    });
   
      Store.dispatch(change('settingChildUpdateForm','id',item.id));
      Store.dispatch(change('settingChildUpdateForm','dicName',item.dicName));
      Store.dispatch(change('settingChildUpdateForm','enableflag',item.enableFlag));
      Store.dispatch(change('settingChildUpdateForm','remark',item.remark));

}
  openAddDialog(){
      this.setState({
      openAdddate:!this.state.openAdddate
    });

  }
  
  openCreateDialog(){

    this.setState({
      openCreate:!this.state.openCreate
    });

  }

 openViewDialog(index){
    const list=this.state.items;
    this.setState({
      item:list[index],
      openView:!this.state.openView
    });

  }

  openUpdateDialog(index){
    const list=this.state.items;
   
    this.setState({
      openUpdate:!this.state.openUpdate
    });
    
      Store.dispatch(change('settingUpdateForm','id',list[index].sp.id));
      Store.dispatch(change('settingUpdateForm','dicName',list[index].sp.dicName));
      Store.dispatch(change('settingUpdateForm','enableFlag',list[index].sp.enableFlag));
      Store.dispatch(change('settingUpdateForm','remark',list[index].sp.remark));
  };

 
  renderItem(item,index){
           return (
             <TableRow key={index}>
          <TableRowColumn>{item.sp.dicName}</TableRowColumn>
            <TableRowColumn>{item.sp.enableFlag?'是':'否'}</TableRowColumn>
            <TableRowColumn>{item.sp.creater}</TableRowColumn>
            <TableRowColumn>{item.sp.createTime}</TableRowColumn>
            <TableRowColumn>{item.sp.remark}</TableRowColumn>
            <TableRowColumn>
            <Button label="查看" type="link"  onClick={this.openViewDialog.bind(this,index)}/>
            <Button label="编辑" type="link"  onClick={this.openUpdateDialog.bind(this,index)}/>
            <Button label="添加子项" type="link"   onClick={this.openAddDialog.bind(this)}/>
          </TableRowColumn>
         </TableRow>
         );
  }
  
  renderItemChild(item,index){
    
   
    if(item.length>0){
        return (
        <TableRow key={index} >
          <TableRowColumn colSpan={9}>
              <Table displayCheckbox={false}>
          <TableHeader>
              <TableHeaderColumn>子项名称</TableHeaderColumn>
              <TableHeaderColumn>是否有效</TableHeaderColumn>
              <TableHeaderColumn>创建人</TableHeaderColumn>
              <TableHeaderColumn>创建时间</TableHeaderColumn>
              <TableHeaderColumn>备注</TableHeaderColumn>
              <TableHeaderColumn>操作</TableHeaderColumn>
          </TableHeader>
          <TableBody>
         {item.map((item,index)=><TableRow key={index}>
              <TableRowColumn>{item.dicName}</TableRowColumn>
              <TableRowColumn>{item.enableFlag?'是':'否'}</TableRowColumn>
              <TableRowColumn>{item.creater}</TableRowColumn>
              <TableRowColumn>{item.createTime}</TableRowColumn>
              <TableRowColumn>{item.remark}</TableRowColumn>
              <TableRowColumn>
                <Button label="查看" type="link"  onClick={this.openViewChildDialog.bind(this,item)}/>
                <Button label="编辑" type="link"  onClick={this.openUpdateChildDialog.bind(this,item)}/>
              </TableRowColumn>
            </TableRow>
         )}
             
           </TableBody>
       </Table>
          </TableRowColumn>

         </TableRow>

      
        );
    }
      

  }
  renderCustomerItem(){

  	let items = this.state.items || [];

  if(!items.length){
    return(
        <TableBody style={{paddingTop:10}} >
                <TableRow displayCheckbox={false} >
                      <TableRowColumn colSpan={8} >
                        <div style={{textAlign:'center',paddingTop:50,paddingBottom:50}}>
                        暂无数据
                        </div>
                      </TableRowColumn>
                </TableRow>
        </TableBody>

      )
      
  }


  let allChildren = [];

  var _this = this;

  items.map(function(item,index){
      allChildren.push(_this.renderItem(item,index));
      allChildren.push(_this.renderItemChild(item.spList,index));
  });

    return (
        <TableBody colSpan={10}>
           {allChildren}  
       </TableBody>
    );



  }



  render() {

    const {communitys} = this.state;
    
    const actions = [
        <Button
        label="关闭"
        primary={true}
         style={{marginLeft:10}}
        onTouchTap={this.openViewDialog.bind(this)}
        />
      ];
  const close=[
        <Button
        label="关闭"
        primary={true}
         style={{marginLeft:10}}
        onTouchTap={this.openViewChildDialog.bind(this)}
        />
      ]
    return (

      <div>

      <BreadCrumbs children={['系统运营','合同信息','基础配置']}/>

      <Section title="客户信息编辑" description=""> 

          <Button label="新建" primary={true} onTouchTap={this.openCreateDialog} />

            <Table style={{marginTop:20}} toggleVisibility="odd" displayCheckbox={false}>
                <TableHeader>
                  <TableHeaderColumn>字段名称</TableHeaderColumn>
                  <TableHeaderColumn>是否有效</TableHeaderColumn>
                  <TableHeaderColumn>创建人</TableHeaderColumn>
                  <TableHeaderColumn>创建时间</TableHeaderColumn>
                  <TableHeaderColumn>备注</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
                </TableHeader>
                {this.renderCustomerItem()}
             </Table>
      </Section>

      <Dialog
        title="新建"
        modal={true}
        open={this.state.openCreate}
      >
        <SettingCreateForm onSubmit={this.confirmSubmit} onCancel={this.openCreateDialog}/>
      </Dialog>

      <Dialog
        title="查看"

        modal={true}
        actions={actions}
        open={this.state.openView}
      >

      <SettingViewForm items={this.state.item}/>

      </Dialog>
      <Dialog
        title="查看子项"

        modal={true}
        actions={close}
        open={this.state.openChildView}
      >

      <SettingChildViewForm items={this.state.item}/>

      </Dialog>
      


       <Dialog
        title="编辑"

        modal={true}
        open={this.state.openUpdate}
     >
      <SettingUpdateForm items={this.state.item} onSubmit={this.confirmUpdateSubmit} onCancel={this.openUpdateDialog} />
      </Dialog>
       <Dialog
        title="编辑子项"

        modal={true}
        open={this.state.openChildUpdate}
     >
      <SettingChildUpdateForm items={this.state.item} onSubmit={this.confirmUpdateChildSubmit} onCancel={this.openUpdateChildDialog} />
      </Dialog>

      <Dialog
        title="添加子项"
        modal={true}
        open={this.state.openAdddate}
     >
      <SettingAddForm  onSubmit={this.confirmSubmit} onCancel={this.openAddDialog}/>
      </Dialog>
      
   </div>
  );
  }
}



