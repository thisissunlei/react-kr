import React from 'react';
import {	
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button,
    FdTabel,
    FContent,
    FRow,
    DrawerTitle,
    Dialog
} from 'kr-ui';
import {
	LocationChoice
} from 'kr/PureComponents';
import {reduxForm,change}  from 'redux-form';
import {Store} from 'kr/Redux';
import {
	toJS
} from 'mobx';
import {
	observer,
	mobx
} from 'mobx-react';
import '../index.less';
import State from '../../State';

@observer
class EditStaging  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state={
            openStation:false,
            openEditStation:false,
            isOk:'',
            other:''
        }
        this.configArr=[];
        this.getData={};
        this.floor=[];
        this.index='';
    }
    
    componentDidMount(){      
       
    }
    
    
    getSelectConfig=(obj)=>{
        let {floor}=this.props;
        var isOk='';
        var _this=this;
        if(obj.zoneType=="SPACE"){
            isOk='ok'; 
        }else{
            isOk='noOk'; 
        } 
        this.setState({
            isOk 
        },function(){
           
            obj.zoneConfigSearchVO&&obj.zoneConfigSearchVO.map((item,index)=>{
                if(obj.zoneType=='SPACE'){
                   _this.commonStation(item,'props');                
                }else{
                    floor.map((items,indexs)=>{
                        if(items.value==item.floor){
                            items.checked=true; 
                        }
                    }) 
                    _this.floor=floor;
                    _this.setState({
                        other:+new Date()
                    })
                }
            })
        })
   }
    

    onSubmit=(values)=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }

    typeChange=(param)=>{
        let {floor}=this.props;
        var isOk='';
        if(param.value=='SPACE'){
            isOk='ok'; 
        }else{
            floor.map((item,index)=>{
                item.checked=false;
            })
            this.floor=floor;
            isOk='noOk'; 
        }
        this.setState({
            isOk 
        })
        this.configArr=[];
     }


     openAddCommunity=()=>{
        this.setState({
            openStation:!this.state.openStation
        })
    }

    commonStation=(params,type)=>{
        var codeList=[];
        var config=[];

        config=params.codeList;
        if(config.length!=0){
            config.map((item,index)=>{
                codeList.push(item.code);
            })
        }
        if(params.detailType=='STATION'){
            params.detailTypeStr='工位'
        }else if(params.detailType=='SPACE'){
            params.detailTypeStr='独立空间'
        }
        params.codeStr=(codeList.length!=0)?codeList.join(','):'';
        if(type!='edit'){
            this.configArr.push(params);        
        }
        Store.dispatch(change('EditStaging','config',this.configArr.length!=0?this.configArr:[])); 
    }

    onStationSubmit=(params)=>{
        params=Object.assign({},params);
        this.commonStation(params,'');
        this.openAddCommunity();
    }
    
    editButtonClck=(event,item,index)=>{
        let {communityId}=this.props;
        this.getData=Object.assign({communityId:communityId,all:{startValue:item.numberMin||'',endValue:item.numberMax||''}},item);
        this.openEditCommunity();
        this.index=index;
    }

    deleteButtonClck=(event,item,index)=>{ 
        this.configArr.splice(index,1);
        Store.dispatch(change('EditStaging','config',this.configArr)); 
        this.setState({
            other:+new Date()
        })
    }

    onEditStationSubmit = (params) =>{
        params=Object.assign({},params);
        this.configArr[this.index]=params;
        this.commonStation(params,'edit');
        this.openEditCommunity();
        this.setState({
            other:+new Date()
        })
    }

    openEditCommunity=()=>{     
        this.setState({
            openEditStation:!this.state.openEditStation
        }) 
    }

	render(){

        let {handleSubmit,floor,communityId}=this.props;

        
        let {openStation,openEditStation,isOk}=this.state;
        
       
          
        
       
		return(

			<div className='m-stage-add'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                      <div className="title" style={{marginBottom:"30px"}}>
                            <DrawerTitle title ='分期配置编辑' onCancel = {this.onCancel}/>
                      </div>

                       <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="zoneName"
                            component="input"
                            label="分期名称"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:29,marginBottom:5}}
                            name="zoneType"
                            component="select"
                            label="分期方式"
                            onChange={this.typeChange}
                            requireLabel={true}
                            options={[{value:'FLOOR',label:'楼层'},{value:'SPACE',label:'工位/房间'}]}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="openDate"
                            component="date"
                            label="开业时间"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginLeft:29,marginBottom:5}}
                            name="stationNum"
                            component="input"
                            label="工位数"
                            requireLabel={true}
						/>

                        {isOk=='ok'&&<div className='m-add-field'>
                          <div style={{float:'right',marginBottom:'20px'}}><Button
                                label="添加"
                                type='button'
                                onTouchTap={this.openAddCommunity}
                          /></div>
                           <FdTabel
                                name ='config'
                                isFold = {false}
                                initFoldNum={1000}
                            >
                                <FRow name = "floor" label = "楼层"/>
                                <FRow name = "detailTypeStr" label = "类型"/>
                                <FRow name = "codeStr" label = "编号" rowStyle={{width:'400px'}}/>
                                <FRow label = "操作" type='operation' component={(item,index)=>{
                                        return <div>
                                                 <div style={{color:'#499df1',cursor:'pointer',display:'inline-block',paddingRight:'10px'}} 
                                                 onClick={(event)=>{
                                                        this.editButtonClck(event,item,index)
                                                    }}
                                                 >编辑</div>
                                                 <div style={{color:'#499df1',cursor:'pointer',display:'inline-block',paddingLeft:'10px'}} 
                                                    onClick={(event)=>{
                                                        this.deleteButtonClck(event,item,index)
                                                    }}
                                                 >删除</div>
                                             </div>
                                        }}/>
                                </FdTabel>
                            </div>}

                            {isOk=='noOk'&&<div className='m-floor'><KrField
                                grid={1/2}
                                style={{width:262}}
                                label="楼层"
                                name='floor'
                                component="groupCheckbox"
                                defaultValue={this.floor}
                                requireLabel={true}
                             /></div>}

                        
                       <Grid style={{marginBottom:5,marginLeft:-42}}>
                            <Row>
                                <Col md={12} align="center">
                                <ButtonGroup>
                                    <div  style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
                                    <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
                                </ButtonGroup>
                                </Col>
                            </Row>
                        </Grid>
                 </form>

                  <Dialog
                        title = "选择工位" 
                        onClose={this.openAddCommunity}
                        open={openStation}
                        contentStyle ={{ width: '666px',height:'auto'}}
                        >
                        <LocationChoice 
                            communityId = {communityId} 
                            url='stage-detail-search'  
                            selectTitle='stage'     
                            onClose = {this.openAddCommunity} 
                            onSubmit = {this.onStationSubmit} />
                        </Dialog>
                    <Dialog
                            title = "选择工位" 
                            onClose={this.openEditCommunity}
                            open={openEditStation}
                            contentStyle ={{ width: '666px',height:'auto'}}
                        >
                        <LocationChoice  
                            communityId = {communityId} 
                            url='stage-detail-search' 
                            type = "edit"
                            selectTitle='stage' 
                            data = {this.getData}
                            onClose = {this.openEditCommunity} 
                            onSubmit = {this.onEditStationSubmit} />
                    </Dialog>                              
                  
			</div>
		);
	}
}

const validate = values =>{
	const errors = {};

    let dataRag=/^[1-9]\d{0,4}$/;
    
    if(!values.zoneName){
        errors.zoneName='请填写分期名称'; 
    }else if(values.zoneName.length>10){
        errors.zoneName='分期名称不能超过10个字符';   
    }

    if(!values.stationNum){
        errors.stationNum='请填写工位数'   
    }else if(!dataRag.test(values.stationNum)){
        errors.stationNum='工位数必须不以0开头的正整数，最大5位 '   
    }

    if(!values.zoneType){
        errors.zoneType='请选择分期方式'   
    }

    if(!values.openDate){
        errors.openDate='请选择开业时间'   
    }
    
    if(!values.floor){
        errors.floor='请选择楼层'   
    }

	return errors
}

export default reduxForm({ form: 'EditStaging',validate})(EditStaging);