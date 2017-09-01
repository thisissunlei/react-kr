
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Section,
} from 'kr-ui';

import $ from 'jquery';
import './index.less';

import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer



class WarnContent extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			
		}
	}
	
	componentDidMount(){
		let {detail} = this.props;
		let _this = this;
		var isJsonStr = _this.isJSON(detail.content);
		if(isJsonStr){
			$("#warn-content").html(_this.syntaxHighlight(detail.content));
		}else{
			$("#warn-content-p").html(detail.content);
		}
	}
	

	onCancle=()=>{
		let {onCancle} = this.props;
		onCancle && onCancle();
	}


	isJSON=(str)=>{

	    if (typeof str == 'string') {

	        try {

	            JSON.parse(str);
	            
	            if(typeof str =='object'){
	            	return true;
	            }else{
	            	return false;
	            }

	        } catch(e) {
	            return false;

	        }
	    }   
	}

	syntaxHighlight=(json)=>{
		if(!json){
			return;
		}
		json = JSON.parse(json);
	    if (typeof json != 'string') {
	        json = JSON.stringify(json, undefined, 2);
	    }
	    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
	    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
	        var cls = 'number';
	        if (/^"/.test(match)) {
	            if (/:$/.test(match)) {
	                cls = 'key';
	            } else {
	                cls = 'string';
	            }
	        } else if (/true|false/.test(match)) {
	            cls = 'boolean';
	        } else if (/null/.test(match)) {
	            cls = 'null';
	        }
	        return '<span class="' + cls + '">' + match + '</span>';
	    });
	}

	
	
	render(){

		return(
			<div style={{margin:45}} className="warn-content-box">
				<Section title={`故障报警`} description="" >
		            <div style={{color:"#333333",fontSize:16}} id="warn-content-p"><pre id="warn-content"></pre></div>
		            <Grid style={{marginTop:30,marginBottom:'4px'}}>
		                  <Row>
		                    <ListGroup>
		                      <ListGroupItem style={{width:"100%",textAlign:'center',padding:0}}>
		                        <Button  label="确定" type="button"  cancle={true} onTouchTap={this.onCancle} />
		                      </ListGroupItem>
		                    </ListGroup>
		                  </Row>
		             </Grid>
	             </Section>
	        </div>
		);
	}
}
const validate = values=>{
	const errors={};
	// if(!values.communityId){
	// 	errors.communityId = '社区名称为必填项';
	// }
	return errors;
}
export default WarnContent = reduxForm({
	form: 'WarnContent',
	validate,
})(WarnContent);
