// import "babel-polyfill";
import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	KrField,
	Grid,
	Row,
	Button,
	ListGroup,
	ListGroupItem,
} from 'kr-ui';
import './index.less';


 class TanLinLin extends React.Component{
	constructor(props){
		super(props);
		this.state={
			initailPoint : '承德'
		},
		this.client = {}
	}
	componentWillMount() {
	}

	componentDidMount(){


	 

	}



	onSubmit=(values)=>{
	}
	render(){
		let {initailPoint} = this.state;
		const { error, handleSubmit, pristine,mapStyle} = this.props;

		return (
			<div className="demo-tll">


					<form onSubmit={handleSubmit(this.onSubmit)}>


			              	<KrField name="newuploadImage"
								component="map"
								placeholder="例如：北京市1111"
								style={{width:252,height:36}}
								mapStyle={{width:400,height:400}}
								initailPoint ={initailPoint}
							/>

							<Grid style={{marginTop:19,marginBottom:'4px'}}>
								<Row>
									<ListGroup>
										<ListGroupItem style={{width:'269px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"/></ListGroupItem>
										<ListGroupItem style={{width:'254px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} /></ListGroupItem>
									</ListGroup>
								</Row>
							</Grid>
							{/*<div id="drop-box" style={{width:"100%",height:100,border:"solid 1px #eee",borderRadius:5,marginBottom:6}}></div>
							<div id="ossfile">你的浏览器不支持flash,Silverlight或者HTML5！</div>
							<div id="sso-container">
								<a id="selectfiles" href="javascript:void(0);" className='btn' style={{display:"inline-block",marginRight:10}}>选择文件</a>
								<a id="postfiles" href="javascript:void(0);" className='btn'>开始上传</a>
							</div>*/}


					</form>


		  	</div>
		);
	}
}
const validate = values => {
	const errors = {}

	// if (!values.email) {
	// 	errors.email = '请输入邮箱';
	// }


	return errors
}
const selector = formValueSelector('NewCreateForm');
export default TanLinLin = reduxForm({
	form: 'TanLinLin',
	validate,
})(TanLinLin);
