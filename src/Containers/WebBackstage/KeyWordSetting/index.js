import React from 'react';
import {
    Section,
    Title,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Button,
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn,
    SearchForms,
    TableFooter,
    Dialog,
    Drawer,
    KrDate,
    Message
} from 'kr-ui';
import {DateFormat,Http} from 'kr/Utils';
import {Store} from 'kr/Redux';
import {initialize,change} from 'redux-form';

import KeyWordEditForm from './KeyWordEditForm';
import ImportData from './ImportData';

import './index.less';



export default class Keyword extends React.Component{
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    constructor(props,context){
        super(props, context);
        this.state={
            list: {},
            realPage : 1,
            openEditDetail:false,
            openDelete:false,
            openAllDelete:false,
            openNewDetail:false,
            importAlldata:false,
            AllDeleteArr:[],
            itemDetail:{},
            searchParams:{
                page:1,
                pageSize:15,
                semCode:'',
                semName:''
            }
        }
    }

    onPageChange=(page)=>{
        this.setState({
            realPage : page
        })
    }

    onSearch=(form)=>{

    }

    //新建
    openNewDialog=()=>{
        this.setState({
            openNewDetail: !this.state.openNewDetail,
        });
    }

    //编辑相关弹框
    openEditDetailDialog=(itemDetail)=>{
        this.setState({
            openEditDetail: !this.state.openEditDetail,
            itemDetail
        });
    }

    onEditSubmit=(values)=>{
        let _this = this

        Http.request('keyword-setting-edit',{},values).then(function(response){
            if(values.id){
                _this.openEditDetailDialog();
            }else{
                _this.openNewDialog()
            }
            Message.success("操作成功");
            _this.setState({
                searchParams:{
                    date:new Date(),
                    pageSize:"15"
                }
            })

        }).catch(function(err){
            Message.error(err.message);
        });
    }
    //删除相关弹框
    openDelete=(itemDetail)=>{

        this.setState({
            openDelete:!this.state.openDelete,
            itemDetail
        })
    }

    onDeleteData=()=>{
        let _this = this
        const {itemDetail}=this.state;
        Http.request('keyword-setting-delete',{id:itemDetail.id}).then(function(response){
            _this.openDelete();
            Message.success("删除成功！");
            _this.setState({
                searchParams:{
                    date:new Date(),
                    pageSize:"15"
                }
            })
        }).catch(function(err){
            Message.error(err.message);
        });
    }
    //批量删除
    openAllDelete=()=>{
        let _this = this
        console.log(this.state.AllDeleteArr)
        if(this.state.AllDeleteArr.length==0){
            this.setState({
                openAllDelete:!this.state.openAllDelete,
            })
        }else{
            Http.request('keyword-setting-deleteall',{ids:this.state.AllDeleteArr}).then(function(response){
                Message.success("删除成功！");
                _this.setState({
                    AllDeleteArr:[],
                    searchParams:{
                        date:new Date(),
                        pageSize:"15"

                    }
                })
            }).catch(function(err){
                Message.error(err.message);
            });
        }
    }
    //批量导出
    downloadReport=()=>{
        let semCode=''
        let semName=''
        var url = `/api/krspace-finance-web/por-sem/export?semCode=${semCode}&semName=${semName}`;
        window.location.href = url;

    }

    onSearchSubmit=(value)=>{
        this.setState({
            searchParams :{
                [value.filter]:value.content,
                page :1,
                pageSize:15,
            }
        })
    }

    onSelect=(result,selectedListData)=>{
        let arr = []
        selectedListData.forEach(function (v,i) {
            arr.push(v.id)
        })
        this.setState({
            AllDeleteArr:arr
        })
    }

    //批量导入
    importAllData=()=>{
        this.setState({
            importAlldata:!this.state.importAlldata
        })
    }

    importDataPost=()=>{
        this.setState({
            searchParams:{
                date:new Date(),
                pageSize:"15"
            }
        })
    }

    //下载模板
    onLoadDemo=()=>{
        let url = '/api/krspace-finance-web/por-sem/download-excle';
        window.location.href = url;
    }

    render(){
        let options = [{
            label: '关键词',
            value: 'semCode'
        }, {
            label: '参数代码',
            value: 'semName'
        }];
        return(
            <div className='g-keyword'>
                <Title value="关键词配置"/>
                <Section title='关键词配置' description="" >
                    <form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
                    <div className="u-member-btn-list">
                        <Button operateCode="sem_saveoredit"  label="新建"  onTouchTap={this.openNewDialog} />
                        <Button  operateCode="sem_execle" label="批量导入" type="button" onTouchTap={this.importAllData} width={80} height={30} />
                        <Button operateCode="sem_del"  label="批量删除"  onTouchTap={this.openAllDelete} />
                        <Button operateCode="sem_execle"  label="下载报表"  onTouchTap={this.downloadReport} />
                    </div>
                        {/*高级查询*/}
                        <SearchForms
                            onSubmit={this.onSearchSubmit}
                            searchFilter={options}
                            style={{marginTop:'5px',zIndex:10000}}
                            content={this.state.content}
                            filter={this.state.filter}
                        />
                    </form>
                    <Table
                        className="member-list-table"
                        style={{marginTop:10,position:'inherit'}}
                        ajax={true}
                        ajaxFieldListName='items'
                        ajaxUrlName='keyword-setting'
                        ajaxParams={this.state.searchParams}
                        onPageChange={this.onPageChange}
                        onSelect={this.onSelect}
                    >
                        <TableHeader>
                            <TableHeaderColumn>序号</TableHeaderColumn>
                            <TableHeaderColumn>关键词</TableHeaderColumn>
                            <TableHeaderColumn>参数代码</TableHeaderColumn>、
                            <TableHeaderColumn>操作</TableHeaderColumn>
                        </TableHeader>
                        <TableBody style={{position:'inherit'}}>
                            <TableRow displayCheckbox={true}>
                                <TableRowColumn name="id"></TableRowColumn>
                                <TableRowColumn name="semName"></TableRowColumn>
                                <TableRowColumn name="semCode"></TableRowColumn>
                                <TableRowColumn type="operation" name="leaved" style={{width:230}} component={(value,oldValue,itemDetail) => {
                                    return (
                                        <div>
                                            <Button operateCode="sem_saveoredit" onClick={this.openEditDetailDialog.bind(this,itemDetail)} label="编辑"  type="operation"/>
                                            <Button operateCode="sem_del" onClick={this.openDelete.bind(this,itemDetail)} label="删除"  type="operation" operation="delete"/>
                                        </div>
                                    )
                                }}>
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>
                        <TableFooter></TableFooter>
                    </Table>
                    <Dialog
                        title="新建"
                        modal={true}
                        open={this.state.openNewDetail}
                        onClose={this.openNewDialog}
                        contentStyle={{width:687}}
                    >
                        <KeyWordEditForm onSubmit={this.onEditSubmit} onCancel={this.openEditDetailDialog} detail={this.state.itemDetail}/>
                    </Dialog>
                    <Dialog
                        title="编辑"
                        modal={true}
                        open={this.state.openEditDetail}
                        onClose={this.openEditDetailDialog}
                        contentStyle={{width:687}}
                    >
                        <KeyWordEditForm onSubmit={this.onEditSubmit} onCancel={this.openEditDetailDialog} detail={this.state.itemDetail}/>
                    </Dialog>
                    <Dialog
                        title="删除"
                        modal={true}
                        contentStyle ={{ width: '444',overflow:'visible'}}
                        open={this.state.openDelete}
                        onClose={this.openDelete}
                        >
                        <div className='u-list-delete'>
                            <p className='u-delete-title' style={{textAlign:'center',color:'#333',marginBottom:20}}>是否确定删除该条信息?</p>
                            <div style={{textAlign:'center',marginBottom:10}}>
                                <div  className='ui-btn-center'>
                                    <Button  label="确定" style={{textAlign:'center',marginRight:10}} onClick={this.onDeleteData}/>
                                    <Button  label="取消" type="button" cancle={true} onClick={this.openDelete} />
                                </div>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        title="批量删除"
                        modal={true}
                        contentStyle ={{ width: '444',overflow:'visible'}}
                        open={this.state.openAllDelete}
                        onClose={this.openAllDelete}
                        >
                        <div className='u-list-delete'>
                            <p className='u-delete-title' style={{textAlign:'center',color:'#333',marginBottom:20}}>请勾选要删除的信息后,在点击批量删除按钮?</p>
                            <div style={{textAlign:'center',marginBottom:10}}>
                                <div  className='ui-btn-center'>
                                    <Button  label="我知道了" type="button" cancle={true} onClick={this.openAllDelete} />
                                </div>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        title="批量导入"
                        modal={true}
                        open={this.state.importAlldata}
                        onClose={this.importAllData}
                        contentStyle={{width:500}}
                    >
                        <ImportData onSubmit={this.importDataPost} onCancel={this.importAllData} onLoadDemo={this.onLoadDemo}/>
                    </Dialog>
                </Section>
            </div>
        );
    }
}
