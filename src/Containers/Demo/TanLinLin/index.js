import "babel-polyfill";
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
	    

	    var OSS = require('ali-oss').Wrapper;
	    var co = require('co');
	    // var fs = require('fs');

		var client = new OSS({
		  region: 'oss-cn-beijing',
		  accessKeyId: 'LTAIA8GOJGGoRk9E',
		  accessKeySecret: 'ex8X9Pm8KdyFKggfxlkKGzuv3Vb3Af',
		  bucket: 'tanlinlinbucket'
		});

		// client.list().then(function (result) {
		//   console.log(result.objects);
		// }).catch(function (err) {
		//   console.error(err);
		// });

		co(function* () {
		  var result = yield client.put('object-key', 'local-file');
		  console.log(result);
		}).catch(function (err) {
		  console.log(err);
		});


		// // 上传一个文件，成功后下载这个文件
		// // client.put('object', './index.less').then(function (val) {
		// //   console.log(val.res);
		// //   // return client.get('object');
		// // }).then(function (val) {
		// //   console.log(val.res);
		// //   console.log(val.content.toString());
		// // });

		//     co(function* () {
		//       client.useBucket('tanlinlinbucket');
		//       var result = yield client.put('object-key', './index.less');
		//       console.log(result);
		//     }).catch(function (err) {
		//       console.log(err);
		//     });

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
