import React, {
	PropTypes
} from 'react';


import {
	reduxForm
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	findDOMNode
} from 'react-dom'
import {DateFormat,Http} from 'kr/Utils';
import ReactTooltip from 'react-tooltip'
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup
} from 'kr-ui';


class DismantlingForm extends React.Component {
	static defaultProps = {
		mainBillId: 290,
	}


	constructor(props, context) {
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.billId = this.props.detail.billId;
		this.state = {
			detail :{}
		}
		this.getBasicData();


	}

	componentDidMount() {
		//const {detail}= this.props;

	}
	getBasicData=()=>{
		let _this = this;
		Http.request('getLeaveDate',{billId:_this.billId}).then(function(response) {

	      

	      _this.setState({
	        detail:response,
	      });
	      


	    }).catch(function(err) {
	    });
	}



	onSubmit(form) {
		const formValues = {
			actualLeaveDate: form.actualLeaveDate,
			mainBillId: this.props.detail.billId
		}

		Http.request('updateLeaveDate', {}, formValues).then(function(response) {
			Notify.show([{
				message: '修改成功',
				type: 'success',
			}]);
			window.setTimeout(function() {
				window.location.reload();

			}, 2000);

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});



	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	render() {

		let {
			error,
			handleSubmit,
			pristine,
			reset,
			submitting,
			initialValues
		} = this.props;
		let {detail} = this.state;

		let time = DateFormat(detail.actualLeavedate, "yyyy-mm-dd")
		return (

			<form className="DismantlingForm" onSubmit={handleSubmit(this.onSubmit)}> 
			<div style={{textAlign:'center',marginBottom:'14px',paddingTop:'20px',color:'#333333',fontSize:'14px'}}>{detail.companyName}</div>
			<div style={{textAlign:'center',marginBottom:'14px',color:'#333333',fontSize:'14px',fontSize:'14px'}}>合同到期时间为：{DateFormat(detail.endTime,"yyyy.mm.dd")}</div>
			{detail.editFlag?<KrField name="actualLeaveDate"component="date"  label="实际撤场时间：" value="" inline={true}/>:<KrField component="labelText"  label="实际的撤场时间为：" value={time} />}
			{detail.editFlag?<Grid>
				<Row style={{marginTop:30,marginBottom:15}}>
				<Col md={12} align="center"> 
					<ButtonGroup>
						<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm height={34} width={90}/></div>
						<Button  label="取消" type="button"  onTouchTap={this.onCancel} cancle={true} height={33} width={90}/>
					</ButtonGroup>
					
				 </Col>
				 </Row>
			</Grid>:<p style={{marginBottom:30}}></p>}
		</form>


		);
	}
}

export default reduxForm({
	form: 'DismantlingForm'
})(DismantlingForm);
