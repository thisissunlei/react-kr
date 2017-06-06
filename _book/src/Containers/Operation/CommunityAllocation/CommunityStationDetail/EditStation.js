import React from 'react';
//import {mobxForm}  from 'kr/Utils/MobxForm';
import {reduxForm,initialize,change}  from 'redux-form';
import {Store} from 'kr/Redux';
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
@inject("CommunityStationModel")
@observer
class EditStation  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			isBelongSpace:false,
			slectNameCommunity:[]
		}
	}


	componentWillMount(){
		let {id,stationName}=this.props;
		 //获取编辑信息
			var data={};
			data.id=id;
			var _this=this;
			Http.request('station-get-edit',data).then(function(response) {
				if(response.enable){
					 response.enable='true';
				}else{
                    response.enable='false';
				}
				if(response.belongSpace){
		            _this.setState({
			  			isBelongSpace:true
					})
					response.belongSpace='true';
		    }else{
					_this.setState({
 					 isBelongSpace:false
 				 })
				 response.belongSpace='false';
		    }
			      _this.setState({
					 slectNameCommunity:stationName[response.floor]
				  })
               Store.dispatch(initialize('EditStation',response));
		 }).catch(function(err) {
				Message.error(err.message);
		 });
	}

  onSubmit=(values)=> {
		values.id=this.props.CommunityStationModel.deleteId;
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


  render(){

    const {handleSubmit,floorData}=this.props;
	let {isBelongSpace,slectNameCommunity}=this.state;

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

    <div className='m-newMerchants new-station'>
      <form onSubmit={handleSubmit(this.onSubmit)}>
           <div className="title" style={{marginBottom:"30px"}}>
              <div><span className="new-icon"></span><label className="title-text">工位信息编辑</label></div>
              <div className="customer-close" onClick={this.onCancel}></div>
           </div>
            <KrField type='hidden' name="id"/>
            <KrField type='hidden' name="communityId"/>
            <KrField grid={1/2} style={{marginTop:1,width:262}} name="code" component="input"  label="工位编号" requireLabel={true}
             onChange={this.codeCompare}/>
            <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="floor" component="select" label="所在楼层"
						 requireLabel={true} options={floorData} onChange={this.floorChange}/>
						 {this.props.CommunityStationModel.isCode && <div style={{fontSize:14,color:"red",paddingLeft:15,paddingBottom:7}}>该工位编号已存在</div>}
            <KrField grid={1/2} style={{width:262}}  name="area" component="input" label="工位面积"/>
            <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="stationType" component="select" label="工位性质"
            requireLabel={true} options={[{value:'OPEN',label:'开放'},{value:'HALF_OPEN',label:'半开放'},{value:'CLOSED',label:'封闭'}]}/>
            <KrField grid={1/2} style={{width:262}}  name="belongSpace" component="select" label="是否属于空间"
            requireLabel={true} options={[{value:'true',label:'属于'},{value:'false',label:'不属于'}]} onChange={this.belongSpace}/>
            {isBelongSpace&&<KrField grid={1/2} style={{width:262,marginLeft:28}}  name="spaceId" component="select" label="空间名称"
						requireLabel={true} options={slectNameCommunity}/>}
            <KrField grid={1/2} style={style}  name="enable" component="select" label="启用标识"
            requireLabel={true} options={[{value:'true',label:'启用'},{value:'false',label:'未启用'}]}/>

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
 		   errors.spaceId='请输入空间名称';
 		   }
 	 }

	 if(!values.spaceId){
     errors.spaceId='请输入空间名称';
   }

	 if(!values.enable){
     errors.enable='请输入启用标识';
   }

		return errors
}
export default reduxForm({ form: 'EditStation',validate})(EditStation);