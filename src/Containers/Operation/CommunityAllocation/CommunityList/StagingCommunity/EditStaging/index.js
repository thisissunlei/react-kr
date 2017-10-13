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
            //工位数组
            stationData:[]
        }
	}
    
    componentDidMount(){
        Store.dispatch(change('EditStaging','detailData',[]));
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
        if(param.value=='false'){
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

        let {handleSubmit}=this.props;

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
                            name="name"
                            component="input"
                            label="分期名称"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:29,marginBottom:5}}
                            name="code"
                            component="select"
                            label="分期方式"
                            onChange={this.typeChange}
                            requireLabel={true}
                            options={[{value:'true',label:'楼层'},{value:'false',label:'工位/房间'}]}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="dimId"
                            component="date"
                            label="开业时间"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginLeft:29,marginBottom:5}}
                            name="code"
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
                                name ='detailData'
                                isFold = {false}
                                initFoldNum={1000}
                            >
                                <FRow name = "label" label = "楼层"/>
                                <FRow name = "inputTypeStr" label = "类型"/>
                                <FRow name = "compTypeStr" label = "编号"/>
                                <FRow label = "操作" type='operation' component={(item)=>{
                                        return <div style={{color:'#499df1',cursor:'pointer'}}>编辑</div>
                                        }}/>
                                </FdTabel>
                            </div>}

                            {isOk=='noOk'&&<div className='m-floor'><KrField grid={1/2}
                                style={{width:262}}
                                name="code"
                                component="checkBox"
                                label="楼层"
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

     if(!values.name){
       errors.name='请填写机构分权名称'; 
    }else if(values.name.length>30){
       errors.name='机构分权名称不能超过30个字符';   
    }

    if(!values.code){
      errors.code='请填写编码'  
    }else if(values.code.length>30){
       errors.code='编码不能超过30个字符';   
    }

    if(!values.dimId){
       errors.dimId='请选择纬度'   
    }
    
	return errors
}

export default reduxForm({ form: 'EditStaging',validate})(EditStaging);