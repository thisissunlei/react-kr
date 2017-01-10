import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	UploadImage,
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button
} from 'kr-ui';
class BatchUploadImageForm extends Component{
	constructor(props,context){
		super(props,context);
		this.state={
			selectedCommunitys:[],
			communitys: [
							{"cityName": "北京", 
								"children": [
								{"communityName": "北京创业大街社区","children": [{
									"id":"1","hardwareid":"1550099_84C2E4F1DAEE"
									}]
								},
								{"communityName": "北京天创社区","children": [{
									"id":"2","hardwareid":"2550099_84C2E4F1DAEE"
									}]
								}
							]
							},
							{"cityName": "上海", "children": [
								{"communityName": "上海梦想小镇社区","children": [{
									"id":"3","hardwareid":"3550099_84C2E4F1DAEE"
									}]
								},
								{"communityName": "上海文三社区","children": [{
									"id":"4","hardwareid":"4550099_84C2E4F1DAEE"
									}]
								}
							]},
							{"cityName": "天津", "children": [
								{"communityName": "天津绿地社区","children": [{
									"id":"5","hardwareid":"5550099_84C2E4F1DAEE"
									}]
								},
								{"communityName": "天津浦东社区","children": [{
									"id":"6","hardwareid":"6550099_84C2E4F1DAEE"
									}]
								}
							]},
							{"cityName": "江苏", 
								"children": [
								{"communityName": "江苏创业大街社区","children": [{
									"id":"1","hardwareid":"7550099_84C2E4F1DAEE"
									}]
								},
								{"communityName": "江苏天创社区","children": [{
									"id":"2","hardwareid":"8550099_84C2E4F1DAEE"
									}]
								}
							]
							},
							{"cityName": "湖北", "children": [
								{"communityName": "湖北小镇社区","children": [{
									"id":"3","hardwareid":"7550099_84C2E4F1DAEE"
									}]
								},
								{"communityName": "湖北三社区","children": [{
									"id":"4","hardwareid":"7550099_84C2E4F1DAEE"
									}]
								}
							]},
							{"cityName": "深圳", "children": [
								{"communityName": "深圳地社区","children": [{
									"id":"5","hardwareid":"7550099_84C2E4F1DAEE"
									}]
								},
								{"communityName": "深圳浦东社区","children": [{
									"id":"6","hardwareid":"7550099_84C2E4F1DAEE"
									}]
								},
								{"communityName": "深圳地社区","children": [{
									"id":"5","hardwareid":"7550099_84C2E4F1DAEE"
									}]
								},
								{"communityName": "深圳浦东社区","children": [{
									"id":"6","hardwareid":"7550099_84C2E4F1DAEE"
									}]
								},
								{"communityName": "深圳地社区","children": [{
									"id":"5","hardwareid":"7550099_84C2E4F1DAEE"
									}]
								},
								{"communityName": "深圳浦东社区","children": [{
									"id":"6","hardwareid":"7550099_84C2E4F1DAEE"
									}]
								}
							]}
						]
		}
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	// 提交
	onSubmit=(values)=>{
		console.log("values",values);
		let {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}
	render(){
		let communitys = this.state.communitys;
		const {handleSubmit}=this.props;
		return(
			<div>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField name="uploadImage" 
						component="uploadImage" 
						style={{marginTop:10}} 
						photoSize={'212*136'} 
						pictureFormat={'JPG'} 
						pictureMemory={'32K'} 
					/>
					<KrField name="communitys" 
						options={communitys} 
						component="doorCard" 
						defaultValue={communitys}
						getList={this.getList}
					/>
					<Grid style={{marginTop:25,marginBottom:'4px'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:'305px',textAlign:'right',padding:0,paddingRight:15}}>
									<Button  label="开始上传" type="submit"/>
								</ListGroupItem>
								<ListGroupItem style={{width:'254px',textAlign:'left',padding:0,paddingLeft:15}}>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
								</ListGroupItem>
							</ListGroup>					
						</Row>
					</Grid>
				</form>
			</div>
		);
	}
}
// const validate = values=>{
// 	const errors={};
// 	if(!values.communityName){
// 		errors.communityName = '社区名称为必填项';
// 	}
// 	if(!values.floor){
// 		errors.floor = '楼层为必填项';
// 	}
// 	if(!values.showTitle){
// 		errors.showTitle = '展示标题为必填项';
// 	}
// 	return errors;
// }
export default BatchUploadImageForm = reduxForm({
	form: 'BatchUploadImageForm',
	// validate,
})(BatchUploadImageForm);