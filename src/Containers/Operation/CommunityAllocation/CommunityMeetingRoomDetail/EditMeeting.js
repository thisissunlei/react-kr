import React from 'react';
import {Actions,Store} from 'kr/Redux';
//import {mobxForm}  from 'kr/Utils/MobxForm';
import {reduxForm,initialize,change}  from 'redux-form';
import {Http} from 'kr/Utils';
import {
	KrField,
	Button,
	Grid,
	Row,
	Col,
  ButtonGroup,
  Message
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
			isBelongSpace:false,
			listDevice:[]
		}
	}


	componentWillMount(){
		   let {$form,id}=this.props;
		   //获取编辑信息
			var data={};
			data.id=id;
			var _this=this;
			Http.request('meeting-room-eidData',data).then(function(response) {
				   //$form.changeValues(response);
				   if(response.enable==1){
				   	 response.enable='1';
				   }else if(response.enable==0){
				   	 response.enable='0'; 
				   }
				   let deviceSpace=[];
				   _this.props.CommunityMeetingModel.spaceDevices.map((items,index)=>{
			        let list={};
			        list.label=items.label;
			        list.value=items.value;
			        items.checked=false;
			        response.deviceIds.map((item)=>{
			           if(item==items.value){
			           	 items.checked=true;
			           }
			        })
			        list.checked=items.checked;
			        deviceSpace.push(list); 
				  })
				   _this.setState({
				   	 listDevice:deviceSpace
				   })

				   Store.dispatch(initialize('EditMeeting',response));
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


	//校验空间名称
	 codeCompare=(params)=>{
		 this.props.CommunityMeetingModel.codeStationCompare(params);
	 }

	
     //设备
	deviceChange=(params,item)=>{
	  let list=[];
	  list=item.split(',');
	  Store.dispatch(change('EditMeeting', 'deviceIds',list));
	}


  render(){
    
     const {handleSubmit}=this.props;
     let {listDevice}=this.state;
     
    return(

    <div className='m-newMerchants'>
      <form onSubmit={handleSubmit(this.onSubmit)}>
           <div className="title" style={{marginBottom:"30px"}}>
              <div><span className="new-icon"></span><label className="title-text">编辑社区空间</label></div>
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

			    <div className='meeting-device'><KrField
							label="设备情况"
							name='deviceIds'
							style={{width:262,marginLeft:28}}
							component="groupCheckbox"
                            defaultValue={listDevice}
                            onChange={this.deviceChange}
						/></div>

						<KrField grid={1/2}
								style={{width:262}}
								name="spaceType"
								component="select"
								label="空间类型"
							 	requireLabel={true}
								options={this.props.CommunityMeetingModel.sapceTypes}
						/>
				<KrField grid={1/2}  name="enable" style={{width:262,marginLeft:28}} component="group" label="启用状态">
					<KrField name="enable" label="启用" type="radio" value='1' />
					<KrField name="enable" label="禁用" type="radio" value='0' />
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
		 //正整数
		let numberNotZero=/^[0-9]*[1-9][0-9]*$/;

    if(!values.name){
      errors.name='请输入空间名称';
    }

    if(!values.floor){
      errors.floor='请输入所在楼层';
    }

    if(!values.area){
		errors.area='请输入面积'
	}

	if(values.area&&!numberNotZero.test(values.area.toString().trim())){
		errors.area='面积为正整数'
	}
    
    if(!values.capacity){
		errors.capacity='请输入可容纳人数'
	}

	if(values.capacity&&!numberNotZero.test(values.capacity.toString().trim())){
		errors.capacity='可容纳人数为正整数'
	}

		return errors
}
export default reduxForm({ form: 'EditMeeting',validate})(EditMeeting);
