import React from 'react';
import {
	toJS
} from 'mobx';
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

import {
	observer,
	inject
} from 'mobx-react';

@inject("TextDicModel")
@observer
class EditText  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state={
           
        }
    }

    componentWillUnmount(){
        this.props.TextDicModel.oldDetail={};
    }
    

    onSubmit=(values)=>{
        const {onSubmit}=this.props;
        values = Object.assign({},values);
      
         
        let itemListStr = [];
        if(values.inputType!='SELECT'&&values.inputType!='CHECK'){
            itemListStr=null;
        }else{
            if(values.itemListStr&&values.sourceType=='CUSTOM'){
                itemListStr= [].concat(values.itemListStr);
            }else{
                itemListStr=null;
            }
        }

        console.log(values,"PPPPPPPPP");
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
                            message: '排序号必须为数值且最大为2位数',
                            type: 'danger',
                        }]);
                        return;
                    }
                }

            }
        }

        
        if(values.itemListStr && values.itemListStr.length){

            //是否有默认值
            var haveIsDefault = false;

            values.itemListStr.map((item,index)=>{
                if(!item.isDefault){
                    item.isDefault = false;
                } else{
                    haveIsDefault = true;
                }
                
            })
            //如果没有默认值则将第一个设为默认值
            if(!haveIsDefault){
                values.itemListStr[0].isDefault = true;
            }
        }


        for (var item in values){
            if(item=='wstext'||item=='wsheight'||item=='wsfile'||item=='wspicWidth'||item=='wspicHeight'||item=='wspicFile'){
                values[item]=values[item].replace(/^0+\./g,'0.'); 
                values[item]=values[item].match(/^0+[1-9]+/)?values[item]=values[item].replace(/^0+/g,''):values[item];
            }
        }
        
       onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
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
                            name="label"
                            component="input"
                            label="字段显示名"
                            marking={true}
                        />


                       <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5,marginLeft:30}}
                            name="name"
                            component="input"
                            label="字段名称 "
                            requireLabel={true}
                            marking={true}
						/>


                            {(toJS(this.props.TextDicModel.oldDetail).inputType)&&<TextDic
                                isEdit={true}
                            />}

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
    let dataRg=/^[1-9]*[1-9][0-9]*$/;

    if(!values.name){
       errors.name='请填写字段名称';
    }else if(values.name.length>20){
       errors.name='字段名称不能超过20个字符';
    }

    if(!values.label){
        errors.label='请填写字段显示名';
    }else if(values.label.length>30){
        errors.label='字段显示名不能超过30个字符';
    }

    if(!values.inputType){
        errors.inputType='请填写表现形式';
    }

    if(!values.compType){
        errors.compType='请填写类型';
    }

    if (values.inputType == 'TEXT') {
        if (values.compType != 'TEXT_TEXT' && values.compType != 'TEXT_INTEGER') {
            if (!values.wsfloat) {
                errors.wsfloat = '请选择小数位数';
            }
        }

        if (!values.wstext) {
            errors.wstext = '请填写文本长度';
        } else if (values.wstext && isNaN(values.wstext)) {
            errors.wstext = '文本长度是数字';
        } else if (values.wstext && (values.wstext.length > 3 || !dataRg.test(values.wstext))) {
            errors.wstext = '请填写三位以下不能以0开头的正整数';
        }

    }

    if (values.inputType == 'TEXT_AREA') {
        if (values.wsheight && isNaN(values.wsheight)) {
            errors.wsheight = '请选择数字格式';
        } else if (values.wsheight && (values.wsheight.length > 3 || !dataRg.test(values.wsheight))) {
            errors.wsheight = '请填写三位以下不能以0开头的正整数';
        }

        if (!values.wstext) {
            errors.wstext = '请填写文本长度';
        } else if (values.wstext && isNaN(values.wstext)) {
            errors.wstext = '文本长度是数字';
        } else if (values.wstext && (values.wstext.length > 3 || !dataRg.test(values.wstext))) {
            errors.wstext = '请填写三位以下不能以0开头的正整数';
        }

    }


    if(values.inputType=='BUTTON'){
        if(!values.wsradio){
            errors.wsradio='请选择按钮类型';
        }
        if(!values.wsbtnEnabled){
            errors.wsbtnEnabled='请填写是否多选';
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
        }else if(values.wsfile&&(values.wsfile.length>3||!dataRg.test(values.wsfile))){
            errors.wsfile='请填写三位以下不能以0开头的正整数';
        }

        if(!values.wsenabled){
            errors.wsenabled='请选择是否多文件上传';
        }
    }

    if(values.compType=='FILE_PHOTO'){
        if(values.wspicWidth&&isNaN(values.wspicWidth)){
            errors.wspicWidth='图片宽度为数字'; 
        }else if(values.wspicWidth&&(values.wspicWidth.length>3||!dataRg.test(values.wspicWidth))){
            errors.wspicWidth='请填写三位以下不能以0开头的正整数';
        }

        if(values.wspicHeight&&isNaN(values.wspicHeight)){
            errors.wspicHeight='图片高度为数字'; 
        }else if(values.wspicHeight&&(values.wspicHeight.length>3||!dataRg.test(values.wspicHeight))){
            errors.wspicHeight='请填写三位以下不能以0开头的正整数';
        }

        if(!values.wspicFile){
            errors.wspicFile='请填写文件大小';
        }else if(values.wspicFile&&isNaN(values.wspicFile)){
            errors.wspicFile='文件大小为数字'; 
        }else if(values.wspicFile&&(values.wspicFile.length>3||!dataRg.test(values.wspicFile))){
            errors.wspicFile='请填写三位以下不能以0开头的正整数';
        }

        if(!values.wsPicEnabled){
            errors.wsPicEnabled='请选择是否多文件上传';
        }
    }
  

	return errors
}

export default reduxForm({ form: 'EditText',validate})(EditText);
