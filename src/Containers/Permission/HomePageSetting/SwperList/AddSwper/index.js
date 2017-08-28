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

class AddSwper extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
            jobTypes:[],
            isType :false,

        }
	}

    componentDidMount(){
        Store.dispatch(change('AddSwper','enable',"1"))
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
        // let host = "http://optest02.krspace.cn/"


		return(

			<div className='m-add-swper'>
				 <form  onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
				<div className="title">
						<div><span className="order-new-icon"></span><label className="title-text">新建轮播图</label></div>
						<div className="order-close" onClick={this.onCancel}></div>
				</div>

				<div className="kk" style={{marginTop:30}}>
					<KrField grid={1/2} label="名称" name="name" style={{width:262,marginLeft:15,marginTop:14}} component="input" requireLabel={true} inline={false}/>
					<KrField grid={1/2} label="链接地址" name="linkUrl" style={{width:262,marginLeft:30,marginTop:14}} component="input" requireLabel={true} inline={false}/>
                    <KrField grid={1/2} label="是否上线" name="enable" style={{width:262,marginLeft:15,marginRight:13,marginTop:14}} component="group" requireLabel={true} >
                        <KrField name="enable" label="是" type="radio" value="1" style={{marginTop:5,display:'inline-block',width:84}}/>
                        <KrField name="enable" label="否" type="radio" value="0" style={{marginTop:5,display:'inline-block',width:53}}/>
                    </KrField>
                    <div style = {{marginLeft:15,marginTop:14}}>
                        <KrField
                            name="photoUrl"
                            component="newuploadImage"
                            innerstyle={{width:500,height:344,padding:10,marginLeft:-80}}
                            photoSize={'500*334'}
                            pictureFormat={'JPG,PNG,GIF'}
                            pictureMemory={'200'}
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

    var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    
    if(!values.name){
       errors.name='请填写名称';
    }else if(values.name.length>20){
       errors.name='名称不能超过20个字符';
    }

   if(!values.linkUrl){
       errors.linkUrl='链接地址为必填字段';
   }else if(!reg.test(values.linkUrl)){
       errors.linkUrl='链接地址格式有误';
   }

   if(!values.photoUrl){
       errors.photoUrl='请上传图片';
   }


	return errors
}

export default reduxForm({ form: 'AddSwper',validate})(AddSwper);
