import React from 'react';
import {
	Http
} from "kr/Utils";
import {
    KrField,
    Title,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter,
    Button,
    ListGroup,
    ListGroupItem,
    SearchForms,
    Section,
    Tooltip,
    KrDate,
    Row,
    Col,
    Dialog,
    Message,
    CheckPermission
} from 'kr-ui';
import './index.less';
import NewCreateFund from './NewCreateFund';
import ItemDetail from './ItemDetail';
import EditDetailForm from './EditDetailForm';
export default class TotalFund extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            searchParams: {
                page: 1,
                pageSize: 15
            },
            openNewCreateFund: false,
            itemDetail: {},
            openView: false,
            openEditDetail: false,
            newPage:1,
        }

    }
    onOperation = (type, itemDetail) => {

        this.setState({itemDetail});
        if (type == 'view') {
            this.openViewDialog();
        } else if (type == 'edit') {
            this.openEditDetailDialog();
        } else if (type == 'next') {
            let fundId = itemDetail.id
            window.open(`./#/finance/Manage/fundSetting/${fundId}/detailFund`, fundId);
        }
    }
    onSearchSubmit = (searchParams) => {
        this.setState({

            searchParams: {
                page: 1,
                pageSize: 15,
                searchParam: searchParams.content
            }

        })

    }
    //查看
    openViewDialog = () => {
        this.setState({
            openView: !this.state.openView
        });
    }

    onPageChange=(page)=>{
        this.setState({
            newPage:page,
        })
    }
    //编辑
    openEditDetailDialog = () => {
        this.setState({
            openEditDetail: !this.state.openEditDetail
        });
    }

    onEditSubmit = (form) => {
        var _this=this;
        this.openEditDetailDialog();

        Http.request('editFirstCategory', {}, form).then(function(response) {
            Message.success("编辑成功");
            var timer=new Date();
           _this.setState({
                searchParams:{
                    //page:_this.state.newPage,
                    date:timer
                }
           })
            
        }).catch(function(err) {
            Message.error(err.message);
        });

    }

    openNewCreateFund = () => {
        this.setState({
            openNewCreateFund: !this.state.openNewCreateFund
        })
    }

    onNewCreateSubmit = (values) => {
         var _this=this;
        Http.request('createFirstCategory', {}, values).then(function(response) {
            Message.success("创建成功");
            var timer=new Date();
            _this.openNewCreateFund();
           _this.setState({
                searchParams:{
                    date:timer,
                    pageSize:15
                }
           })

        }).catch(function(err) {
            Message.error(err.message);
        });
    }
    render() {
        let {searchParams} = this.state;
        let {itemDetail} = this.state;
        return (

            <div className="m-fundt">
                <Title value="款项配置_财务管理"/>
                <Section title="款项配置" description="">
                    <Row style={{
                        position: 'relative',
                        zIndex: 5,
                        height: 42,
                        paddingTop:2
                    }}>
                        <Col md={4} align="left">
                                <Button label="新建款项" operateCode="fina_category_create1st" type='button' joinEditForm onTouchTap={this.openNewCreateFund}/>
                        </Col>

                        <Col md={8} align="right">
                            <ListGroup>
                                <ListGroupItem><SearchForms placeholder="请输入款项名称" onSubmit={this.onSearchSubmit}/></ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Table style={{
                        marginTop: 10
                    }} 
                    displayCheckbox={true} 
                    onLoaded={this.onLoaded} 
                    ajax={true} 
                    ajaxUrlName='findPage' 
                    ajaxParams={this.state.searchParams} 
                    onOperation={this.onOperation}
                    onPageChange={this.onPageChange} 
                    >

                        <TableHeader>
                            <TableHeaderColumn>款项名称</TableHeaderColumn>
                            <TableHeaderColumn>显示位置</TableHeaderColumn>
                            <TableHeaderColumn>排序号</TableHeaderColumn>
                            <TableHeaderColumn>备注</TableHeaderColumn>
                            <TableHeaderColumn>状态</TableHeaderColumn>
                            <TableHeaderColumn>创建人</TableHeaderColumn>
                            <TableHeaderColumn>创建时间</TableHeaderColumn>
                            <TableHeaderColumn>操作</TableHeaderColumn>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableRowColumn name="categoryName"></TableRowColumn>
                                <TableRowColumn name="position" options={[
                                    {
                                        label: '全部',
                                        value: 'BOTH'
                                    }, {
                                        label: '回款',
                                        value: 'PAYMENT'
                                    }
                                ]}></TableRowColumn>
                                <TableRowColumn name="sortNum"></TableRowColumn>
                                  <TableRowColumn name="remark" component={(value,oldValue)=>{
                                          var TooltipStyle=""
                                          if(value.length==""){
                                            TooltipStyle="none"

                                          }else{
                                            TooltipStyle="block";
                                          }
                                           return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                                            <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                                         }}></TableRowColumn>
                                  <TableRowColumn name="status" options={[
                                      {
                                          label: '启用',
                                          value: 'ENABLE'
                                      }, {
                                          label: '未启用',
                                          value: 'DISENABLE'
                                      }
                                  ]}></TableRowColumn>
                                <TableRowColumn name="createrName"></TableRowColumn>
                                <TableRowColumn name="createTime" component={(value, oldValue) => {
                                    return (<KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/>)
                                }}></TableRowColumn>
                                <TableRowColumn>
                                    <Button label="查看" type="operation" operation="view"/>
                                    <Button label="编辑" type="operation" operateCode="fina_category_edit2nd" operation="edit"/>
                                    <Button label="下一级" type="operation" operation="next"/>
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>

                        <TableFooter></TableFooter>

                    </Table>
                    <Dialog title="新建款项" open={this.state.openNewCreateFund} onClose={this.openNewCreateFund} contentStyle ={{
                        width: '688'
                    }}>
                        <NewCreateFund onSubmit={this.onNewCreateSubmit} onCancel={this.openNewCreateFund}/>

                    </Dialog>
                    <Dialog title="款项详情" modal={true} open={this.state.openView} onClose={this.openViewDialog}>
                        <ItemDetail detail={this.state.itemDetail} onCancel={this.openViewDialog}/>
                    </Dialog>
                    <Dialog title="编辑科目" modal={true} open={this.state.openEditDetail} onClose={this.openEditDetailDialog} contentStyle ={{
                        width: '688'
                    }}>
                        <EditDetailForm detail={this.state.itemDetail} onSubmit={this.onEditSubmit} onCancel={this.openEditDetailDialog}/>
                    </Dialog>
                </Section>
            </div>
        );
    }

}
