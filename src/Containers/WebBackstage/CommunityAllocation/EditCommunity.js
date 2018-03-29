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
  DrawerTitle,
  Checkbox
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
  if(!fields.length){
    fields.push({})
  }
  return (
      <ul style={{padding:0,margin:0}}>
      {fields.map((porTypesStr, index) =>
       <li key={index} style={{width:600,listStyle:'none'}}><KrField
          style={{width:262,marginLeft:15}}
          grid={1/2}
          name={`${porTypesStr}.type`}
          options={[{label:'移动办公桌',value:'MOBILE_DESK'},{label:'固定办公桌',value:'OPEN_WORKSPACE'},{label:'独立办公室',value:'INDEPENDENT_WORKSPACE'}]}
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
        this.state={
          isCover:'',
          isInit:false,
          detailTip:false,
          chargeName:'社区负责人',
          isChargeName:false,
          disabled:false,
          baseFacilityList:[],
          baseServiceList:[],
          specialServcieList:[],
        }
        this.mask=false;
	}


  componentDidMount(){
      let {isCover}=this.props;
      this.setState({
          isCover:isCover,
      })
    }

  componentWillReceiveProps(nextProps){
     let {isInit,isChargeName}=this.state;
     
     if(!isInit && nextProps.isCover == "true"){
        this.setState({
          isCover:nextProps.isCover,
          isInit:true,
        })
     }
     
     if(!isChargeName && nextProps.chargeName ){
       this.setState({
          chargeName:nextProps.chargeName,
          isChargeName:true
        })
     }
     
     this.setState({
        baseFacilityList:nextProps.baseFacility,
        baseServiceList:nextProps.baseService,
        specialServcieList:nextProps.specialServcie
     })

     if(this.mask){
        return;
     }
     
     if(nextProps.cmtDiscountInfo=='NO_DISCOUNT'){
          this.setState({
            disabled:true
          })
      }else{
          this.setState({
            disabled:false
          })
      }

  }

	onSubmit = (values) => {
   

        if(values.porType.length<2){
             Message.error('至少选择两种工位类型');
             return ;
        }else{
           var num=0;
           var deNum=0;
           var openNum=0;
           var inNum=0;
           values.porType.map((item,index)=>{
               if(!item.type){
                   num=1;
               }else if(item.type=='MOBILE_DESK'){
                   deNum++;
               }else if(item.type=='OPEN_WORKSPACE'){
                   openNum++;
               }else if(item.type=='INDEPENDENT_WORKSPACE'){
                   inNum++;
               }
           })
           if(num==1){
                Message.error('请将工位类型选全');
                return ;
           }
           if(deNum==2||openNum==2||inNum==2){
                Message.error('工位类型不能重复');
                return ;
           }
        }

     if(values.cmtDiscountInfo!="NO_DISCOUNT"){
       if(values.cmtDiscountPrice==''){
          Message.error('请填写优惠价格');
          return ;
       }
     }
    
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
    }

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

   hasOfficeClick=(param)=>{

      if(param.value=='true'){
          this.setState({
              isCover:'true'
          })
      }else{
         this.setState({
              isCover:'false'
        })
      }
   }

   

   changeCharge = (data) =>{
      if(!data||(data&&data.length==0)){
        this.setState({
          chargeName:'社区负责人'
        })
      }
   }
   renderCheckbox=(checkboxList,listIndex)=>{
     if(checkboxList){
        return checkboxList.map((item,index)=>{
          return(
            <Checkbox
                key={index}
                style={{display:'inline-block',color:'#666'}}
                label={item.lableName}
                checked={item.changeStatus==1?true:false}
                onCheck={this.checked.bind(this,item,index,checkboxList,listIndex)}
            />
          )
      })
    }
  }
  checked=(item,index,checkboxList,listIndex)=>{
      let {
        baseFacilityList,
        baseServiceList,
        specialServcieList,
      }=this.state;
       if(item.changeStatus==0){
         checkboxList[index].changeStatus=1;
       }else{
         checkboxList[index].changeStatus=0;
       }
      if(listIndex=="0"){
        this.setState({
          baseFacilityList:checkboxList
        })
      }else if(listIndex=="1"){
        this.setState({
          baseServiceList:checkboxList
        })
      }else if(listIndex=="2"){
        this.setState({
          specialServcieList:checkboxList
        })
      }
       
   
  }
  onDiscountInfo=(item)=>{
    this.mask=true;
    if(item.value!='NO_DISCOUNT'){
      this.setState({
        disabled:false
      })
    }else{
      Store.dispatch(change('EditCommunity','cmtDiscountPrice',''));
      this.setState({
        disabled:true
      }) 
    }
  }

  checkLength=(item)=>{
    if(item.length>10){
       Message.error('标签不能大于10个字');
    }
   
  }



    render(){

        let {isCover,chargeName,detailTip,disabled,
          baseFacilityList,
          baseServiceList,
          specialServcieList,
        }=this.state;

        const {handleSubmit,
          addressPhotoUrl,
          outDetailImage,
          communityName,
          inDetailImage,
          stationDetailImage,opend,openDate,firstValue,listValue,stationValue} = this.props;

        var sortStyle={};
        var chartStyle={};
        if(isCover=='false'||isCover==false){
           sortStyle={
             width:262,marginLeft:15
           }
           chartStyle={
             width:262,marginLeft:30
           }
        }else if(isCover=='true'||isCover==true){
           sortStyle={
             width:262,marginLeft:25
           }
           chartStyle={
             width:262,marginLeft:15
           }
        }

    
        return (
            <div>
                <form className="web-communityList-m"  style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)}  onClick={this.closemm}>
                    <div className="title">
          <DrawerTitle title ='编辑社区配置' onCancel = {this.onCancel}/>

                    </div>
                    <div className="cheek">
                        <div className="titleBar"><span className="order-number">1</span><span className="wire"></span><label className="small-title">基本信息</label></div>
                        <div className="small-cheek">


                            <KrField grid={1/2} label="社区名称" inline={false} value={communityName?communityName:'无'} style={{width:262,marginLeft:18}} component="labelText"/>

                            <KrField grid={1/2} label="开业状态" inline={false} value={(opend?opend:'无')+(openDate?'('+openDate+')':'无')} style={{width:262,marginLeft:28}} component="labelText"/>


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
                                sizePhoto={true}
                                photoSize={'3:2'}
                                pictureFormat={'JPG,PNG,GIF'}
                                pictureMemory={'300'}
                                requestURI = '/api/krspace-finance-web/cmt/community/upload-photo/type/multi'
                                inline={false}
                                formfile='file '
                                defaultValue={stationValue}
                                center='center'
                            />


                    </div>


                    <div style={{display:'block'}}>
                        <div className="titleBar"><span className="order-number">3</span><span className="wire"></span><label className="small-title">官网信息</label></div>
                        <div className="small-cheek" style={{paddingBottom:0}}>
                            <KrField grid={1/2} label="是否企业定制" name="customed" style={{width:248,marginLeft:15}} component="group" requireLabel={true}>
                                <KrField name="customed" label="非定制" type="radio" value="false"  style={{marginTop:5,display:'inline-block',width:84}}/>
                                <KrField name="customed" label="定制" type="radio" value="true"  style={{marginTop:5,display:'inline-block',width:84}}/>
                            </KrField>
                            <KrField grid={1/2} label="是否允许预约" name="appoint" style={{width:200,marginLeft:40}} component="group" requireLabel={true}>
                                <KrField name="appoint" label="可预约" type="radio" value="true"  style={{marginTop:5,display:'inline-block',width:84}}/>
                                <KrField name="appoint" label="不可预约" type="radio" value="false" style={{marginTop:5,display:'inline-block',width:84}}/>
                            </KrField>
                            <KrField grid={1/2} label="是否显示覆盖标签" name="cover" style={{width:248,marginLeft:15}} component="group">
                                <KrField name="cover" label="显示" type="radio" value="true" onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
                                <KrField name="cover" label="不显示" type="radio" value="false" onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
                            </KrField>
                            <KrField grid={1/2} label="官网显示状态" name="show" style={{width:200,marginLeft:40}} component="group" requireLabel={true}>
                                <KrField name="show" label="显示" type="radio" value="true"  style={{marginTop:5,display:'inline-block',width:84}}/>
                                <KrField name="show" label="不显示" type="radio" value="false"  style={{marginTop:5,display:'inline-block',width:84}}/>
                            </KrField>

                            {(isCover=='true'||isCover==true)&&<KrField grid={1/2} label="覆盖标签内容" name="coverName" component="input" style={{width:262,marginLeft:15}}  requireLabel={true}/>}

                            <KrField grid={1/2} label="排序" name="sort" component="input" style={sortStyle}/>


                            <KrField style={chartStyle}  name="chargeId" component="searchPersonel" label="社区负责人" onChange = {this.changeCharge} placeholder={chargeName}/>

                            <FieldArray name="porType" component={renderStation} />
                            <KrField grid={1/2} label="优惠信息" name="cmtDiscountInfo" style={{width:500,marginLeft:15}} component="group" >
                                <KrField name="cmtDiscountInfo" label="无" type="radio" value="NO_DISCOUNT"  style={{marginTop:5,display:'inline-block',width:60}}  onClick={this.onDiscountInfo}/>
                                <KrField name="cmtDiscountInfo" label="开业特惠" type="radio" value="OPEN_DISCOUNT"  style={{marginTop:5,display:'inline-block',width:84}} onClick={this.onDiscountInfo}/>
                                <KrField name="cmtDiscountInfo" label="限时优惠" type="radio" value="TIME_DISCOUNT"  style={{marginTop:5,display:'inline-block',width:84}} onClick={this.onDiscountInfo}/>
                                <KrField name="cmtDiscountInfo" label="特价优惠" type="radio" value="SPECIAL_DISCOUNT"  style={{marginTop:5,display:'inline-block',width:84}} onClick={this.onDiscountInfo}/>
                            </KrField>
                            <div className="krFlied-box">
                                <KrField
                                    style={{width:153,marginLeft:15}}
                                    grid={1/2}
                                    name="cmtDiscountPrice"
                                    type="text"
                                    component={renderField}
                                    label="优惠价格"
                                    disabled={disabled}
                                    />
                                <span className="unit">元/工位/月</span>
                            </div>
                            <KrField  label="社区状态" name="communityStatus" style={{width:600,marginLeft:15}} component="group">
                                <KrField name="communityStatus" label="无" type="radio" value="NO_STATUS"  style={{marginTop:5,display:'inline-block',width:60}}/>
                                <KrField name="communityStatus" label="即将开业" type="radio" value="READY_OPEN"  style={{marginTop:5,display:'inline-block',width:84}}/>
                                <KrField name="communityStatus" label="工位充足" type="radio" value="STATION_FULL"  style={{marginTop:5,display:'inline-block',width:84}}/>
                                <KrField name="communityStatus" label="工位即将被租满" type="radio" value="STATION_FASTFULL"  style={{marginTop:5,display:'inline-block',width:140}}/>
                            </KrField>
                            <KrField  label="社区特色标签" name="cmtFeatureLable" style={{width:600,marginLeft:15}} component="group">
                                <KrField   
                                      name="label0" 
                                      component="input" 
                                      style={{width:150,marginLeft:'-10px',marginRight:15}}
                                      onBlur={this.checkLength}
                                />
                                <KrField   
                                      name="label1" 
                                      component="input" 
                                      style={{width:150,marginRight:15}}
                                      onBlur={this.checkLength}
                                />
                                <KrField   
                                      name="label2" 
                                      component="input" 
                                      style={{width:150,marginRight:15}}
                                      onBlur={this.checkLength}
                                />
                            </KrField>
                            
                            <div className='speakInfo' style={{marginBottom:3}}>
                                <KrField grid={1} label="社区简介" name="desc" style={{marginLeft:15}} heightStyle={{height:"140px",width:'538px'}}  component="textarea"  maxSize={300} placeholder='请输入社区简介' lengthClass='list-length-textarea'/>
                            </div>
                            <KrField
                                label="社区位置简略图"
                                name="addressPhotoUrl"
                                component="newuploadImage"
                                innerstyle={{width:245,height:171,padding:10}}
                                // sizePhoto={true}
                                // photoSize={'16:9'}
                                customTip="提示：图片比例500 * 254，图片由产品技术设计同事提供"
                                pictureFormat={'JPG,PNG,GIF'}
                                pictureMemory={'300'}
                                requestURI = '/api/krspace-finance-web/cmtbright/upload-pic'
                                inline={false}
                                merthd='Url'
                                picUrl={true}
                                defaultValue={addressPhotoUrl}
                                style={{marginLeft:15,}}
                                style={{textAlign:'left'}}
                            />
                             <div className="u-checkbox-content">
                                  <div className="u-checkbox-title">基础设施</div>
                                  <div className="u-checkbox-box">
                                    {this.renderCheckbox(baseFacilityList,'0')}
                                  </div>
                                </div>
                                <div className="u-checkbox-content">
                                  <div className="u-checkbox-title">基础服务</div>
                                  <div className="u-checkbox-box">
                                    {this.renderCheckbox(baseServiceList,'1')}
                                  </div>
                                </div>
                                <div className="u-checkbox-content">
                                  <div className="u-checkbox-title">特色服务</div>
                                  <div className="u-checkbox-box">
                                    {this.renderCheckbox(specialServcieList,'2')}
                                  </div>
                                </div>                   
                                <KrField grid={1} label="公共交通" name="traffic"  heightStyle={{height:"78px",width:'538px'}}  component="textarea"  maxSize={300} placeholder='请输入交通' style={{width:517,marginLeft:15}} lengthClass='list-len-textarea'/>
                                <KrField grid={1} label="停车信息" name="pakeingInfo" heightStyle={{height:"78px",width:'538px'}}  component="textarea"  maxSize={200} placeholder='请输入周边' style={{width:517,marginLeft:15}} lengthClass='list-len-textarea' />
                                <KrField grid={1} label="周边配套" name="arround" heightStyle={{height:"78px",width:'538px'}}  component="textarea"  maxSize={200} placeholder='请输入周边' style={{width:517,marginLeft:15}} lengthClass='list-len-textarea'/>
                               
                                   <div className='web-page-box'> <KrField 
                                         name="pageImageId"
                                         component="uploadImage"
                                         requestUrl='/api/krspace-finance-web/cmt/community/upload-photo/type/multi'
                                         style={{textAlign:'left'}}
                                         defaultValue={firstValue}
                                         inline={false}
                                         label='上传首页图片'
                                         requireLabel={true}
                                    /></div>



                                    <div className='web-page-box'> <KrField
                                       name="listImageId"
                                       component="uploadImage"
                                       requestUrl='/api/krspace-finance-web/cmt/community/upload-photo/type/multi'
                                       style={{textAlign:'left'}}
                                       defaultValue={listValue}
                                       inline={false}
                                       label='上传列表页图片'
                                       requireLabel={true}
                                    /></div>
                                  <div className='web-detail-img'>
                                      <KrField name="outDetailImage"
                                        component="uploadImageList"
                                        boxStyle={{marginLeft:-35,textAlign:'left'}}
                                        defaultValue={outDetailImage}
                                        imgFlag={false}
                                        innerBoxStyle={{width:254,height:70}}
                                        innerStyle={{left:110,top:12}}
                                        inline={false}
                                        label='上传详情页图片（室外环境）'
                                       
                                    />
                                    
                                  </div>
                                  <div className='web-detail-img'>
                                        <KrField name="inDetailImage"
                                              component="uploadImageList"
                                              boxStyle={{marginLeft:-35,textAlign:'left'}}
                                              defaultValue={inDetailImage}
                                              imgFlag={false}
                                              innerBoxStyle={{width:254,height:70}}
                                              innerStyle={{left:110,top:12}}
                                              inline={false}
                                              label='上传详情页图片（室内环境）'
                                             
                                          /> 
                                    </div>

                                    <div className='web-detail-img'>
                                      <KrField name="stationDetailImage"
                                          component="uploadImageList"
                                          boxStyle={{marginLeft:-35,textAlign:'left'}}
                                          defaultValue={stationDetailImage}
                                          imgFlag={false}
                                          innerBoxStyle={{width:254,height:70}}
                                          innerStyle={{left:110,top:12}}
                                          inline={false}
                                          label='上传详情页图片（社区工位）'
                                         
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

            if(!values.customed){
              errors.customed='请选择是否企业定制'
            }
            if(!values.appoint){
              errors.appoint='请选择是否允许预约'
            }
            if(!values.show){
              errors.show='请选择是否显示官网'
            }

            if(!values.specialServcie){
              errors.specialServcie='请填写特色服务'
            }
            if(!values.service){
              errors.service='请填写基础服务'
            }
            if(!values.facility){
              errors.facility='请填写基础设施'
            }
            if(!values.arround){
              errors.arround='请填写周边'
            }
            if(!values.traffic){
              errors.traffic='请填写交通'
            }
            
            if(values.discount&&values.discount.length>15){
              errors.discount='最多输入15个字符'
            }

            if(!values.pageImageId){
              errors.pageImageId='请上传首页图片'
            }
            if(!values.listImageId){
              errors.listImageId='请上传列表页图片'
            }

            if(!values.coverName){
              errors.coverName='请填写覆盖标签内容'
            }

            if(values.coverName&&values.coverName.length>5){
              errors.coverName='最多输入5个字符'
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
