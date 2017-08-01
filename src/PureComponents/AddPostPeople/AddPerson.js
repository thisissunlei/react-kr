import React from 'react';
import {	
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button,
    Message
} from 'kr-ui';
import {reduxForm,change,formValueSelector}  from 'redux-form';
import {Store,connect} from 'kr/Redux';
import {Http} from 'kr/Utils'
import './index.less';

class AddPerson  extends React.Component{

	constructor(props,context){

		super(props, context);

        this.state = {
            positionList:[],
            rankList:[],
            positionType:[],
            isPositionRank:false,
            //选择部门
            isDepSelect:true,
            basicInfo:{
                jobName:"",
                levelName:'',
            },
            //控制职务类型是否出现
            isType:false
        }

}
    

    componentDidMount(){
      let {orgDetail}=this.props;
      Store.dispatch(change('addPerson','sex','MALE'));
      Store.dispatch(change('addPerson','depId',orgDetail[0].orgId));
      this.getPositionType(orgDetail[0]);
    }

    onSubmit=(values)=>{
        let params = Object.assign({},values);
        params.jobId = values.jobId.value;
        if(values.leader){
            params.leader = values.leader[0].orgId;
            params.treeType = values.leader[0].treeType;
        }    
        params.levelId = values.levelId.value;
        if(typeof (values.depId)=='number'){
           params.depId=values.depId;
        }else{
           params.depId=values.depId[0].orgId;       
        }

        const {onSubmit}=this.props;
        onSubmit && onSubmit(params);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }
    onChange = (data) =>{
         Store.dispatch(change('addPerson','typeId',''));
         this.setState({
            isPositionRank:false,
            isType:true
        })
        this.getPositionType(data[0]);
    }
    // zhiwu-type
    positionTypeChange = (data) =>{
       
        this.getPrepareData(data);
        let {basicInfo}=this.state;
         if(data && data.value){
            this.getPrepareData(data);
            this.setState({
                isDepSelect:true,
                basicInfo
            })
        }else{
            this.setState({
                basicInfo
            })
        }
              
        Store.dispatch(change('addPerson','jobId',''));  
        Store.dispatch(change('addPerson','levelId',''));
    }
    
    getPositionType = (param) =>{
        var that = this;
        Http.request('get-position-type-list',{orgType:param.treeType,orgId:param.orgId}).then(function(response) {
             that.setState({
                 positionType:response.jobTypes,
                 
             })
        }).catch(function(err) {

        });
    }
    getPrepareData = (param) =>{
        const _this = this; 
       
        Http.request('get-position-list',{typeId:param.value}).then(function(response) {
            console.log("OOOOOOOOO")
             _this.setState({
                 positionList:response,
                 isPositionRank:true,
             
             })
        }).catch(function(err) {

        });


        Http.request('get-rank-list',{typeId:param.value}).then(function(response) {
             _this.setState({
                 rankList:response
             })
        }).catch(function(err) {

        });
    }

	renderJobAndLevel =()=>{


        let {
                rankList,
                positionList,
                isPositionRank,
                positionType,
                isDepSelect,
                basicInfo,
                isType
            } = this.state;

		if(!isPositionRank){
			return null;
		};
		

		return (
		<div>

                        <KrField
                            grid={1/2}
                            style={{width:262}}
                            name="jobId"
                            letfData={positionList}
                            component="switchSlide"
                            label="职务"
                            valueText = {basicInfo.jobName}
                            control='single'
                            requireLabel={true}
                        />

                         <KrField
                            grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="levelId"
                            letfData={rankList}
                            component="switchSlide"
                            label="职级"
                            valueText = {basicInfo.levelName}
                            control='single'
                            requireLabel={true}
                        />

</div>

);


	}

	render(){

        let {handleSubmit,orgDetail}=this.props;
       
        let {
                rankList,
                positionList,
                isPositionRank,
                positionType,
                isDepSelect,
                basicInfo,
                isType
            } = this.state;
           
		return(

			<div className='m-addPerson'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                      <div className="title" style={{marginBottom:"30px"}}>
                            <div><span className="new-icon-add"></span><label className="title-text">新增员工</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>

                       <KrField grid={1/2}
                            style={{width:262,marginTop:6}}
                            name="name"
                            component="input"
                            label="姓名"
                            requireLabel={true}
						/>
                       
                         <KrField grid={1/2} style={{width:262,marginTop:6,marginLeft:28}} name="sex" component="group" label="性别" requireLabel={true}>
 							 <KrField style={{marginTop:6}} name="sex" label="男" type="radio" value='MALE' />
 							 <KrField style={{marginTop:6}} name="sex" label="女" type="radio" value='FAMALE' />
 						</KrField>

                        <KrField grid={1/2}
                            style={{width:262,marginTop:6}}
                            name="mobilePhone"
                            component="input"
                            label="手机号"
                            requireLabel={true}
						/>

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28,marginTop:6}}
                            name="email"
                            component="input"
                            label="公司邮箱"
                            requireLabel={true}
						/>

                        
                         <KrField grid={1/2}
                            style={{width:262,marginTop:6}}
                            name="code"
                            component="input"
                            label="人员编号"
                            requireLabel={true}
						/>

                        <KrField
                            grid={1/2}
                            style={{width:262,marginLeft:28,marginTop:6}}
                            name="leader"
                            component="treePersonnel"
                            label="直接上级"
                            ajaxUrlName = "get-personnel-tree"
                        />

                        <KrField
                            grid={1/2}
                            style={{width:262,marginTop:6}}
                            name="depId"
                            component="treeDepartment"
                            label="部门"
                            onChange = {this.onChange}
                            valueText={orgDetail}
                            ajaxUrlName = "get-department-tree"
                            requireLabel={true}
                        />
            
                         {(isType || orgDetail[0].orgId)&&<KrField
                            grid={1/2}
                            style={{width:262,marginLeft:28,marginTop:6}}
                            name="typeId"
                            component="select"
                            label="职务类型"
                            onChange = {this.positionTypeChange}
                            options = {positionType}
                            requireLabel={true}
                        />}
			                {this.renderJobAndLevel()}


                         <KrField grid={1/2}
                            style={{width:262,marginLeft:(isType || orgDetail[0].orgId)?0:28,marginTop:6}}
                            name="entryDate"
                            component="date"
                            label="入职时间"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:(isType || orgDetail[0].orgId)?28:0,marginTop:6}}
                            name="status"
                            component="selecTemployees"
                            label="员工状态"
                            requireLabel={true}
                            otherType="resourceStatus"
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:(isType || orgDetail[0].orgId)?0:28,marginTop:6}}
                            name="type"
                            component="selecTemployees"
                            label="员工类别"
                            requireLabel={true}
                            otherType="resourceType"
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:(isType || orgDetail[0].orgId)?28:0,marginTop:6}}
                            name="property"
                            component="selecTemployees"
                            label="员工属性"
                            requireLabel={true}
                            otherType="resourceProperty"
						/>

                        <Grid style={{marginTop:17,marginBottom:5,marginLeft:-50}}>
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
    let reg= /^1[34578]\d{9}$/; 
    let ph=/^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/;
    let email=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(!values.name){
        errors.name='请填写名称';
    }else if(values.name.length>10){
        errors.name='名称最多10个字符';
    }

    if(!values.code){
        errors.code='请填写编号';
    }else if(values.code.length>10){
        errors.code='编号最多10个字符';
    }

    if(!values.status){
        errors.status='请选择员工属性';
    }

    if(!values.type){
        errors.type='请选择员工类别';
    }



     if(!values.depId){
        errors.depId='请选择部门';
    }

    if(!values.typeId){
        errors.typeId='请选择职务类型';
    }

    if(!values.jobId){
        errors.jobId='请选择职务';
    }else if((typeof (values.jobId))=='object'&&!values.jobId.value){
        errors.jobId='请选择职务';
    }

    if(!values.levelId){
        errors.levelId='请选择职级';
    }else if((typeof (values.levelId))=='object'&&!values.levelId.value){
        errors.levelId='请选择职级';
    }
   

     if(!values.entryDate){
        errors.entryDate='请选择入职时间';
    }

     if(!values.mobilePhone){
        errors.mobilePhone='请填写手机号码';
    }else if(!reg.test(values.mobilePhone)){
        errors.mobilePhone='请填写正确手机号码';
    }

     if(!values.email){
        errors.email='请填写公司邮箱';
    }else if(!email.test(values.email)){
        errors.email='请填写正确公司邮箱';
    }
    
	return errors
}

const selector = formValueSelector('addPerson');

AddPerson = reduxForm({
	form: 'addPerson',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(AddPerson);

export default connect((state) => {

	let changeValues = {};

	changeValues.depId = selector(state, 'depId');
	

	return {
		changeValues
	}

})(AddPerson)
