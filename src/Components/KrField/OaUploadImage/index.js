import React, {
	Component
} from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import Message from '../../Message';
import ReactDOM from 'react-dom';
import './index.less';
import refresh from "./images/refresh.svg";
import deleteImg from "./images/deleteImg.svg";
import {Actions,Store} from 'kr/Redux';
import WrapComponent from '../WrapComponent';
import Dialog from '../../Dialog';
import ShearDialog from './ShearDialog';
export default class OaUploadImage extends Component {
	static defaultProps = {

	}
	static PropTypes = {
		className: React.PropTypes.string
	}
	constructor(props,context){
		super(props,context);
		this.state={
			//图像弹窗
			openImg:false
		}
	}
	componentWillUnmount() {

	}


	clamp=(param)=>{
		const {clamp}=this.props;
		clamp && clamp(param);
		this.dialogClick();
	}

	dialogClick=()=>{
    this.setState({
			openImg:!this.state.openImg
		})
	}

	onCancel=()=>{
		this.dialogClick();
	}

	render() {
		let {children,className,style,meta: { touched, error },type,label,inline,requireLabel,name,...other} = this.props;
		let {operateImg} = this.state;
		return(
			<div className = "ui-oa-upload-image">
		 	<WrapComponent label={label} style={style} requireLabel={requireLabel} inline={inline} >
			<div className="ui-oa-upload-box">
				<div className='ui-uploadimg-outbox' >
					<div className='ui-uploadimg-innerbox' onMouseEnter={this.operationImg} onMouseLeave={this.notOperateImg}>

						<div className='ui-uploadimg-inner' onClick={this.dialogClick}>
               <span>更换图像</span>
						</div>


					</div>
				</div>
			</div>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
		</WrapComponent>

		{/*上传图片*/}
			<Dialog
				title="修改头像"
				onClose={this.openUploadImg}
				open={this.state.openImg}
				contentStyle ={{ width: '688px',height:'auto'}}
			>
			 <ShearDialog
			  onCancel={this.onCancel}
				clamp={this.clamp}
				onChange={this.onChange}
				imgSrc={this.state.imgSrc}
			 />
		</Dialog>


  </div>
		);
	}
}
