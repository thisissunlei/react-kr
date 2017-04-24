import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {mobxForm}  from 'kr/Utils/MobxForm';
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
} from 'mobx-react';
import State from './State';
@observer
class NewAddStation  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			isBelongSpace:false
		}
	}

    onSubmit=(values)=> {
		values.id='';
		values.communityId=State.communityId;
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
      State.codeStationCompare(params);
	}


	render(){

        const {handleSubmit}=this.props;
		
		return(

	  <div className='m-newMerchants'>
      <form onSubmit={handleSubmit(this.onSubmit)}>
           <div className="title" style={{marginBottom:"30px"}}>
              <div><span className="new-icon"></span><label className="title-text">工位信息录入</label></div>
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
							 	options={State.floorData}
							 	onChange={this.floorChange}
						 />
						 {State.isCode && <div style={{fontSize:14,color:"red",paddingLeft:15,paddingBottom:7}}>该空间名称已存在</div>}
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
						{/*<KrField
							label="对应合同"
							name='contract'
							style={{width:262,marginLeft:28}}
							component="groupCheckbox"
                            defaultValue={}
							requireLabel={true}
						/>*/}

						<KrField grid={1/2}
								style={{width:262,marginLeft:28}}
								name="spaceType"
								component="select"
								label="空间类型"
							 	requireLabel={true}
								options={State.sapceTypes}
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
   if(!values.belongSpace){
     errors.belongSpace='请输入是否属于会议室';
   }

	 if(values.belongSpace=='true'){
		 if(!values.spaceId){
		   errors.spaceId='请输入会议室名称';
		   }
	 }

	 if(!values.enable){
     errors.enable='请输入启用标识';
   }

		return errors
}
export default mobxForm({ form: 'NewAddStation',validate})(NewAddStation);
