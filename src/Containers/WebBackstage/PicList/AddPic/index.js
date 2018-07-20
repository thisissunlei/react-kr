import React from 'react';
import {
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    DrawerTitle,
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
            cityData:[],

        }
	}

    componentDidMount(){
        Store.dispatch(change('AddPic','published',"1"))
        this.getCity();
    }


    onSubmit=(values)=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        
        onCancel && onCancel();
    }

    getCity=()=>{
        var _this = this;
        Http.request('get-city', {}).then(function(response) {
            var data = response.items;
            data.map((item,index)=>{
                item.label = item.name;
                item.value = item.id;
            })
            _this.setState({
                cityData:data,
            })
            // Store.dispatch(initialize('editNewList',response));
            
        })
    }

	render(){

        let {handleSubmit,subCompany}=this.props;
        let {jobTypes,isType} = this.state;
        let host = location.protocol +"//"+window.location.host;
        //  let host = "http://optest03.krspace.cn/"


		return(

			<div className='m-add-pic'>
				 <form  onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
				<div className="title">
          <DrawerTitle title ='新建轮播图' onCancel = {this.onCancel}/>
				</div>

				<div className="kk" style={{marginTop:30,paddingLeft:10}}>
					<KrField grid={1/2} label="社区名称" name="communityName" style={{width:262,marginLeft:30,marginTop:14}} component="input" requireLabel={true} inline={false}/>
                    <KrField grid={1/2} label="社区状态" name="communityStatus" style={{width:262,marginLeft:30,marginTop:14}} component="input" requireLabel={true} inline={false}/>
                    <KrField grid={1/2} label="社区概述" name="communityDesc" style={{width:262,marginLeft:30,marginTop:14}} component="input" requireLabel={true} inline={false}/>
                    <KrField grid={1/2} label="小图标题" name="communityTitle" style={{width:262,marginLeft:30,marginTop:14}} component="input" requireLabel={true} inline={false}/>
                    <KrField grid={1/2} label="社区ID" name="communityId" style={{width:262,marginLeft:30,marginTop:14}} component="input" requireLabel={true} inline={false}/>
                    {/* <KrField grid={1/2} label="简介" name="desrc" style={{width:262,marginLeft:30,marginTop:14}} component="input" requireLabel={true} inline={false}/> */}
					{/* <KrField grid={1/2} label="跳转url" name="targetUrl" style={{width:262,marginLeft:30,marginTop:14}} component="input" requireLabel={true} inline={false}/> */}
                   
                    <KrField grid={1/2} label="是否上线" name="published" style={{width:262,marginLeft:30,marginTop:14}} component="group" requireLabel={true} >
                        <KrField name="published" label="是" type="radio" value="1" style={{marginTop:5,display:'inline-block',width:84}}/>
                        <KrField name="published" label="否" type="radio" value="0" style={{marginTop:5,display:'inline-block',width:53}}/>
                    </KrField>
                    <KrField grid={1/2} equireLabel={true} label="社区所在城市" name="cityId" component="select" style={{width:262,marginLeft:28,marginTop:14}}
                        options={this.state.cityData}
                        requireLabel={true}
                    />

                    
                    <div style = {{marginLeft:30,marginTop:14}}>
                        <KrField
                            name="logo"
                            component="mainNewsUploadImage"
                            innerstyle={{width:500,height:344,padding:10,marginLeft:-80}}
                            photoSize={'199*300'}
                            pictureFormat={'JPG,PNG,GIF'}
                            pictureMemoryM={'5'}
                            requestURI = {host + '/api/krspace-finance-web/por-mobile-pic/upload-pic'}
                            deviation = {"50*50"}
                            label="上传图片(尺寸:1920*600)"
                            inline={false}
                            requireLabel={true}

                        />
                    </div>
                    <div style = {{marginLeft:30,marginTop:14}}>
                        <KrField
                            name="smallPic"
                            component="mainNewsUploadImage"
                            innerstyle={{width:200,height:100,padding:10,marginLeft:-80}}
                            photoSize={'199*300'}
                            pictureFormat={'JPG,PNG,GIF'}
                            pictureMemory={'200'}
                            requestURI = {host + '/api/krspace-finance-web/por-mobile-pic/upload-pic'}
                            deviation = {"50*50"}
                            label="上传缩略图(尺寸:160*90)"
                            inline={false}
                            requireLabel={true}

                        />
                    </div>
                    <div style = {{marginLeft:30,marginTop:14}}>
                        <KrField
                            name="mobilePic"
                            component="mainNewsUploadImage"
                            innerstyle={{width:400,height:250,padding:10,marginLeft:-80}}
                            photoSize={'199*300'}
                            pictureFormat={'JPG,PNG,GIF'}
                            pictureMemoryM={'3'}
                            requestURI = {host + '/api/krspace-finance-web/por-mobile-pic/upload-pic'}
                            deviation = {"50*50"}
                            label="上传M站图(尺寸:1125*843)"
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
    
    if(!values.communityName){
       errors.communityName='communityName';
    }else if(values.communityName.length>15){
       errors.communityName='社区名称不能超过15个字符';
    }
   if(!values.communityStatus){
    errors.communityStatus='请填写社区状态';
   }else if(values.communityStatus.length>8){
    errors.communityStatus='社区状态长度不能超过8个字符';
   }
   if(!values.communityDesc){
    errors.communityDesc='请填写社区概述';
   }else if(values.communityDesc.length>20){
    errors.communityDesc='社区状态概述不能超过20个字符';
   }
   if(!values.communityTitle){
    errors.communityTitle='请填写小图标题';
   }else if(values.communityTitle.length>15){
    errors.communityTitle='小图标题不能超过15个字符';
   }
   if(!values.communityId){
    errors.communityId='请填写社区ID';
   }
   if(!values.cityId){
    errors.cityId='请选择城市';
   }
   

   if(!values.logo){
       errors.logo='请上传PC轮播图';
   }

   if(!values.smallPic){
        errors.smallPic='请上传PC缩略图';
    }
    if(!values.mobilePic){
        errors.mobilePic='请上传M站图';
    }


	return errors
}

export default reduxForm({ form: 'AddPic',validate})(AddPic);
