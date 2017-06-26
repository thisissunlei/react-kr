import React, {

	PropTypes
} from 'react';
import {
	reduxForm,
	formValueSelector,
	initialize,
	FieldArray
} from 'redux-form';
import {
	Actions,
	Store,
	connect
} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
} from 'kr-ui';
import {Chip} from 'material-ui'
import {Http} from 'kr/Utils';
import './index.less'

const chipData = [
      {key: 0, label: 'Angular'},
      {key: 1, label: 'JQuery'},
      {key: 2, label: 'Polymer'},
      {key: 3, label: 'ReactJS'},
    ]
const renderField = ({ input, label, placeholder,type, meta: { touched, error }}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label||placeholder}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)
//社区亮点-亮点
const renderBrights = ({ fields, meta: { touched, error }}) => {
		 var krStyle={};
			krStyle={
				width:228,
				marginLeft:18,
				marginRight:3,
		 }
	return (
			<ul style={{padding:0,margin:0}}>
			{fields.map((brightsStr, index) =>
			<li key={index} style={{width:600,listStyle:'none'}}>
				<KrField
					style={krStyle}
					grid={1/2}
					name={`${brightsStr}.brightPoints`}
					type="text"
					component={renderField}
					label={index?'':'银行账户'}
					placeholder='银行账户'
					/>
				<span onClick={() => fields.insert(index+1,{type:'BRIGHTPOINTS'})} className='addBtn' style={index?{marginTop:17}:{marginTop:32}}></span>
				<span
					className='minusBtn'
					onClick={() => fields.remove(index)}/>
			</li>
		)}
	</ul>

 )
}

class EditDetailForm extends React.Component {

	// static PropTypes = {
	// 	onSubmit: React.PropTypes.func,
	// 	onCancel: React.PropTypes.func,
	// 	detail: React.PropTypes.object,
	//
	// }

	constructor(props) {
		super(props);
		this.state = {
			chipData : chipData,
		}
		this.styles = {
		 chip: {
			 margin: 4,
			 display:'inline-block'
		 },
		 wrapper: {
			 display: 'flex',
			 flexWrap: 'wrap',
		 },
	 };
	}

	componentDidMount() {
		// let {
		// 	detail
		// } = this.props;
		//detail.enableflag = detail.enableflag.toString();
		// Store.dispatch(initialize('newCreateForm', detail));
	}

	onSubmit = (values) => {


		// values = Object.assign({}, values);
		//
		// var _this = this;
		//
		// Http.request('editFnaCorporation', {}, values).then(function(response) {
		// 	Notify.show([{
		// 		message: '编辑成功！',
		// 		type: 'success',
		// 	}]);
		//
		// 	const {
		// 		onSubmit
		// 	} = _this.props;
		// 	onSubmit && onSubmit();
		//
		// }).catch(function(err) {
		// 	Notify.show([{
		// 		message: err.message,
		// 		type: 'danger',
		// 	}]);
		// });


	}

	onCancel = () => {
		// const {
		// 	onCancel
		// } = this.props;
		// onCancel && onCancel();

	}
	//生成样式
	renderChip(data) {
    return (
      <Chip
        key={data.key}
				
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }
	//删除方法
	handleRequestDelete = (key) => {
    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    this.chipData.splice(chipToDelete, 1);
    this.setState({chipData: this.chipData});
  };

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset,
			detail
		} = this.props;










		return (
			<form className = 'edit-detail-form' onSubmit={handleSubmit(this.onSubmit)} style={{padding:" 35px 45px 45px 45px"}}>
				<div className="title">
						<div><span className="new-icon"></span><label className="title-text">新建出租方</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
				<div className="cheek">
						<div className="titleBar">
							<span className="order-number">1</span>
							<span className="wire"></span>
							<label className="small-title">基本信息</label>
						</div>
						<div className="small-cheek">
								<KrField grid={1/2} label="出租方名称"  name="mail" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="注册地址" name="wechat" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="是否启用" name="hasOffice" style={{width:262,marginLeft:15,marginRight:13}} component="group">
		              <KrField name="hasOffice" label="是" type="radio" value="YES" onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
		             	<KrField name="hasOffice" label="否" type="radio" value="NO" onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:53}}/>
		            </KrField>
								<div className='remaskInfo'><KrField grid={1} label="备注" name="remark" style={{marginLeft:15,marginTop:10,marginBottom:10}} heightStyle={{height:"70px",width:'543px'}}  component="textarea"  maxSize={100} requireLabel={false} placeholder='请输入备注' lengthClass='cus-textarea'/></div>

								<KrField
                     label=""
                     name="picId"
                     component="newuploadImage"
                     innerstyle={{width:364,height:254,padding:16}}
 										 sizePhoto
                     photoSize={'3:2'}
                     pictureFormat={'JPG,PNG,GIF'}
                     pictureMemory={'300'}
                     requestURI = '/api/krspace-finance-web/cmt/community/upload-photo/type/multi'
                     inline={false}
                     formfile=' '
                     center='center'
                  />

								<div className="middle-round"></div>
						</div>

						<div className="titleBar">
							<span className="order-number">2</span>
							<span className="wire"></span>
							<label className="small-title">账号信息</label>
						</div>
						<div className="small-cheek" style={{paddingBottom:0}}>

								<KrField grid={1/2} label="支付宝账户"  name="mail" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="微信账户" name="wechat" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>
								<FieldArray name="bright_bright" component={renderBrights}/>

						</div>
						<div className="titleBar">
							<span className="order-number">3</span>
							<span className="wire"></span>
							<label className="small-title">社区信息</label>
						</div>
						<div className="small-cheek" style={{paddingBottom:0}}>
							{this.state.chipData.map(this.renderChip,this)}
						</div>
						<div className="end-round"></div>
				</div>
				<Grid style={{marginTop:30}}>
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
		);
	}
}


const validate = values => {

	const errors = {}

	// if (!values.corporationName) {
	// 	errors.corporationName = '请填写出租方名称';
	// }
	// if (!values.corporationAddress) {
	// 	errors.corporationAddress = '请填写详细地址';
	// }

	return errors
}

export default reduxForm({
	form: 'editDetailForm',
	initialValues: {
		enableflag: 'ENABLE'
	},
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(EditDetailForm);
