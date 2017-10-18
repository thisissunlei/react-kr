import React from 'react';
import {
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';
import {reduxForm,change}  from 'redux-form';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils'
import './index.less';

class AddPic extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
            jobTypes:[],
            isType :false,

        }
	}

    componentDidMount(){
        Store.dispatch(change('AddPic','published',"1"))
    }


    onSubmit=(values)=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        
        onCancel && onCancel();
    }

	render(){

        let {handleSubmit,subCompany}=this.props;
        let {jobTypes,isType} = this.state;
        let host = "http://"+window.location.host;
        //  let host = "http://optest02.krspace.cn/"


		return(

			<div className='m-add-pic'>
				 <form  onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
				<div className="title">
						<div><span className="order-new-icon"></span><label className="title-text">新建轮播图</label></div>
						<div className="order-close" onClick={this.onCancel}></div>
				</div>

				<div className="kk" style={{marginTop:30}}>
					<KrField grid={1/2} label="名称" name="title" style={{width:262,marginLeft:30,marginTop:14}} component="input" requireLabel={true} inline={false}/>
                    <KrField grid={1/2} label="简介" name="desrc" style={{width:262,marginLeft:30,marginTop:14}} component="input" requireLabel={true} inline={false}/>
					<KrField grid={1/2} label="跳转url" name="targetUrl" style={{width:262,marginLeft:30,marginTop:14}} component="input" requireLabel={true} inline={false}/>
                   
                    <KrField grid={1/2} label="是否上线" name="published" style={{width:262,marginLeft:30,marginTop:14}} component="group" requireLabel={true} >
                        <KrField name="published" label="是" type="radio" value="1" style={{marginTop:5,display:'inline-block',width:84}}/>
                        <KrField name="published" label="否" type="radio" value="0" style={{marginTop:5,display:'inline-block',width:53}}/>
                    </KrField>
                    <div style = {{marginLeft:30,marginTop:14}}>
                        <KrField
                            name="logo"
                            component="mainNewsUploadImage"
                            innerstyle={{width:500,height:344,padding:10,marginLeft:-80}}
                            photoSize={'199*300'}
                            pictureFormat={'JPG,PNG,GIF'}
                            pictureMemoryM={'1'}
                            requestURI = {host + '/api/krspace-finance-web/activity/upload-pic'}
                            deviation = {"50*50"}
                            label="上传图片"
                            inline={false}
                            requireLabel={true}

                        />
                    </div>

				</div>
				<Grid style={{marginTop:15,marginRight:40}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>

								<div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit" /></div>

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
    let numContr =/^[1-9]\d{0,4}$/;
    var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    
    if(!values.title){
       errors.title='请填写名称';
    }else if(values.title.length>15){
       errors.title='名称不能超过15个字符';
    }
   if(!values.desrc){
    errors.desrc='请填写简介';
   }else if(values.desrc.length>30){
    errors.desrc='简介长度不能超过30个字符';
   }
   if(!values.targetUrl){
       errors.targetUrl='链接地址为必填字段';
   }else if(!reg.test(values.targetUrl)){
       errors.targetUrl='链接地址格式有误';
   }
   if(!values.orderNum){
       errors.orderNum='请填写排序号';
   }
   if(values.orderNum){
    var orderNum = (values.orderNum+'').replace(/(^\s*)|(\s*$)/g, "");
    if(!numContr.test(orderNum)){
        errors.orderNum = '排序号必须为五位以内正整数';
    }
}
   if(!values.logo){
       errors.logo='请上传图片';
   }


	return errors
}

export default reduxForm({ form: 'AddPic',validate})(AddPic);