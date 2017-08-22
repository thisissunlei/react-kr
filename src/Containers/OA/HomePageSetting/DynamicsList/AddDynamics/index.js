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

class AddDynamics extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
            jobTypes:[],
            isType :false,
             //是否为引用
            isCite:false,
        }
	}

    componentDidMount(){
        Store.dispatch(change('AddDynamics','articleType','INSIDE'))
    }

    onSubmit=(values)=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }
    typeChange = (detail) =>{

        var isCite = false;
        if(detail.value == "OUTSIDE"){

            isCite = true

        }else{
            isCite = false
        }
        this.setState({
            isCite,
        })

    }

	render(){

        let {handleSubmit,subCompany}=this.props;
        let {jobTypes,isType,isCite} = this.state;
        // let host = "http://"+window.location.host;
        let host = "http://optest02.krspace.cn/";

		return(

			<div className='m-add-swper'>
				 <form  onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
				<div className="title">
						<div><span className="order-new-icon"></span><label className="title-text">新建动态</label></div>
						<div className="order-close" onClick={this.onCancel}></div>
				</div>

				<div className="kk" style={{marginTop:30}}>
					<KrField grid={1/2} label="标题" name="title" style={{width:262,marginLeft:15,marginTop:14}} component="input" requireLabel={true} inline={false}/>
                    <KrField grid={1/2} label="文章类型" name="articleType" component="select" style={{width:262,marginLeft:28,marginTop:14}}
                        options={[{label:"站内发表",value:"INSIDE"},{label:"外部链接",value:"OUTSIDE"}]}
                        requireLabel={false}
                        onChange = {this.typeChange}
                    />
                    {isCite && <KrField grid={1/2} label="地址链接" name="linkUrl" style={{width:262,marginLeft:15,marginTop:14}} component="input" requireLabel={true} inline={false}/>}


                    <div style = {{marginLeft:15,marginTop:14}}>
                        <KrField
                            name="titleUrl"
                            component="newuploadImage"
                            innerstyle={{width:202,height:150,padding:10,marginLeft:-80}}
                            photoSize={'202*150'}
                            pictureFormat={'JPG,PNG,GIF'}
                            pictureMemory={'200'}
                            requestURI = {host + '/api/krspace-finance-web/activity/upload-pic'}
                            deviation = {"50*50"}
                            label="上传标题图片"
                            inline={false}
                            requireLabel={true}
                        />
                    </div>
                    {!isCite && <div style = {{marginTop:14}}>
                        <KrField component="editor" name="content" label="内容" defaultValue=''/>
                    </div>}
                     {/*{isCite && <div style = {{marginTop:14}}>
                        <KrField component="editor" name="content" label="内容" defaultValue=''/>
                    </div>}*/}

				</div>
				<Grid style={{marginTop:30,marginRight:40}}>
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

//     if(!values.name){
//        errors.name='请填写职级名称';
//     }else if(values.name.length>10){
//        errors.name='职级名称不能超过10个字符';
//     }

//    if(!values.typeId){
//        errors.typeId='请选择职务类型';
//    }

//    if(!values.level){
//        errors.level='请填写等级';
//    }else if(isNaN(values.level)){
//        errors.level='等级必须是数字'
//    }else if(values.level>30){
//        errors.level='等级最大不超过30'
//    }


	return errors
}

export default reduxForm({ form: 'AddDynamics',validate})(AddDynamics);
