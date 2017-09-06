import React from 'react';
import DictionaryConfigs from 'kr/Configs/dictionary';
import {
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button,
    Tooltip,
    IconTip,
    TextDic
} from 'kr-ui';
import {reduxForm,change}  from 'redux-form';
import {
	Store
} from 'kr/Redux';
import './index.less';

class AddText  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state={
            inputType:[],
            componentType:[],
            label:{}
        }
    }
    
    componentDidMount(){
        Store.dispatch(change('BasicInfo','enabled','1'));
        this.setState({
			inputType:DictionaryConfigs.ERP_InputType,
			componentType:DictionaryConfigs.ERP_ComponentType
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
        this.setState({
			label:param
		})
    }

	render(){

    let {handleSubmit}=this.props;
    let {inputType,componentType,label}=this.state;
    var seleInt=[];
    inputType.map((item,index)=>{
       var list={};
       list.label=item.desc;
       list.value=item.value;
       seleInt.push(list);
    })

		return(

			<div className='add-text-form'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
					 <div className="title" style={{marginBottom:"30px"}}>
							<div><span className="new-icon"></span><label className="title-text">新增字段</label></div>
							<div className="customer-close" onClick={this.onCancel}></div>
					 </div>
                       <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="input"
                            label="字段名称 "
                            requireLabel={true}
						/>

            
                        <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5,marginLeft:30}}
                            name="tableName"
                            component="input"
                            label="字段显示名"
                            />


                        <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="typeId"
                            component="select"
                            label="表现形式"
                            options={seleInt}
                            onChange={this.typeChange}
                            requireLabel={true}
                        />

				        <TextDic  label={label} next={componentType} />

                        <Grid style={{marginBottom:5,marginLeft:-32,marginTop:12}}>
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
       errors.name='请填写表单类型名称';
    }else if(values.name.length>20){
       errors.name='表单类型名称不能超过20个字符';
    }
    
   
    if(!values.typeId){
        errors.typeId='请填写表单类型';
    }
   

	return errors
}

export default reduxForm({ form: 'AddText',validate})(AddText);
