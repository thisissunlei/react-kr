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

class EditSwper extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
            jobTypes:[],
            isType :false,
            photoUrl:''
        }
	}

    componentDidMount(){
        Store.dispatch(change('AddRankList','enable','1'))
    }
    onChange = (data) =>{
       Store.dispatch(change('AddRankList','typeId',''));
       this.dataReady(data); 
    }
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.photoUrl && nextProps.photoUrl != this.state.photoUrl){
    //         this.setState({
    //             photoUrl:nextProps.photoUrl
    //         })
    //     }

    // }

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
        let {jobTypes,isType} = this.state;
        let host = "http://"+window.location.host;

		return(

			<div className='m-edit-swper'>
				 <form  onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
				<div className="title">
						<div><span className="order-new-icon"></span><label className="title-text">新建</label></div>
						<div className="order-close" onClick={this.onCancel}></div>
				</div>

				<div className="kk" style={{marginTop:30}}>
					<KrField grid={1/2} label="名称" name="name" style={{width:262,marginLeft:15}} component="input" requireLabel={true} inline={false}/>
					<KrField grid={1/2} label="链接地址" name="linkUrl" style={{width:262,marginLeft:30}} component="input" requireLabel={true} inline={false}/>
                    <KrField grid={1/2} label="是否已上线" name="enable" style={{width:262,marginLeft:15,marginRight:13}} component="group">
                        <KrField name="enable" label="是" type="radio" value="YES" style={{marginTop:5,display:'inline-block',width:84}}/>
                        <KrField name="enable" label="否" type="radio" value="NO" style={{marginTop:5,display:'inline-block',width:53}}/>
                    </KrField>
                    <div style = {{marginLeft:15}}>
                        <KrField
                            name="photoUrl"
                            component="newuploadImage"
                            innerstyle={{width:500,height:300,padding:10,marginLeft:-80}}
                            photoSize={'500*300'}
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
				<Grid style={{marginTop:0,marginRight:40}}>
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

    if(!values.name){
       errors.name='请填写职级名称';  
    }else if(values.name.length>10){
       errors.name='职级名称不能超过10个字符';   
    }
   
   if(!values.typeId){
       errors.typeId='请选择职务类型';
   }

   if(!values.level){
       errors.level='请填写等级';
   }else if(isNaN(values.level)){
       errors.level='等级必须是数字'
   }else if(values.level>30){
       errors.level='等级最大不超过30'
   }
   
    
	return errors
}

export default reduxForm({ form: 'EditSwper',validate})(EditSwper);