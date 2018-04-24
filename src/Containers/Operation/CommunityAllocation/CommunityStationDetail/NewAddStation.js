import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,change}  from 'redux-form';
import {
	KrField,
	Button,
	Grid,
	Row,
	Col,
	DrawerTitle,
  ButtonGroup
} from 'kr-ui';
import {
	observer,
	inject
} from 'mobx-react';
@inject("CommunityStationModel")
@observer
class NewAddStation  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			isBelongSpace:false,
			slectNameCommunity:[]
		}
	}

  onSubmit=(values)=> {
		values.id='';
		values.communityId=this.props.CommunityStationModel.communityId;
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

	//属于空间
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
     this.props.CommunityStationModel.codeStationCompare(params);
	}

	//楼层
	floorChange=(params)=>{
		let {stationName}=this.props;
		var floor=params.label;
		this.setState({
			slectNameCommunity:stationName[floor]
		})
	}

	priceBlur=(param)=>{
       if(!param){
          Store.dispatch(change('NewAddStation','quotedPrice','0'))
       }
	}


	render(){

        const {handleSubmit,floorData}=this.props;
		let {isBelongSpace,slectNameCommunity}=this.state;

		var style={};
		var priceStyle={};
		if(!isBelongSpace){
			style={
				width:262
			}
			priceStyle={
				width:262,
				marginLeft:28
			}
		}else{
			style={
				width:262,
				marginLeft:28
			}
			priceStyle={
				width:262,
				marginLeft:1
			}
		}


		return(

	  <div className='m-newMerchants new-station'>
      <form onSubmit={handleSubmit(this.onSubmit)}>
           <div className="title" style={{marginBottom:"30px"}}>
					<DrawerTitle title ='新建工位信息' onCancel = {this.onCancel}/>
           </div>
            <KrField type='hidden' name="id"/>
						<KrField type='hidden' name="communityId"/>
            <KrField grid={1/2} style={{marginTop:1,width:262}} name="code" component="input"  label="工位编号" requireLabel={true}
             onChange={this.codeCompare}/>
            <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="floor" component="select" label="所在楼层"
						 requireLabel={true} options={floorData} onChange={this.floorChange}/>
						 {this.props.CommunityStationModel.isCode && <div style={{fontSize:14,color:"red",paddingLeft:15,paddingBottom:7}}>该工位编号已存在</div>}
            {/* <KrField grid={1/2} style={{width:262}}  name="area" component="input" label="工位面积"/> */}
						{/* <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="stationType" component="select" label="工位性质"
						requireLabel={true} options={[{value:'OPEN',label:'开放'},{value:'HALF_OPEN',label:'半开放'},{value:'CLOSED',label:'封闭'}]}/> */}
						<KrField grid={1/2} style={{width:262}}  name="stationAttr" component="select" label="工位类型"
						requireLabel={true} options={[{value:'MOBILE_DESK',label:'移动办公桌'},{value:'OPEN_WORKSPACE',label:'固定办公桌'}]}/> 
						<KrField grid={1/2} style={{width:262,marginLeft:28}}  name="belongSpace" component="select" label="是否属于空间"
						requireLabel={true} options={[{value:'true',label:'属于'},{value:'false',label:'不属于'}]} onChange={this.belongSpace}/>
						{isBelongSpace&&<KrField grid={1/2} style={{width:262}}  name="spaceId" component="select" label="空间名称"
						requireLabel={true} options={slectNameCommunity}/>}
            <KrField grid={1/2} style={style}  name="enable" component="select" label="启用状态"
						requireLabel={true} options={[{value:'UNENABLE',label:'不可用'},{value:'ENABLE',label:'启用'},{value:'UNDERCARRIAGE',label:'下架'}]}/>

				        <KrField grid={1/2} style={priceStyle} name="quotedPrice" component="input"  label="报价"
                        onBlur={this.priceBlur}/>		

            <Grid style={{marginTop:17,marginBottom:5,marginLeft:-50}}>
              <Row>
                <Col md={12} align="center">
                  <ButtonGroup>
                    <div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
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

	// if(values.area&&isNaN(values.area)){
	// 	errors.area='工位面积为数字'
	// }

	if(!values.stationAttr){
		errors.stationAttr='请输入工位类型';
	}
	
   if(!values.belongSpace){
     errors.belongSpace='请输入是否属于空间';
   }

	 if(values.belongSpace=='true'){
		 if(!values.spaceId){
		   errors.spaceId='请输入空间名称';
		   }
	 }

	 if(!values.enable){
     errors.enable='请输入启用状态';
   }

    if(values.quotedPrice&&isNaN(values.quotedPrice)){
		  errors.quotedPrice='报价为数字'
   	}

		if(values.quotedPrice&&values.quotedPrice.length>18){
		  errors.quotedPrice='报价长度不能超过18位'
   	}

		return errors
}
export default reduxForm({ form: 'NewAddStation',validate})(NewAddStation);
