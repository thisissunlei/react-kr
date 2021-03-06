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
    DrawerTitle,
    Dialog
} from 'kr-ui';
import {change,initialize}  from 'redux-form';
import {Store} from 'kr/Redux';
import AddStaging from './AddStaging';
import EditStaging from './EditStaging';
import {
	observer,
	mobx
} from 'mobx-react';
import State from '../State';
import './index.less';

@observer
class StagingCommunity  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state={
            openAddCommunity:false,
            openEditCommunity:false,
            searchParams:{
               communityId:this.props.communityId
            },
            //分区id
            id:''
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

    styleChook=(data)=>{
        let params = Object.assign({},data);
        if(params.zoneType=='FLOOR'){
            let floorArr = params.floor.split(",");
            var zoneArr=floorArr.map((item,index)=>{
                let obj = {};
                obj.detailType = 'FLOOR';
                obj.floor = item;
                return obj;
            });
            params.config=JSON.stringify(zoneArr);
        }else{
           var configNew=[];
           var configs=[];
           if(params.config){
             configs=params.config;
           }else{
             configs=params.zoneConfigSearchVO;
           }

           if(configs.length!=0){
               configs.map((item,index)=>{
                    if(item.config){
                        var detailIdArr=[];
                        item.config.map((items,indexs)=>{
                            detailIdArr.push(items.detailId)
                        })
                    }else if(item.codeList){
                        var detailIdArr=[];
                        item.codeList.map((items,indexs)=>{
                            detailIdArr.push(items.detailId)
                        })
                    }
                    item.detailId=detailIdArr;  
                })
                configNew=[].concat(configs);
            } 
           params.config=JSON.stringify(configNew); 
        }
       
        return Object.assign({},params);
      }

    openAddSubmit=(data)=>{
        var obj=Object.assign({},data);
        obj.communityId=this.props.communityId;

        var params = this.styleChook(obj);
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

    openEditSubmit=(data)=>{
        var obj=Object.assign({},data);
        obj.communityId=this.props.communityId;

        var params = this.styleChook(obj);
       
       

        params.openDate=DateFormat(params.openDate,"yyyy-mm-dd hh:MM:ss");
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
            var res=Object.assign({},response);
            Store.dispatch(initialize('EditStaging',res));
            if(res.zoneConfigSearchVO&&res.zoneConfigSearchVO.length!=0&&res.zoneConfigSearchVO[0].detailType=='SPACE'){
                    var configArr=[];
                    res.zoneConfigSearchVO.map((item,index)=>{
                        var configs='';
                        if(item.codeList&&item.codeList.length!=0){
                            var codeArr=[];
                            item.codeList.map((items,indexs)=>{
                                codeArr.push(items.code);
                            })
                            configs=codeArr.join(",");
                        }
                            item.codeStr=configs;
                            item.detailTypeStr=item.detailTypeName;
                    })           
            }else{  
                Store.dispatch(change('EditStaging','config',[]));
            }
            setTimeout(function() {
                _this.editRef.wrappedInstance.getSelectConfig(res); 
           }, 500);
           State.stageData=res;
        }).catch(function(err) {
            Message.error(err.message);
        });  
    }

    onOperation=(type,itemDetail)=>{
        if(type=='edit'){
            this.editCancel();
            this.getAjaxData(itemDetail.id);
            this.setState({
                id:itemDetail.id
            })
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
        
       
        var floors=[];
        floor.map((item,index)=>{
            var list={};
            list.value=''+item;
            list.label=''+item;
            floors.push(list);
        })
        
        

		return(

			<div className='m-stage-list'>
                      <div className="title" style={{marginBottom:"30px"}}>
                            <DrawerTitle title ='分期配置' onCancel = {this.onCancel}/>
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
                        ref={(ref)=>{
                            this.editRef=ref
                        }}
                        onCancel={this.editCancel}
                        onSubmit={this.openEditSubmit}
                        floor={floors}
                        communityId={communityId}
                    />

                </Drawer>

                       
			</div>
		);
	}
}


export default StagingCommunity