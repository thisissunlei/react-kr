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
		FRow
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
			model:null
        }
    }

    componentDidMount(){
		Store.dispatch(change('AddText','itemListStr',[]));
    }

    onSubmit=(values)=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }


    dynamicRender=()=>{
            return  <div style={{marginLeft:12}}><TabelEdit
                        name = "itemListStr"
                        toolbar = {true}
                        checkbox = {true}

                        >
                            <FRow name = "age"  type = "tableEdit"  label = "选项文字" />
                            <FRow name = "name" type = "tableEdit" label = "选项值" />
                            <FRow name = "other" type = "tableEdit" label = "排序号" />
                            <FRow name = "checked" type = "checkBox" label = "是否默认" />
                        </TabelEdit></div>
            }

	 onChange=(param)=>{
		 if(param.value=='CUSTOM'){
			this.setState({
				model:this.dynamicRender()
			})
		}else{
			this.setState({
				model:null
			})
		}
	 }

	render(){

    let {handleSubmit}=this.props;

		let {model}=this.state;

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
                            name="label"
                            component="input"
                            label="字段显示名"
                            />


				                <TextDic
                                    onChange={this.onChange}
                                />

								{model}

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


	return errors
}

export default reduxForm({ form: 'AddText',validate})(AddText);
