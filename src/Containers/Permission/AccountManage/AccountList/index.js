import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import {connect, Actions, Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import CreateAccount from './CreateAccount';
import DataPermission from './DataPermission';
import SearchForm from './SearchForm';
import EditAccount from './EditAccount';
import SetPermission from './SetPermission';

import {reduxForm, formValueSelector, change} from 'redux-form';
import {
    KrField,
    Table,
    TableBody,
    TableHeader,
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
    ListGroupItem,
    ListGroup,
    SearchForms,
    Dialog,
    Title
} from 'kr-ui';
import './index.less';
import BindMember from './BindMember';

class AccountList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.openDataPermission = this.openDataPermission.bind(this);
        this.onOperation = this.onOperation.bind(this);
        this.state = {
            searchParams: {
                accountName: '',
                page: 1,
                pageSize: 20,
                timer: 1
            },
            newPage:1,
            openNewCreate: false,
            openDataPermission: false,
            openEditAcc: false,
            openSetAcc: false,
            item: {},
            itemDetail: {},
            openCancelMember:false,
            openBindMember:false
        }

    }
    // componentDidMount() {
    // 	var _this = this;
    // 	Store.dispatch(Actions.callAPI('getSsoUserList')).then(function(response) {
    // 		_this.setState({
    // 			item: response,
    // 		},function(){
    // 		});
    // 	}).catch(function(err) {
    // 		Notify.show([{
    // 			message: err.message,
    // 			type: 'danger',
    // 		}]);
    // 	});
    //
    // }
    openNewCreate = () => {
        this.setState({
            openNewCreate: !this.state.openNewCreate
        })
    }
    openEditAcc = (itemDetail) => {
        this.setState({
            openEditAcc: !this.state.openEditAcc,
            itemDetail: itemDetail
        })
    }
    //操作相关
    onOperation = (type, itemDetail) => {

    }

    onNewCreateSubmit=(form)=> {
        var form = Object.assign({},form);
        var _this = this;   
        Http.request('createSsoUser', {}, form).then(function(response) {
            Message.success('新建成功');
            _this.changeP();
            _this.openNewCreate();
        }).catch(function(err) {
            Message.error(err.message);
        });
    }

    onNewCreateCancel() {
        this.openNewCreateDialog();
    }
    openDataPermission = (value) => {
        this.setState({
            itemDetail:value,
            openDataPermission: !this.state.openDataPermission
        });
    }
    //重置
    onReset=(itemDetail)=>{
         var _this = this;
         Http.request('resetPassword', {}, {id: itemDetail.id}).then(function(response) {
                Message.success('重置成功');
               _this.changeP();
            }).catch(function(err) {
                Message.error(err.message);
            });
    }
    //删除
    onDele = (itemDetail)=>{
            var _this = this;
            Http.request('delSsoUser', {id: itemDetail.id}).then(function(response) {
                 Message.success('删除成功');
                 _this.changeP();
            }).catch(function(err) {
                Message.error(err.message);
            });
    }
    //加锁
    onLock=(itemDetail)=>{
        var _this = this;
        Http.request('lockAccount', {}, {id: itemDetail.id}).then(function(response) {
                Message.success('已加锁')
                _this.changeP();
            }).catch(function(err) {
                Message.error(err.message);
            });
    }
    //解锁
    onUnLock=(itemDetail)=>{
        var _this = this;
        Http.request('unlockAccount', {}, {id: itemDetail.id}).then(function(response) {
                Message.success('已解锁')
                _this.changeP();
            }).catch(function(err) {
                Message.error(err.message);
            });
    }
    //搜索
    onSearchSubmit = (value) => {
        let {searchParams} = this.state;
        if (value.filter == 'company') {
            this.setState({
                searchParams: {
                    page: this.state.newPage,
                    pageSize: 20,
                    accountName: value.content
                }
            })
        }
        if (value.filter == 'city') {
            this.setState({
                searchParams: {
                    page: this.state.newPage,
                    pageSize: 20,
                    realName: value.content
                }
            })
        }
        if (value.filter == 'community') {
            this.setState({
                searchParams: {
                    page: this.state.newPage,
                    pageSize: 20,
                    mobilePhone: value.content
                }
            })
        }
        if (value.filter == 'people') {
            this.setState({
                searchParams: {
                    page: this.state.newPage,
                    pageSize: 20,
                    email: value.content
                }
            })
        }
    }
    //授予
    openSetAcc=(itemDetail)=>{
      this.setState({
          itemDetail: itemDetail,
          openSetAcc: !this.state.openSetAcc,
      });
    }
    //改变页码
    changeP=()=>{
        var timer = new Date();
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.timer=timer;
		this.setState({
            searchParams:searchParams,
        })
    }
	onPageChange=(page)=>{
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.page=page;
		this.setState({
            searchParams:searchParams,
        })
    }
    onEditSubmit=()=>{
        this.changeP();
        this.openEditAcc();
    }
    onSetSubimt=()=>{
        this.changeP();
        this.openSetAcc();
    }
    onDataSubimt=()=>{
        this.changeP();
        this.openDataPermission();
        
    }
    openView=(itemDetail)=>{
        window.open(`./#/member/memberManage/list/${itemDetail.uid}`,'_blank');
       
    }
    openCancelMember=()=>{
        this.setState({
            openCancelMember: !this.state.openCancelMember,
        });
    }
    onOpenBindMember=(itemDetail)=>{
        this.setState({
            itemDetail: itemDetail
        });
        this.openBindMember();
    }
    openBindMember=()=>{
        this.setState({
            openBindMember: !this.state.openBindMember,
        });
    }

    openCancelBindMember=(itemDetail)=>{
        this.setState({
            itemDetail: itemDetail
        });
        this.openCancelMember();
    }

    onCancelBindMember=()=>{
        var _this = this;
        let {itemDetail}=this.state;
        let form={
            ssoId:itemDetail.id
        }
        Http.request('remove-member',form).then(function(response) {
            Message.success('解绑会员成功');
            _this.openCancelMember();
            _this.setState({
                searchParams: {
                    accountName: '',
                    page: 1,
                    pageSize: 20,
                    timer: new Date()
                },
            })
        }).catch(function(err) {
            Message.error(err.message);
        });
    }

    onBindMember=(memberId)=>{
        var _this = this;
        let {itemDetail}=this.state; 
        let form={
            ssoId:itemDetail.id,
            uid:memberId
        }  
        Http.request('connect-member',form).then(function(response) {
            Message.success('绑定会员成功');
            _this.openBindMember();
            _this.setState({
                searchParams: {
                    accountName: '',
                    page: 1,
                    pageSize: 20,
                    timer: new Date()
                },
            })
        }).catch(function(err) {
            Message.error(err.message);
        });
    }
    
    goDetail(item){
        this.getPersonId(item);
    }
    getPersonId(item){
        Http.request('get-bill-person-id',{ssoId:item.id}).then(function(response) {
            window.open(`./#/oa/${response}/peopleDetail`,'_blank');
        }).catch(function(err) {
            Message.error(err.message);
        });
    }
    
    render() {
        let {searchParams,itemDetail} = this.state;
        var logFlag = '';
        let options = [
            {
                label: '登录名',
                value: 'company'
            }, {
                label: '姓名',
                value: 'city'
            }, {
                label: '手机号',
                value: 'community'
            }, {
                label: '电子邮箱',
                value: 'people'
            }
        ];
        return (
            <div className="g-account-list">
                <Title value="账号权限-氪空间后台管理系统"/>
                <Section title="账户列表">
                    <Row style={{
                        position: 'relative',
                        zIndex: 5
                    }}>

                        <Col md={10}>
                            <ListGroup>
                                <ListGroupItem style={{
                                    paddingTop: 7,
                                    paddingBottom: 6
                                }}>
                                    {/* <Button label="新建" type="button" operateCode="sso_userList_edit" onClick={this.openNewCreate} width={70} height={26} fontSize={14}/> */}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col align="right" md={2}>
                          <ListGroupItem style={{
                              padding: '7px 0px 6px 17px'
                          }}>

                              <SearchForms onSubmit={this.onSearchSubmit} placeholder='请输入关键字' searchFilter={options}/>
                          </ListGroupItem>
                        </Col>
                    </Row>
                    <Table onPageChange={this.onPageChange} style={{
                        marginTop: 10
                    }} displayCheckbox={false} onLoaded={this.onLoaded} ajax={true} ajaxUrlName='getSsoUserList' ajaxParams={this.state.searchParams} onOperation={this.onOperation} onExport={this.onExport}>
                        <TableHeader>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn style={{width:152}}>登录名</TableHeaderColumn>
                            <TableHeaderColumn>姓名</TableHeaderColumn>
                            <TableHeaderColumn>手机号</TableHeaderColumn>
                            <TableHeaderColumn>电子邮箱</TableHeaderColumn>
                            <TableHeaderColumn>人员角色</TableHeaderColumn>
                            <TableHeaderColumn>会员信息</TableHeaderColumn>
                            <TableHeaderColumn>操作</TableHeaderColumn>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableRowColumn style={{
                                    overflow: 'hidden'
                                }} name="id"></TableRowColumn>
                                <TableRowColumn name="accountName"></TableRowColumn>
                                <TableRowColumn name="name"></TableRowColumn>
                                <TableRowColumn name="phone"></TableRowColumn>
                                <TableRowColumn name="email"></TableRowColumn>
                                <TableRowColumn name="roleTypeName" component={(value,oldValue,itemDetail)=>{
                                        return <span style = {{cursor:"pointer"}} 
                                        onClick = {()=>{
                                            this.goDetail(itemDetail)
                                        }}
                                    >{value}</span>;
                                }}></TableRowColumn>
                                <TableRowColumn name="uid" component={(value,oldValue,itemDetail)=>{
                                    if(value>0){
                                        return(
                                            <div>
                                                <Button label="查看" onClick={this.openView.bind(this,itemDetail)} type="operation" operation="edit"/> 
                                                <Button label="解绑" onClick={this.openCancelBindMember.bind(this,itemDetail)} type="operation" operation="edit"/> 
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <Button label="绑定" onClick={this.onOpenBindMember.bind(this,itemDetail)} type="operation" operation="edit"/> 
                                        ) 
                                    }
                                    

                                    

                                }} ></TableRowColumn>
                                
                               
                                <TableRowColumn type="operation" name="accountStatus" component={(value,oldValue,itemDetail) => {
                                        if (value == 'NOTLOCK') {
                                            logFlag = false;
                                        }
                                        if (value == 'LOCKED') {
                                            logFlag = true;
                                        }
                                        return (
                                            <div>
                                                <Button label="修改" onClick={this.openEditAcc.bind(this,itemDetail)} type="operation" operateCode="sso_userList_edit" operation="edit"/>
                                                <Button label="授予" onClick={this.openSetAcc.bind(this,itemDetail)} type="operation" operateCode="sso_userList_editRole" operation="set"/>
                                                <Button label="数据" onClick={this.openDataPermission.bind(this,itemDetail)} type="operation" operateCode="sso_userList_dataRight" operation="data"/>
                                                <Button label="重置" onClick={this.onReset.bind(this,itemDetail)} type="operation" operateCode="sso_userList_reset" operation="reset"/>
                                                {
                                                    logFlag
                                                    ? <Button label="解锁" onClick={this.onUnLock.bind(this,itemDetail)} operateCode="sso_userList_Lock" type="operation"/>
                                                    : <Button label="加锁" onClick={this.onLock.bind(this,itemDetail)} operateCode="sso_userList_Lock" type="operation"/>
                                                }
                                                    <Button label="删除" onClick={this.onDele.bind(this,itemDetail)} type="operation" operateCode="sso_userList_del" operation="dele"/>
                                            </div>
                                                )
                                    }}>
                                    {/*<Button label="修改" onTouchTap={this.openEdit} type="operation" operation="edit"/>
                                    <Button label="授予" type="operation" operation="set"/>
                                    <Button label="数据" onTouchTap={this.openDataPermission} type="operation" operation="data"/>
                                    <Button label="重置" type="operation" operation="reset"/>
                                    <Button type="operation" component={(value, oldValue) => {
                                        if (value == '未锁定') {
                                            logFlag = false;
                                        }
                                        if (value == '锁定') {
                                            logFlag = true;
                                        }
                                        return (
                                            <Button
                                                label={logFlag
                                                ? '解锁'
                                                : '加锁'}>{value}</Button>
                                                )
                                    }} operation="lock"/>*/}
                                </TableRowColumn>

                            </TableRow>
                        </TableBody>

                        <TableFooter></TableFooter>

                    </Table>
                </Section>
                <Dialog title="新建登录账号" modal={true} open={this.state.openNewCreate} onClose={this.openNewCreate} contentStyle={{
                    width: 500
                }}>
                    <CreateAccount onSubmit={this.onNewCreateSubmit} onCancel={this.openNewCreate} />
                </Dialog>
                <Dialog title="编辑登录账号" modal={true} open={this.state.openEditAcc} onClose={this.openEditAcc} contentStyle={{
                    width: 500
                }}>
                    <EditAccount detail={this.state.itemDetail} onSubmit = {this.onEditSubmit} onCancel={this.openEditAcc}/>
                </Dialog>
                <Dialog title="编辑数据权限" modal={true} open={this.state.openDataPermission} onClose={this.openDataPermission} contentStyle={{
                    width: 600,
                }}>
                    <DataPermission detail={this.state.itemDetail} onSubmit = {this.onDataSubimt} onCancel={this.openDataPermission}/>
                </Dialog>
                <Dialog title="授予" bodyStyle={{overflow:"scroll",maxHeight:600}} modal={true} open={this.state.openSetAcc} onClose={this.openSetAcc} contentStyle={{
                    width: 1016,
                }}>
                    <SetPermission detail={this.state.itemDetail} onSubmit = {this.onSetSubimt} onCancel={this.openSetAcc}/>
                </Dialog>
                <Dialog
	              title="解绑会员"
	              modal={true}
	              contentStyle ={{ width: '444',overflow:'visible'}}
	              open={this.state.openCancelMember}
	              onClose={this.openCancelMember}
	            >
	            <div className='u-list-delete'>
	              	<p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确认要解绑会员吗？</p>
					<div style={{textAlign:'center',marginBottom:10}}>
	                      <div  className='ui-btn-center'>
		                      <Button  label="确定" onClick={this.onCancelBindMember}/></div>
		                      <Button  label="取消" type="button" cancle={true} onClick={this.openCancelMember} />
	                      </div>
	            	</div>
	            </Dialog>
                <Dialog
	              title="绑定会员"
	              modal={true}
	              contentStyle ={{ width: 600,height:400,overflow:'visible'}}
	              open={this.state.openBindMember}
	              onClose={this.openBindMember}
	            >
                <BindMember 
                    detail={itemDetail}
                    onSubmit={this.onBindMember}
                    onCancel={this.openBindMember}  
                />
	           
	            </Dialog>
            </div>
        );
    }

}
export default reduxForm({form: 'AccountList', enableReinitialize: true, keepDirtyOnReinitialize: true})(AccountList);
