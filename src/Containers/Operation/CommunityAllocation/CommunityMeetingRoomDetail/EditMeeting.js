import React from 'react';
//import {mobxForm}  from 'kr/Utils/MobxForm';
import {reduxForm}  from 'redux-form';
import {Http} from 'kr/Utils';
import {
	KrField,
	Button,
	Grid,
	Row,
	Col,
  ButtonGroup
} from 'kr-ui';
import {
	observer,
	inject
} from 'mobx-react';
@inject("CommunityMeetingModel")
@observer
class EditMeeting  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			isBelongSpace:false
		}
	}


	componentWillMount(){
		let {$form,id}=this.props;
		 //获取编辑信息
			var data={};
			data.id=id;
			var _this=this;
			Http.request('meeting-room-eidData',data).then(function(response) {
				if(response.enable){
					 response.enable='true';
				}else{
                     response.enable='false';
				}
				$form.changeValues(response);
		 }).catch(function(err) {
				Message.error(err.message);
		 });
	}

  onSubmit=(values)=> {
		values.id=this.props.CommunityMeetingModel.deleteId;
		values.communityId=this.props.CommunityMeetingModel.communityId;
	  const {
		   onSubmit
		} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel=()=> {
	   const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

  //属于会议室
  belongSpace=(params)=>{
		if(params.value=='true'){
			 this.setState({
				isBelongSpace:true
			})
		}else if(params.value=='false'){
			 this.setState({
			 isBelongSpace:false
		 })
		}
  }

	//校验工位编号
	 codeCompare=(params)=>{
		 this.props.CommunityMeetingModel.codeStationCompare(params);
	 }

	 //楼层
 	floorChange=(params)=>{
 		var floor=params.label;
 		this.props.CommunityMeetingModel.slectNameCommunity=this.props.CommunityMeetingModel.stationName[floor];
 	}


  render(){

    const {handleSubmit}=this.props;
		let {isBelongSpace}=this.state;

    var style={};
    if(isBelongSpace){
      style={
        width:262
      }
    }else{
      style={
        width:262,
        marginLeft:28
      }
    }

    return(

    <div className='m-newMerchants'>
      <form onSubmit={handleSubmit(this.onSubmit)}>
           <div className="title" style={{marginBottom:"30px"}}>
              <div><span className="new-icon"></span><label className="title-text">工位信息编辑</label></div>
              <div className="customer-close" onClick={this.onCancel}></div>
           </div>
					 <KrField type='hidden' name="id"/>
	 				<KrField type='hidden' name="communityId"/>
	 				<KrField grid={1/2}
	 						style={{marginTop:1,width:262}}
	 						name="name"
	 						component="input"
	 						label="空间名称"
	 						requireLabel={true}
	 						onChange={this.codeCompare}
	 				/>
	 				<KrField grid={1/2}
	 						style={{width:262,marginLeft:28}}
	 						name="floor"
	 						component="select"
	 						label="所在楼层"
	 						requireLabel={true}
	 						options={this.props.CommunityMeetingModel.floorData}
	 						onChange={this.floorChange}
	 				 />
				<KrField grid={1/2}
					 style={{width:262}}
					 name="area"
					 component="input"
					 label="面积（㎡）"
					 requireLabel={true}
				 />
				<KrField grid={1/2}
					 style={{width:262,marginLeft:28}}
					 name="capacity"
					 component="input"
					 label="可容纳人数"
					 requireLabel={true}
				/>
				<KrField grid={1/2}
					 style={{width:262}}
					 name="location"
					 component="input"
					 label="空间位置"
				 />

			 <KrField grid={1/2}
					 style={{width:262,marginLeft:28}}
					 name="spaceType"
					 component="select"
					 label="空间类型"
					 requireLabel={true}
					 options={this.props.CommunityMeetingModel.floorData}
					 onChange={this.floorChange}
			 />
				<KrField grid={1/2}  name="enable" style={{width:262}} component="group" label="启用状态" requireLabel={false}>
					<KrField name="enable" label="是" type="radio" value="ENABLE" />
					<KrField name="enable" label="否" type="radio" value="DISENABLE" />
			 </KrField>
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

    if(!values.code){
      errors.code='请输入工位编号';
    }

    if(!values.floor){
      errors.floor='请输入所在楼层';
    }

		if(values.area&&isNaN(values.area)){
			errors.area='工位面积为数字'
		}

    if(!values.stationType){
      errors.stationType='请输入工位性质';
    }

		if(values.belongSpace=='true'){
 		 if(!values.spaceId){
 		   errors.spaceId='请输入会议室名称';
 		   }
 	 }

	 if(!values.spaceId){
     errors.spaceId='请输入会议室名称';
   }

	 if(!values.enable){
     errors.enable='请输入启用标识';
   }

		return errors
}
export default reduxForm({ form: 'EditMeeting',validate})(EditMeeting);
