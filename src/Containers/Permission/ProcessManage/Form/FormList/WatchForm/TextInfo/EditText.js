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
    TextDic,
    TabelEdit,
    FRow,
    Notify
} from 'kr-ui';
import {Http} from 'kr/Utils';
import {reduxForm,change,initialize}  from 'redux-form';
import {
	Store
} from 'kr/Redux';
import './index.less';

class EditText  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state={
           
        }
        this.ws=[];
    }

    
    
    componentDidMount(){
        Store.dispatch(change('EditText','wsenabled','true'));
    }

    onSubmit=(values)=>{
        const {onSubmit}=this.props;
        values = Object.assign({},values);
      
        console.log('frrrr',values);
        let itemListStr = [];
        if(values.itemListStr){
            itemListStr= [].concat(values.itemListStr);
        }else{
            itemListStr = null;
        }
        var valueReg = /^[1-9]\d{0,2}$/;
        var orderNumReg = /^[1-9]\d{0,1}$/;
        var label = true,
            value = true,
            orderNum = true,
            isDefault = true;


       if(itemListStr && !itemListStr.length){
            Notify.show([{
				message: '请添加自定义',
				type: 'danger',
			}]);
			return;
       }
       
       if(itemListStr != null){

       
            for(let i = 0; i<itemListStr.length;i++){
                let item = itemListStr[i];
                if(!item.label){
                    Notify.show([{
                        message: '请添选项文字',
                        type: 'danger',
                    }]);
                    
                    return;
                }else{
                    if(item.label.length>20){
                        Notify.show([{
                        message: '选项文字最多输入20字',
                        type: 'danger',
                    }]);
                    return;
                    }

                }
                if(!item.value){
                    Notify.show([{
                        message: '请添选项值',
                        type: 'danger',
                    }]);
                    return;
                }else{
                    if(!valueReg.test(item.value)){
                        Notify.show([{
                            message: '选项值必须为数值且最大为3位数',
                            type: 'danger',
                        }]);
                        return;
                    }
                }
                if(!item.orderNum){
                    Notify.show([{
                        message: '请添写排序号',
                        type: 'danger',
                    }]);
                    return;
                }else{
                    if(!orderNumReg.test(item.orderNum)){
                        Notify.show([{
                            message: '排序号必须为数值且最大为3位数',
                            type: 'danger',
                        }]);
                        return;
                    }
                }

            }
        }
  
       if(itemListStr==null){
           values.itemListStr = []
       }
       onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }

     
     callBack=(param)=>{
        var seArr=[];
        var _this=this;
        if(param.setting){
            var setting=JSON.parse(param.setting);
            setting.map((item,index)=>{
               for(var index in item){
                seArr.push(index);   
                Store.dispatch(change('EditText',index,item[index])); 
               }
            })
            this.ws=seArr;
        }else{
            this.ws.map((item,index)=>{
                Store.dispatch(change('EditText',item,'')); 
            })
        }
     }

	render(){

    let {handleSubmit,getEdit}=this.props;


		return(

			<div className='add-text-form'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
					 <div className="title" style={{marginBottom:"30px"}}>
							<div><span className="new-icon"></span><label className="title-text">编辑字段</label></div>
							<div className="customer-close" onClick={this.onCancel}></div>
					 </div>
                       <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="input"
                            label="字段名称 "
                            requireLabel={true}
                            marking={true}
						/>


                        <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5,marginLeft:30}}
                            name="label"
                            component="input"
                            label="字段显示名"
                            marking={true}
                            />


                            <TextDic
                                isEdit={true}
                                getEdit={getEdit}
                                callBack={this.callBack}
                            />

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
 
     if(!values.label){
         errors.label='请填写字段显示名';
     }
 
     if(!values.inputType){
         errors.inputType='请填写表现形式';
     }
 
     if(!values.compType){
         errors.compType='请填写类型';
     }
 
     if(values.inputType=='TEXT'){
         if(values.compType=='TEXT_TEXT'||values.compType=='TEXT_INTEGER'){
             if(!values.wstext){
                 errors.wstext='请填写文本长度';      
             }else if(values.wstext&&isNaN(values.wstext)){
                errors.wstext='文本长度是数字';    
             }  
         }else{
             if(!values.wsfloat){
                 errors.wsfloat='请选择小数位数';        
             }    
         }
     }
 
     if(values.inputType=='TEXT_AREA'){
         if(values.wsheight&&isNaN(values.wsheight)){
             errors.wsheight='请选择数字格式';
         }else if(values.wsheight&&values.wsheight>=100){
             errors.wsheight='请填写三位以下数字';
         }
     }
 
     if(values.inputType=='BUTTON'){
         if(!values.wsradio){
             errors.wsradio='请选择按钮类型';
         }
         if(!values.wsenabled){
             errors.wsenabled='请填写是否多选';
         }
     }
     
     if(values.inputType=='SELECT'||values.inputType=='CHECK'){
         if(!values.sourceType){
             errors.sourceType='请选择来源类型';
         }
         if(values.sourceType&&values.sourceType=='PUBLIC_DICT'){
             if(!values.sourceOrgin){
                 errors.sourceOrgin='请选择数据来源';
             }
         }
     }
 
     if(values.compType=='FILE_FILE'){
         if(!values.wsfile){
             errors.wsfile='请填写文件大小';
         }else if(values.wsfile&&isNaN(values.wsfile)){
             errors.wsfile='文件大小为数字'; 
         }
         if(!values.wsenabled){
             errors.wsenabled='请选择是否多文件上传';
         }
     }
 
     if(values.compType=='FILE_PHOTO'){
         if(values.wspicWidth&&isNaN(values.wspicWidth)){
             errors.wspicWidth='图片宽度为数字'; 
         }
         if(values.wspicHeight&&isNaN(values.wspicHeight)){
             errors.wspicHeight='图片高度为数字'; 
         }
           if(!values.wsfile){
            errors.wsfile='请填写文件大小';
            }else if(values.wsfile&&isNaN(values.wsfile)){
                errors.wsfile='文件大小为数字'; 
            }
            if(!values.wsenabled){
                errors.wsenabled='请选择是否多文件上传';
            }
     }
   


	return errors
}

export default reduxForm({ form: 'EditText',validate})(EditText);
