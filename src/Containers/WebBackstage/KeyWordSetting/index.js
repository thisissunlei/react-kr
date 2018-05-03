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
import './index.less';



export default class Keyword extends React.Component{

    constructor(props,context){
        super(props, context);
        this.state={
        }
    }
    componentDidMount(){
        Http.request('keyword-setting',{page:1,pageSize:10,semCode:1,semName:''}).then(function(response){
            // _this.openEditDetailDialog();
            // Message.success("操作成功");
            // _this.setState({
            //     status:!_this.state.status,
            //     searchParams:{
            //         page: _this.state.realPage,
            //         pageSize:"15",
            //         value:_this.state.searchParams.value,
            //         type:_this.state.searchParams.type,
            //         status:!_this.state.status,
            //         companyId:"0",
            //         startTime:_this.state.searchParams.startTime,
            //         endTime:_this.state.searchParams.endTime,
            //         registerSourceId:_this.state.searchParams.registerSourceId,
            //         job:_this.state.searchParams.job,
            //         cityId:_this.state.searchParams.cityId,
            //     }
            // })
        }).catch(function(err){
            Message.error(err.message);
        });

    }

    onSearch=(form)=>{

    }

    render(){
        let {
            list,
            itemDetail,
            seleced
        } = this.state;


        let options = [{
            label: '公司名称',
            value: 'COMP_NAME'
        }, {
            label: '手机号',
            value: 'PHONE'
        }, {
            label: '姓名',
            value: 'NAME'
        }];

        return(
            <div className='g-keyword'>
                <Title value="关键词配置"/>
                <Section title='关键词配置' description="" >
                    <form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
                    <div className="u-member-btn-list">
                        <Button operateCode="mbr_list_add"  label="新建"  onTouchTap={this.openNewCreateDialog} />
                        <Button  operateCode="mbr_list_import" label="批量导入" type="button" onTouchTap={this.importData} width={80} height={30} />
                        <Button operateCode="mbr_list_add"  label="批量删除"  onTouchTap={this.openNewCreateDialog} />
                        <Button operateCode="mbr_list_add"  label="下载报表"  onTouchTap={this.openNewCreateDialog} />
                    </div>
                        {/*高级查询*/}
                        <SearchForms onSubmit={this.onSearchSubmit} searchFilter={options} style={{marginTop:'5px',zIndex:10000}} content={this.state.content} filter={this.state.filter}/>
                    </form>
                    <Table
                            className="member-list-table"
                            style={{marginTop:10,position:'inherit'}}
                        >
                        <TableHeader>
                            <TableHeaderColumn>序</TableHeaderColumn>
                            <TableHeaderColumn>关键词</TableHeaderColumn>
                            <TableHeaderColumn>参数代码</TableHeaderColumn>、
                            <TableHeaderColumn>操作</TableHeaderColumn>
                        </TableHeader>
                        <TableBody style={{position:'inherit'}}>

                        </TableBody>
                        <TableFooter></TableFooter>
                    </Table>
                </Section>
                内容
            </div>
        );
    }
}
