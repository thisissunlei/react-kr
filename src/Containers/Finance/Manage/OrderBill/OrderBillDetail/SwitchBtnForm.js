import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,initialize} from 'redux-form';
import {
	Button,
	Grid,
	Row,
	Col,
	KrField,
	ButtonGroup
} from 'kr-ui';

class SwitchBtnForm extends React.Component{

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
		optionList:React.PropTypes.array,
		fiMoney:React.PropTypes.number,
		initialValuesId:React.PropTypes.object,
  }

	constructor(props,context){
		super(props, context);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
		  this.state = {

	     }
   }

	componentDidMount() {
       let initialValues={
       	 id:this.props.initialValuesId.id,
       	 contractcodeId:'',
       }
	   Store.dispatch(initialize('SwitchBtnForm',initialValues));

	}


    onSubmit(values){
		 const {onSubmit} = this.props;
		 onSubmit && onSubmit(values);

	 }

	 onCancel(){
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	 }






	render(){

     let heightStyle={
       	 width:'546',
       	 height:'72',
       	 marginTop:'-2'
       }
	let style={
       	 marginTop:'3'
       }

        const { error, handleSubmit, pristine, reset,optionList,fiMoney} = this.props;




		return(

			    <div className='ui-switch-wrap'>
					      <form onSubmit={handleSubmit(this.onSubmit)}>
						    <KrField  name="id" type="hidden"/>
						    <KrField grid={1/2} label="可操作金额" right={29}  component="labelText" value={fiMoney} defaultValue="0" inline={false} requireLabel={true}/>
                            <KrField grid={1/2} label="上传附件" style={{marginLeft:-5}} name="fileids" component="file" style={{marginTop:-1}} defaultValue={[]}/>
                             <KrField grid={1/2} label="合同编号" right={43} name="contractcodeId" type="select" options={optionList} requireLabel={true} style={{marginTop:-12}}/>
                            <KrField label="备注" style={style} name="finaflowdesc" heightStyle={heightStyle} component="textarea" type="text" placeholder='请输入备注,文字不能超过100字' maxSize={100} lengthClass='ui-length-textarea'/>


						   <Grid style={{marginBottom:5,marginLeft:-30}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
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

		const errors = {}

		if(!values.contractcodeId){
			errors.contractcodeId = '请填写合同编号';
		}

		return errors
	}


export default reduxForm({form:'SwitchBtnForm',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(SwitchBtnForm);
