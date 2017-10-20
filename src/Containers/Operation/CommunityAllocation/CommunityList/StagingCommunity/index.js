import React from 'react';
import {DateFormat,Http} from 'kr/Utils';
import {	
    Col,
    Row,
    Button,
    Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
    TableFooter,
    Tooltip,
    KrDate,
    Drawer,
    Message,
    Dialog
} from 'kr-ui';
import {change,initialize}  from 'redux-form';
import {Store} from 'kr/Redux';
import AddStaging from './AddStaging';
import EditStaging from './EditStaging';
import './index.less';

class StagingCommunity  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state={
            openAddCommunity:false,
            openEditCommunity:false,
            getData:{},
            searchParams:{
               communityId:this.props.communityId
            },
        }
	}

    componentDidMount(){
          
    }

    onCancel=()=>{
        let {onCancel}=this.props;
        onCancel && onCancel();
    }

    openAddCommunity=()=>{
        this.setState({
            openAddCommunity:!this.state.openAddCommunity
        })
    }

    openAddSubmit=(params)=>{
        params=Object.assign({},params);
        params.communityId=this.props.communityId;
        if(params.zoneType=='FLOOR'){
            var zoneArr=[];
           for(var index in params.floor){
               if(params.floor[index]!=','){
                 zoneArr.push({detailType:'FLOOR',floor:params.floor[index]})                                        
               }
             }
            params.config=JSON.stringify(zoneArr);
        }else{
           var configNew=[];
           if(params.config.length!=0){
             for(var i=0;i<params.config.length;i++){
                for(var j=0;j<params.config.length;j++){
                    if((params.config[i].floor==params.config[j].floor)&&(params.config[i].detailType==params.config[j].detailType)&&(i!=j)){   
                        params.config[i].config=params.config[i].config.concat(params.config[j].config)
                        params.config.splice(j,1);
                    }
                }
             }
             configNew=params.config;
             configNew.map((item,index)=>{
                item.config.map((items,indexs)=>{
                   items.detailType=item.detailType
                })
             })
           }
           //params.config=JSON.stringify(configNew); 
        }
        console.log('params.config',params.config,params);
        var _this=this;
        Http.request('community-stage-add',{},params).then(function(response) {
            var search={
                time:+new Date()
            }
            _this.setState({
                searchParams:Object.assign({},_this.state.searchParams,search) 
            })
            _this.openAddCommunity();
        }).catch(function(err) {
            Message.error(err.message);
        });
    }

    openEditSubmit=(params)=>{
        if(params.zoneType=='FLOOR'){
            var zoneArr=[];
           for(var index in params.floor){
               if(params.floor[index]!=','){
                 zoneArr.push({detailType:'FLOOR',floor:params.floor[index]})                                        
               }
             }
            params.config=JSON.stringify(zoneArr);
        }
        params.openDate=DateFormat(params.openDate,"yyyy-mm-dd hh:MM:ss");
        delete params.zoneConfigSearchVO;
        var _this=this;
        Http.request('community-stage-edit',{},params).then(function(response) {
            var search={
                time:+new Date()
            }
            _this.setState({
                searchParams:Object.assign({},_this.state.searchParams,search) 
            })
            _this.editCancel();
        }).catch(function(err) {
            Message.error(err.message);
        });
    }
   
   

    getAjaxData=(id)=>{
        var _this=this;
        Http.request('stage-down-search',{zoneId:id}).then(function(response) {
            Store.dispatch(initialize('EditStaging',response));
            if(response.zoneConfigSearchVO&&response.zoneConfigSearchVO.length!=0){
                var configArr=[];
                response.zoneConfigSearchVO.map((item,index)=>{
                    var list={};
                    var configs='';
                    if(item.zoneConfigedCodeListVos.length!=0){
                        var codeArr=[];
                        item.zoneConfigedCodeListVos.map((item,index)=>{
                            codeArr.push(item.code);
                        })
                        configs=codeArra.join(",");
                    }
                    list.detailType=item.detailTypeName;
                    list.floor=item.floor;
                    list.code=configs;
                })
            }
            _this.setState({
                getData:response
            })
            Store.dispatch(change('EditStaging','config',response.zoneConfigSearchVO?response.zoneConfigSearchVO:[]));
        }).catch(function(err) {
            Message.error(err.message);
        });  
    }

    onOperation=(type,itemDetail)=>{
        if(type=='edit'){
            this.editCancel();
            this.getAjaxData(itemDetail.id);
        }
    }

    editCancel=()=>{
        this.setState({
            openEditCommunity:!this.state.openEditCommunity,
        })  
    }
    
    whiteClose=()=>{
        let {whiteClose}=this.props;
        whiteClose && whiteClose();
        this.setState({
            openAddCommunity:false,
            openEditCommunity:false,
        })
    }

	render(){

        let {floor,communityId}=this.props;
        let {getData}=this.state;
        var floors=[];
        floor.map((index,item)=>{
            var list={};
            list.value=''+item;
            list.label=''+item;
            floors.push(list);
        })
        
        

		return(

			<div className='m-stage-list'>
                      <div className="title" style={{marginBottom:"30px"}}>
                            <div style={{marginLeft:-40}}><span className="new-icon-add"></span><label className="title-text">分期配置</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>
                      
                      <Row style={{marginBottom:21,position:'relative',zIndex:5}}>

                            <Col
                                style={{float:'left'}}
                            >
                                    <Button
                                        label="新建"
                                        type='button'
                                        onTouchTap={this.openAddCommunity}
                                    />
                            </Col>

	                 </Row>

                    <Table
                        style={{marginTop:8}}
                        ajax={true}
                        onOperation={this.onOperation}
                        displayCheckbox={false}
                        ajaxParams={this.state.searchParams}
                        onPageChange={this.onPageChange}
                        ajaxUrlName='community-stage-list'
                        ajaxFieldListName="items"
                        >
                        <TableHeader>
                        <TableHeaderColumn>分期名称</TableHeaderColumn>
                        <TableHeaderColumn>分期方式</TableHeaderColumn>
                        <TableHeaderColumn>开业时间</TableHeaderColumn>
                        <TableHeaderColumn>工位数</TableHeaderColumn>
                        <TableHeaderColumn>操作</TableHeaderColumn>
                        </TableHeader>

                        <TableBody >
                            <TableRow>
                                <TableRowColumn name="zoneName" component={(value,oldValue)=>{
		 										var maxWidth=10;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,10)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }}></TableRowColumn>
                                <TableRowColumn name="zoneTypeName" component={(value,oldValue)=>{
		 										var maxWidth=10;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,10)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }}></TableRowColumn>
                                 <TableRowColumn name="openDate" component={(value,oldValue)=>{
                                        return (<KrDate value={value} format="yyyy-mm-dd"/>)
                                }}></TableRowColumn>
                                <TableRowColumn name="stationNum" component={(value,oldValue)=>{
		 										var maxWidth=10;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,10)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }}></TableRowColumn>
                                <TableRowColumn type="operation">
                                    <Button label="编辑"  type="operation"  operation="edit"/>
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>
                </Table>


                {/*新增*/}
                <Drawer
                    open={this.state.openAddCommunity}
                    width={750}
                    onClose={this.whiteClose}
                    openSecondary={true}
                    containerStyle={{top:60,paddingBottom:48,zIndex:20}}
                >
                    <AddStaging
                        onCancel={this.openAddCommunity}
                        onSubmit={this.openAddSubmit}
                        floor={floors}
                        communityId={communityId}
                    />

                </Drawer>


                {/*编辑*/}
                <Drawer
                    open={this.state.openEditCommunity}
                    width={750}
                    onClose={this.whiteClose}
                    openSecondary={true}
                    containerStyle={{top:60,paddingBottom:48,zIndex:20}}
                >
                    <EditStaging
                        onCancel={this.editCancel}
                        onSubmit={this.openEditSubmit}
                        floor={floors}
                        communityId={communityId}
                        getData={getData}
                    />

                </Drawer>

                       
			</div>
		);
	}
}


export default StagingCommunity