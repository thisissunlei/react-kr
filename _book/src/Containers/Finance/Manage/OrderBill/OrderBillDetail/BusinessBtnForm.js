import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,initialize} from 'redux-form';
import {
	Button,
	Grid,
	Row,
	Col,
	KrField,
	ButtonGroup,
} from 'kr-ui';



class BusinessBtnForm extends React.Component{

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
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
       	 finaflowamount:'',
       }
	   Store.dispatch(initialize('BusinessBtnForm',initialValues));

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



        const { error, handleSubmit, pristine, reset,optionList,fiMoney} = this.props;

       let inputStyle={
       	 height:'36',
       }
       let heightStyle={
       	 width:'546',
       	 height:'72'
       }
	   let style={
       	 marginTop:'3'
       }


		return(

			    <div className='ui-quit-wrap' style={{marginLeft:30}}>

					      <form onSubmit={handleSubmit(this.onSubmit)}>
                            <KrField  name="id" type="hidden"/>
                            <KrField grid={1/2} label="可操作金额"  component="labelText" value={fiMoney} inline={false} defaultValue="0" requireLabel={true}/>
                            <KrField grid={1/2} label="上传附件" name="fileids" component="file" style={{marginTop:-1}}  defaultValue={[]}/>
                            <KrField grid={1/2} label="金额（元）" heightStyle={inputStyle} right={43} name="finaflowamount" component="input" type="text" requireLabel={true} style={{marginTop:-12}}/>
                            <KrField grid={1} label="备注" style={style} name="finaflowdesc" heightStyle={heightStyle} component="textarea" type="text" placeholder='请输入备注,文字不能超过100字' maxSize={100} lengthClass='ui-length-textarea'/>



					<Grid style={{marginBottom:5,marginLeft:-30}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
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

		const errors = {}

		if(!values.finaflowamount){
			errors.finaflowamount = '请填写金额';
		}
		if (values.finaflowamount && isNaN(values.finaflowamount)) {
			errors.finaflowamount = '金额必须为数字';
		}

		return errors
	}

export default reduxForm({form:'BusinessBtnForm',validate})(BusinessBtnForm);
