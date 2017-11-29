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
var pubilcIsCite = false;
class EditDynamics extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
            jobTypes:[],
            isType :false,
            //是否为引用
            isCite:false,
            titleUrl:props.titleUrl || '',
            isType:true,


        }
	}

    componentDidMount(){
        // Store.dispatch(change('AddRankList','enabled','true'))
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.titleUrl && nextProps.titleUrl != this.state.titleUrl){
            this.setState({
                titleUrl:nextProps.titleUrl
            })
        }
        if(nextProps.content && nextProps.content != this.state.content){

            this.setState({
                content:nextProps.content,
            })
        }

        if(nextProps.type && this.state.isType){

            if(nextProps.type == "OUTSIDE" && this.state.isCite){
                pubilcIsCite = false;
                this.setState({
                    isCite:false,
                    isType:false
                })

            }
            if(nextProps.type == "INSIDE" && !this.state.isCite){
                pubilcIsCite = true;
                this.setState({
                    isCite:true,
                    isType:false
                })
            }

        }

    }
    onSubmit=(values)=>{
        const {onSubmit} = this.props;
        const {isCite} = this.state;
        values = Object.assign({},values);
        if(isCite){
            values.desc = '';
            values.linkUrl='';

        }else{
            values.content = '';
            
        }
        
        onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }
    typeChange = (detail) =>{
        var isCite = false;
        let {content} = this.props;
        if(detail.value == "OUTSIDE"){
            pubilcIsCite = false;
            isCite = false;

        }else{
            pubilcIsCite = true;
            isCite = true;

        }
        this.setState({
            isCite,
        })

    }
    deletePhoto = () =>{
        this.setState({
            titleUrl:''
        })
    }
	render(){

        let {handleSubmit,subCompany}=this.props;
        let {jobTypes,isType,isCite,titleUrl,content} = this.state;
        let host = "http://"+window.location.host;

        var editorLabel = "";
        if(isCite){
            
            editorLabel = "内容";
        }else{
            
            editorLabel = "简介"
        }
        
        // let host = "http://optest02.krspace.cn/";
		return(

			<div className='m-edit-swper'>
				 <form  onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
				<div className="title">
                    <DrawerTitle title ="编辑动态" onCancel = {this.onCancel}/>
				</div>

				<div className="kk" style={{marginTop:30}}>
					<KrField grid={1/2} label="标题" name="title" style={{width:262,marginLeft:15,marginTop:14}} component="input" requireLabel={true} inline={false}/>
                    <KrField grid={1/2} equireLabel={true} label="文章类型" name="articleType" component="select" style={{width:262,marginLeft:28,marginTop:14}}
                        options={[{label:"站内发表",value:"INSIDE"},{label:"外部链接",value:"OUTSIDE"}]}
                        requireLabel={true}
                        onChange = {this.typeChange}

                    />
					{!isCite && <KrField grid={1/2} label="地址链接" name="linkUrl" style={{width:262,marginLeft:15,marginTop:14}} component="input" requireLabel={true} inline={false}/>}

                    <div style = {{marginLeft:15,marginTop:14}}>
                        <KrField
                            name="titleUrl"
                            component="newuploadImage"
                            innerstyle={{width:222,height:179,padding:10,marginLeft:-80}}
                            photoSize={'202*150'}
                            pictureFormat={'JPG,PNG,GIF'}
                            pictureMemory={'200'}
                            requestURI = {host + '/api/krspace-finance-web/activity/upload-pic'}
                            deviation = {"50*50"}
                            defaultValue={titleUrl}
							onDeleteImg ={this.deletePhoto}
                            label="上传标题图片"
                            inline={false}
                            requireLabel={false}
                        />
                    </div>

				</div>
                  <div  style = {{marginTop:14,display:isCite? 'block':'none'}}>
                         <KrField component="editor" requireLabel={true} name="content" label = "内容" defaultValue={content||''}/>
                </div>
                {!isCite && <div style = {{marginTop:14}}>
                        <KrField component="textarea" requireLabel={true} name="desc" onChange = {this.editorChange} label="简介" />
                </div>}
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
    var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    if(!values.linkUrl){
        errors.linkUrl='链接地址为必填字段';
    }else if(!reg.test(values.linkUrl)){
        errors.linkUrl='链接地址格式有误';
    }
    if(!values.title){
       errors.title='标题为必填项';
    }else if(values.title.length>50){
       errors.title='标题不能超过50个字符';
    }
    if(!values.articleType){
        errors.articleType='文章类型为必填项';
    }
    if(pubilcIsCite){
        if(!values.content){
            errors.content = '内容为必填项'
        }
    }
    

    if(!values.desc){
        errors.desc = '简介为必填项'
    }
	return errors
}

export default reduxForm({ form: 'EditDynamics',validate})(EditDynamics);
