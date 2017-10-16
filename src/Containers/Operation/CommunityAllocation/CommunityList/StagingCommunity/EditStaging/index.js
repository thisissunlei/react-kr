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
} from 'kr-ui';
import {reduxForm,change}  from 'redux-form';
import {Store} from 'kr/Redux';
import '../index.less';

class EditStaging  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state={
            isOk:'',
        }
	}
    
    componentDidMount(){
        Store.dispatch(change('EditStaging','config',[]));
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
        if(param.value=='SPACE'){
            this.setState({
              isOk:'ok'
            })
        }else{
            this.setState({
              isOk:'noOk'
           }) 
        }
     }

	render(){

        let {handleSubmit,floor}=this.props;

        let {isOk}=this.state;

       
		return(

			<div className='m-stage-add'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                      <div className="title" style={{marginBottom:"30px"}}>
                            <div style={{marginLeft:-40}}><span className="new-icon-add"></span><label className="title-text">分期配置编辑</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
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
                                <FRow name = "detailType" label = "类型"/>
                                <FRow name = "code" label = "编号"/>
                                <FRow label = "操作" type='operation' component={(item)=>{
                                        return <div style={{color:'#499df1',cursor:'pointer'}}>编辑</div>
                                        }}/>
                                </FdTabel>
                            </div>}

                            {isOk=='noOk'&&<div className='m-floor'><KrField
                                grid={1/2}
                                style={{width:262}}
                                label="楼层"
                                name='floor'
                                component="groupCheckbox"
                                defaultValue={floor}
                                requireLabel={true}
                         /></div>}

                        
                       <Grid style={{marginBottom:5,marginLeft:-42,marginTop:15}}>
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