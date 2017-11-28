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

class EditSwper extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
            jobTypes:[],
            isType :false,
            photoUrl:props.photoUrl || ''
        }
	}

    componentDidMount(){
        Store.dispatch(change('AddRankList','enable','1'))
    }
    onChange = (data) =>{
       Store.dispatch(change('AddRankList','typeId',''));
       this.dataReady(data);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.photoUrl && nextProps.photoUrl != this.state.photoUrl){
            this.setState({
                photoUrl:nextProps.photoUrl
            })
        }

    }
    deletePhoto = () =>{
        this.setState({
            photoUrl:''
        })
    }

    //类型
	dataReady=(data)=>{
       var _this=this;
	   Http.request('rank-type-info',{
		   orgType:'SUBCOMPANY',
		   orgId:data.value
	   }).then(function(response) {

		   _this.setState({
			    jobTypes:response.jobTypes,
                isType:true,
		  })

     }).catch(function(err) {
          Message.error(err.message);
     });
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
        let {jobTypes,isType,photoUrl} = this.state;
        let host = "http://"+window.location.host;

		return(

			<div className='m-edit-swper'>
				 <form  onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
				<div className="title">
          <DrawerTitle title ="编辑轮播图" onCancel = {this.onCancel}/>
				</div>

				<div className="kk" style={{marginTop:30}}>
					<KrField grid={1/2} label="名称" name="name" style={{width:262,marginLeft:15,marginTop:14}} component="input" requireLabel={true} inline={false}/>
					<KrField grid={1/2} label="链接地址" name="linkUrl" style={{width:262,marginLeft:30,marginTop:14}} component="input" requireLabel={true} inline={false}/>
					<KrField grid={1/2} label="排序号" name="orderNum" style={{width:262,marginLeft:15,marginTop:14}} component="input" requireLabel={true} inline={false}/>


                    <KrField grid={1/2}
											label="是否已上线"
											name="enable"
											style={{width:262,marginLeft:30,marginRight:13,marginTop:14}}
											component="group"
											requireLabel={true}
										>
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
                            defaultValue={photoUrl}
							onDeleteImg ={this.deletePhoto}
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
    var ord = /^[1-9]\d*$/;
    if(!values.name){
       errors.name='请填写职级名称';
    }else if(values.name.length>20){
       errors.name='名称不能超过20个字符';
    }

   if(!values.linkUrl){
       errors.linkUrl='链接地址为必填字段';
   }else if(!reg.test(values.linkUrl)){
       errors.linkUrl='链接地址格式有误';
   }
   if(!ord.test(values.orderNum)){
       errors.orderNum = "排序号只能为正整数"
   }

   if(!values.photoUrl){
       errors.photoUrl='请上传图片';
   }
   return errors
}

export default reduxForm({ form: 'EditSwper',validate})(EditSwper);
