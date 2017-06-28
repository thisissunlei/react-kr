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
	Checkbox,
	Dialog
} from 'kr-ui';
import {Chip} from 'material-ui'
import {Http} from 'kr/Utils';
import './index.less'
import BindCommunity from '../BindCommunity';

const chipData1 = [
      
      {id: 1, name: '北京创业大街社区'},
      {id: 2, name: '北京酒仙桥社区'}
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

	if(!fields.length){
		fields.push({});
	}

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
					requireLabel={index?false:true}
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

const jsonData = [
    {
        name: "北京",
        id: 1,
				type:'city',
        isBind:false,
        community: [
            {
                id: 1,
				flag:1,
                isBind:false,
                name: "北京创业大街社区"
            },
            {
                id: 2,
				flag:0,
                isBind:false,
                name: "北京酒仙桥社区"
            }
        ]
    },
    {
        name: "上海",
        id: 3,
				flag:'city',
        isBind:false,
        community: [
            {
                id: 3,
                isBind:false,
				flag:0,
                name: "上海田林社区"
            },
            {
                id: 4,
                isBind:false,
				flag:0,
                name: "上海传奇广场社区"
            }
        ]
    }
];


class NewCreateForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			chipData : chipData1,
			isBindCommunitys : false,
		}
		this.styles = {
		 chip: {
			 margin: 4,
		 },
		 wrapper: {
			 display: 'flex',
			 flexWrap: 'wrap',
		 },
	 };
	 this.bindGetData();
	}

	componentDidMount() {
		// let {
		// 	detail
		// } = this.props;
		//detail.enableflag = detail.enableflag.toString();
		// Store.dispatch(initialize('newCreateForm', detail));
	}
	
	//获取绑定社区的数据
	bindGetData = () =>{
		// Http.request('editFnaCorporation', {}, values).then(function(response) {
		
		// 	const {
		// 		onSubmit
		// 	} = _this.props;
		// 	onSubmit && onSubmit();
		
		// }).catch(function(err) {
		// 	// Notify.show([{
		// 	// 	message: err.message,
		// 	// 	type: 'danger',
		// 	// }]);
		// });
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
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();

	}
	bindCommunityClose = () =>{
		let {isBindCommunity} = this.state;
		this.setState({
			isBindCommunity: !isBindCommunity,
		})
	}
	//绑定的社区提交
	checkedSubmit = (data) =>{
		var _this = this;
		var chipData = [].concat(data);
		this.setState({
			chipData:chipData,
		})
	}
	//绑定社区打开
	bindClick = () =>{
		this.bindCommunityClose();
	}
	//生成样式
	renderChip(data) {
		return (
		<Chip
			key={data.id}

			onRequestDelete={() => this.handleRequestDelete(data)}
			style={this.styles.chip}
		>
			{data.name}
		</Chip>
		);
	}
	//删除方法
	handleRequestDelete = (data) => {
		this.chipData = this.state.chipData;
		const chipToDelete = this.chipData.map((chip) => chip.id).indexOf(data.id);
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
		const {
			existing,
			chipData,
			jsonData
		} = this.state;
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
								<KrField grid={1/2} label="出租方名称"  name="corName" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="注册地址" name="corAddress" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="是否启用" name="enableflag" style={{width:262,marginLeft:15,marginRight:13}} component="group">
		              <KrField name="enableflag" label="是" type="radio" value="YES" style={{marginTop:5,display:'inline-block',width:84}}/>
		             	<KrField name="enableflag" label="否" type="radio" value="NO"  style={{marginTop:5,display:'inline-block',width:53}}/>
		            </KrField>
								<div className='remaskInfo'><KrField grid={1} label="备注" name="corDesc" style={{marginLeft:15,marginTop:10,marginBottom:10}} heightStyle={{height:"70px",width:'543px'}}  component="textarea"  maxSize={100} requireLabel={false} placeholder='请输入备注' lengthClass='cus-textarea'/></div>

								<KrField
									name="cachetUrl"
									component="newuploadImage"
									innerstyle={{width:392,height:230,padding:10}}
									photoSize={'650*365'}
									pictureFormat={'JPG,PNG,GIF'}
									pictureMemory={'200'}
								
									requireLabel={true}
									label="上传列表详情图"
									inline={false}
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
								<FieldArray name="bankAccount" component={renderBrights}/>

						</div>
						<div className="titleBar">
							<span className="order-number">3</span>
							<span className="wire"></span>
							<label className="small-title">社区信息</label>
						</div>
						<div className="small-cheek" style={{paddingBottom:0}}>
							<div style={this.styles.wrapper}>
								{this.state.chipData.map(this.renderChip,this)}
							</div>
							<span onClick = {this.bindClick}
								style = {{
										display:'inline-block',
										margin:4,
										background:"#499df1",
										borderRadius: '4px',
										padding:" 5px 10px 5px 5px",
										color: "#fff",
										cursor: "pointer"
									}}
							>+绑定社区</span>

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

			<Dialog
					title="编辑设备"
					open={this.state.isBindCommunity}
					onClose={this.bindCommunityClose}
					contentStyle={{width:687}}
       		>
          		<BindCommunity 
				  	jsonData = {jsonData} 
					onCancel = {this.bindCommunityClose} 
					checkedSubmit = {this.checkedSubmit}
					existing = {chipData}
				/>
		    </Dialog>

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
	form: 'newCreateForm',
	initialValues: {
		enableflag: 'ENABLE'
	},
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(NewCreateForm);
