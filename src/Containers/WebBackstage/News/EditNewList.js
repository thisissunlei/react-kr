import React from 'react';
import {
	Http
} from "kr/Utils";
import {reduxForm} from 'redux-form';
import {
	KrField,
	Grid,
	Row,
	Button,
	Message,
	ListGroup,
	ListGroupItem,
} from 'kr-ui';
import './index.less';


class EditNewList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}
	onCancel=()=>{
		let {onCancel}=this.props;
		onCancel && onCancel();
	}
	onSubmit=(form)=>{
		console.log('form-----',form)
	}


	render() {
		const { handleSubmit} = this.props;
		
		return (
			<div className="g-new-list">
				<div className="u-title-box">
						<img className="u-title-img" src={require('./images/activity.svg')} />
						<span className="u-title-text">编辑新闻</span>
						<span className="u-close-page" onClick={this.onCancel}>
							<img 
								src={require('./images/closeIMG.svg')} 
								className="u-close-page-img"
							 />
						</span>
					</div>
			   <form onSubmit={handleSubmit(this.onSubmit)}>
					

				</form> 
			</div>


		);
	}
}
const validate = values => {
	
	if(!values.infoPic){
		errors.infoPic = '请上传详情图';
	}

	

	return errors
}

export default EditNewList = reduxForm({
	form: 'editNewList',
	//validate,
})(EditNewList);

