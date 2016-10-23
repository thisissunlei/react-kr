import React from 'react';
import Notify from '../../../Notify';
import Promise from 'promise-polyfill';
import {Actions,Store} from 'kr/Redux';


export default class FileUploadComponent extends React.Component{

	constructor(props){
		super(props)
	}

	render(){

   	     let { input, label, type, meta: { touched, error },children,disabled,style,requireLabel,options} = this.props;

		var form = {
			sourceservicetoken:'',
			docTypeCode:''
		};
		var token = '';

		function changeValue(item){

			window.item = item;
			form.docTypeCode = item;

			console.log(item);

			Store.dispatch(Actions.callAPI('getSourceServiceToken')).then(function(response){
				form.sourceservicetoken = response;
				console.log('--form',form,response);
				Store.dispatch(Actions.callAPI('uploadSingleFile',{},form)).then(function(response){
					console.log("response",response);
				}).catch(function(err){
					Notify.show([{
						message:err.message,
						type: 'danger',
					}]);
				});
			}).catch(function(err){
				Notify.show([{
					message:'后台出错了，获取token失败!',
					type: 'danger',
				}]);
			});

			input.onChange('1');
		}

		return (
			<div className="form-item-wrap" style={style}>
			<div className="form-item">
			<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
			<div className="form-main">
			<div className="form-input">
			<input type="file" onChange={changeValue} name={input.name}/>
			</div>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
			</div>
			</div>
			</div>
		);


	}
}




