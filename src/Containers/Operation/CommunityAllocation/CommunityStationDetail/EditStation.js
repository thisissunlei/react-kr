import React from 'react';
import {reduxForm,Field}  from 'kr/Utils/ReduxForm';
import {Http} from 'kr/Utils';
import {
	KrField,
	Button,
	Grid,
	Row,
	Col,
  ButtonGroup
} from 'kr-ui';
import State from './State';
class EditStation  extends React.Component{

	constructor(props,context){
		super(props, context);
	}


	componentDidMount(){
		let {$form,id}=this.props;
		 //获取编辑信息
			var data={};
			data.id=id;
			var _this=this;
			Http.request('station-get-edit',data).then(function(response) {
				$form.initialize(response);
		 }).catch(function(err) {
				Message.error(err.message);
		 });
	}

  onSubmit=(values)=> {
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
     State.isBelong=true;
   }else if(params.value=='false'){
     State.isBelong=false;
   }
  }

	//校验工位编号
	 codeCompare=(params)=>{
		 State.codeStationCompare(params);
	 }


  render(){

    const {handleSubmit}=this.props;

    var style={};
    if(State.isBelong){
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
            <KrField grid={1/2} style={{marginTop:1,width:262}} name="code" component="input"  label="工位编号" requireLabel={true}
             onChange={this.codeCompare}/>
            <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="floor" component="select" label="所在楼层" requireLabel={true}/>
            <KrField grid={1/2} style={{width:262}}  name="area" component="input" label="工位面积"/>
            <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="stationType" component="select" label="工位性质"
            requireLabel={true} options={[{value:'OPEN',label:'开放'},{value:'HALF_OPEN',label:'半开放'},{value:'CLOSED',label:'封闭'}]}/>
            <KrField grid={1/2} style={{width:262}}  name="belongSpace" component="select" label="是否属于会议室"
            requireLabel={true} options={[{value:'true',label:'属于'},{value:'false',label:'不属于'}]} onChange={this.belongSpace}/>
            {State.isBelong&&<KrField grid={1/2} style={{width:262,marginLeft:28}}  name="spaceId" component="select" label="会议室名称" requireLabel={true}/>}
            <KrField grid={1/2} style={style}  name="enable" component="select" label="启用标识"
            requireLabel={true} options={[{value:'true',label:'启用'},{value:'false',label:'未启用'}]}/>

            <Grid style={{marginTop:17,marginBottom:5,marginLeft:-24}}>
              <Row>
                <Col md={12} align="center">
                  <ButtonGroup>
                    <div  className='ui-btn-center'><Button  label="确定" type="submit"/></div>
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

	 if(!values.spaceId){
     errors.spaceId='请输入会议室名称';
   }

	 if(!values.enable){
     errors.enable='请输入启用标识';
   }

		return errors
}
export default reduxForm({ form: 'EditStation',validate})(EditStation);
