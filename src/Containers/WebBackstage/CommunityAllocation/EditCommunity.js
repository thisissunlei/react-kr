import React from 'react';
import {DateFormat,Http} from 'kr/Utils';
import {reduxForm,initialize,change,FieldArray} from 'redux-form';
import {Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
} from 'kr-ui';
import './index.less';


const renderField = ({ input, label, placeholder,type, meta: { touched, error }}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label||placeholder}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

//工位价格
const renderStation = ({ fields, meta: { touched, error }}) => {
  return (
      <ul style={{padding:0,margin:0}}>
      {fields.map((porTypesStr, index) =>
       <li key={index} style={{width:600,listStyle:'none'}}><KrField
          style={{width:262,marginLeft:15}}
          grid={1/2}
          name={`${porTypesStr}.type`}
          options={[{label:'移动办公桌',value:'MOBILE_DESK'},{label:'开放工作区',value:'OPEN_WORKSPACE'},{label:'独立工作区',value:'INDEPENDENT_WORKSPACE'}]}
          component='select'
          label="工位类型"/>
        <div className="krFlied-box"><KrField
          style={{width:153,marginLeft:30,marginRight:3}}
          grid={1/2}
          name={`${porTypesStr}.typePrice`}
          type="text"
          component={renderField}
          label="工位价格"/>
          <span className="unit">元/工位/月</span>
        </div>
        <span onClick={() => fields.insert(index+1,{})} className='addBtn'></span>
        <span
          className='minusBtn'
          onClick={() => fields.remove(index)}/>
      </li>
    )}
  </ul>

 )
}


 class EditCommunity extends React.Component{
	constructor(props){
		super(props);
	}


    componentDidMount(){
      Store.dispatch(change('EditCommunity','porType',[{}]));
    }

	onSubmit = (values) => {
        if(values.porType.length<2){
             Message.error('至少选择两种工位类型');
             return ;
        }else{
           values.porType.map((item,index)=>{
               if(!item.type){
                   Message.error('请选择工位类型');
                   return ;
               }
           }) 
        }
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
    }

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}



    render(){



        const {handleSubmit,communityName,opend,openDate} = this.props;



        return (
            <div>
                <form className="web-communityList-m"  style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)}  onClick={this.closemm}>
                    <div className="title">
                        <div><span className="new-icon list-icon"></span><label className="title-text">编辑社区配置</label></div>
                        <div className="customer-close" onClick={this.onCancel}></div>
                    </div>
                    <div className="cheek">
                        <div className="titleBar"><span className="order-number">1</span><span className="wire"></span><label className="small-title">基本信息</label></div>
                        <div className="small-cheek">


                            <KrField grid={1/2} label="社区名称" inline={false} value={communityName} style={{width:262,marginLeft:18}} component="labelText"/>

                            <KrField grid={1/2} label="开业状态" inline={false} value={opend+'('+openDate+')'} style={{width:262,marginLeft:28}} component="labelText"/>

                        
                    </div>
                        <div className="titleBar"><span className="order-number">2</span><span className="wire"></span><label className="small-title">移动工位</label></div>
                        <div className="small-cheek">


                            <KrField grid={1/2} label="工位个数" name="stationNum" style={{width:262,marginLeft:18}} component="input"/>

                            <KrField grid={1/2} label="单价(积分/天)" name="price" style={{width:262,marginLeft:28}} component="input"/>

                            <KrField
                                label=""
                                name="stationImageId"
                                component="newuploadImage"
                                innerstyle={{width:364,height:254,padding:16}}
                                sizePhoto
                                photoSize={'3:2'}
                                pictureFormat={'JPG,PNG,GIF'}
                                pictureMemory={'300'}
                                requestURI = '/api/krspace-finance-web/cmt/community/upload-photo/type/multi'
                                inline={false}
                                formfile=' '
                                //defaultValue={defaultValue}
                                center='center'
                            />

                        
                    </div>


                    <div style={{display:'block'}}>
                        <div className="titleBar"><span className="order-number">3</span><span className="wire"></span><label className="small-title">官网信息</label></div>
                        <div className="small-cheek" style={{paddingBottom:0}}>
                            <KrField grid={1/2} label="是否企业定制" name="customed" style={{width:248,marginLeft:15}} component="group">
                                <KrField name="customed" label="非定制" type="radio" value='false' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
                                <KrField name="customed" label="定制" type="radio" value='true' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
                            </KrField>
                            <KrField grid={1/2} label="是否允许预约" name="appoint" style={{width:200,marginLeft:35}} component="group">
                                <KrField name="appoint" label="可预约" type="radio" value='true' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
                                <KrField name="appoint" label="不可预约" type="radio" value='false' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
                            </KrField>
                            <KrField grid={1/2} label="是否显示覆盖标签" name="cover" style={{width:248,marginLeft:15}} component="group">
                                <KrField name="cover" label="显示" type="radio" value='true' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
                                <KrField name="cover" label="不显示" type="radio" value='false' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
                            </KrField>
                            <KrField grid={1/2} label="官网显示状态" name="show" style={{width:200,marginLeft:35}} component="group" requireLabel={true}>
                                <KrField name="show" label="显示" type="radio" value='true' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
                                <KrField name="show" label="不显示" type="radio" value='false' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
                            </KrField>

                            <KrField grid={1/2} label="覆盖标签内容" name="coverName" component="input" style={{width:262,marginLeft:15}} onChange={this.communityRankChange}/>
                        
                            <KrField grid={1/2} label="排序" name="sort" component="input" style={{width:262,marginLeft:25}} onChange={this.communityRankChange}/>

                            <KrField style={{width:262,marginLeft:15}}  name="chargeId" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel}/>
                            
                            <FieldArray name="porType" component={renderStation} />

                            <div className='speakInfo' style={{marginBottom:3}}><KrField grid={1} label="社区简介" name="desc" style={{marginLeft:15}} heightStyle={{height:"140px",width:'538px'}}  component="textarea"  maxSize={200} placeholder='请输入社区简介' lengthClass='list-length-textarea'/></div>
                                <KrField grid={1} label="基础设施" name="facility" heightStyle={{height:"78px",width:'538px'}}  component="textarea"  maxSize={100} placeholder='请输入基础设施' style={{width:517,marginLeft:15}} lengthClass='list-len-textarea'/>                                        
                                <KrField grid={1} label="基础服务" name="service"  heightStyle={{height:"78px",width:'538px'}}  component="textarea"  maxSize={100} placeholder='请输入基础服务' style={{width:517,marginLeft:15}} lengthClass='list-len-textarea'/>
                                <KrField grid={1} label="特色服务" name="specialServcie" heightStyle={{height:"78px",width:'538px'}}  component="textarea"  maxSize={100} placeholder='请输入特色服务' style={{width:517,marginLeft:15}} lengthClass='list-len-textarea'/>
                                <KrField grid={1} label="交通" name="traffic"  heightStyle={{height:"78px",width:'538px'}}  component="textarea"  maxSize={100} placeholder='请输入交通' style={{width:517,marginLeft:15}} lengthClass='list-len-textarea'/>
                                <KrField grid={1} label="周边" name="arround" heightStyle={{height:"78px",width:'538px'}}  component="textarea"  maxSize={100} placeholder='请输入周边' style={{width:517,marginLeft:15}} lengthClass='list-len-textarea'/>

                                <div style={{marginTop:'16px'}}>
                                    <span className='upload-pic-first'>上传首页图片</span>
                                    <KrField 
                                         name="pageImageId"
                                         component="uploadImage"
                                         requestUrl='http://optest.krspace.cn/api/krspace-finance-web/cmt/community/upload-photo/type/multi'
                                         style={{textAlign:'left', marginLeft: '30px',marginTop: '10px'}}
                                    />
                                </div>

                                <div style={{marginTop:'16px'}}>
                                    <span className='upload-pic-first'>上传列表页图片</span>
                                    <KrField 
                                       name="listImageId"
                                       component="uploadImage"
                                       requestUrl='http://optest.krspace.cn/api/krspace-finance-web/cmt/community/upload-photo/type/multi'
                                       style={{textAlign:'left', marginLeft: '30px',marginTop: '10px'}}
                                    />
                                </div>

                                <div style={{marginTop:'16px'}}>
                                    <span className='upload-pic-first'>上传详情页图片</span>
                                    <KrField name="detailImageId"
                                        component="uploadImageList"
                                        style={{marginTop:10,textAlign:'left'}}
                                        //defaultValue={photoD}
                                        imgFlag={false}
                                        innerBoxStyle={{width:254,height:70}}
                                        innerStyle={{left:110,top:12}}
                                        />
                                </div>

                            </div>
                            <div className="end-round"></div>
                        </div>


                    </div>
                    <Grid style={{marginTop:30}}>
                        <Row>
                            <Col md={12} align="center">
                                <ButtonGroup>
                                    <div  className='list-btn-center'><Button  label="确定" type="submit"/></div>
                                    <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel}/>
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
			let stationN = /^([1-9][0-9]{0,2})$/;
            let stationNP=/^([0-9][0-9]{0,4})$/;
			//正整数
			let numberNotZero=/^[0-9]*[1-9][0-9]*$/;
		
			
            

	        //工位校验
	        if (!values.porType || !values.porType.length) {
	           errors.porType = { _error: 'At least one member must be entered' }
	         } else {
	           const membersArrayErrors = []
	           values.porType.forEach((porTypes, memberIndex) => {
	             const memberErrors = {}
	             if (porTypes.typePrice&&porTypes.typePrice.toString().trim()&&!stationNP.test(porTypes.typePrice.toString().trim())) {
	               memberErrors.typePrice = '价格不超过五位整数'
	               membersArrayErrors[memberIndex] = memberErrors
	             }
	           })
	         if(membersArrayErrors.length) {
	           errors.porType = membersArrayErrors
	         }
	       }


	    
            //排序
            if(values.sort&&isNaN(values.sort)){
            errors.sort='请输入数字';
            }
            if(values.sort&&values.sort.length>3){
            errors.sort = '最多输入3个字符';
            }
            if(values.sort&&values.sort.toString().trim()&&!stationN.test(values.sort.toString().trim())){
            errors.sort = '请输入3位以内正整数,不能以0开头';
            }


	       if(values.stationNum&&(!numberNotZero.test(values.stationNum.toString().trim())&&values.stationNum!=0)){
	         errors.stationNum='工位数为正整数或0'
	       }
	       if(values.price&&(!numberNotZero.test(values.price.toString().trim())&&values.price!=0)){
	         errors.price='工位单价为正整数或0'
	       }

	 	   if(values.stationNum&&values.stationNum.toString().trim().length>5){
	         errors.stationNum='工位数最多5位'
	       }
	       if(values.price&&values.price.toString().trim().length>5){
	         errors.price='工位单价最多5位'
	       }

			return errors
		}
		export default reduxForm({ form: 'EditCommunity',validate})(EditCommunity);
