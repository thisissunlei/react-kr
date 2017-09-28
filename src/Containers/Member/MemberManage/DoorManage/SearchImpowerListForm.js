import React, {
	PropTypes
} from 'react';

import {
	reduxForm,
} from 'redux-form';

import {
	KrField,
	SearchForms,
	Message
} from 'kr-ui';
import './index.less';
import {Http} from 'kr/Utils';


export default class SearchDetailForm extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.detail = this.props.detail;

		this.state={
			floorsOptions:[]
		}
	}

	componentDidMount(){
		let detail = this.detail;
		this.getFloorOptions(detail);
	}

	onSubmit=(values)=>{
	}

	

	getFloorOptions=()=>{

		let _this =this;
		let detail = _this.detail;
		Http.request('getFloorByComunity',{communityId :detail.communityId}).then(function(response){
    		var arrNew = []
    		for (var i=0;i<response.floors.length;i++){
    			arrNew[i] = {label:response.floors[i],value:response.floors[i]}
    		}
    		_this.setState({
    			floorsOptions : arrNew
    		})
    	}).catch(function(err){
    		Message.error(err.message);
    	})
	}


	onSearchSubmit=(value)=>{

	}


	onChangeFloor=(floorValue)=>{

		let {onChangeFloor} = this.props;
		onChangeFloor && onChangeFloor(floorValue.value||"");
	}

	onSearchDoorCode=(searchValue)=>{
		console.log("searchValue",searchValue);
		let {onSearchDoorCode} = this.props;
		onSearchDoorCode && onSearchDoorCode(searchValue.content||"");
	}

	render() {
		let {detail,handleSubmit} = this.props;
		let {floorsOptions} = this.state;
		let options=[{
		      label:"门标题",
		      value:"doorCode"
		    }]
		
		return (
			<div className="edit-form" style={{display:"inline-block",padding:0}}>
				<form onSubmit={handleSubmit(this.onSubmit)} className="impower-list-search-form">

					<KrField name="floor"
						component="select"
						label="楼层："
						options = {floorsOptions}
						style={{width:155}}
						inline={true}
						onChange = {this.onChangeFloor}
					/>
					<SearchForms 
						onSubmit={this.onSearchDoorCode}  
						ref = "inputFilter"
	                    style={{marginTop:3,zIndex:10000,marginLeft:10}}
	                    content={this.state.content}
	                    searchFilter={options}
	              	/>
				</form>
			</div>
)
	}
}
const validate = values => {

	const errors = {}


	return errors
}
SearchDetailForm = reduxForm({
	form: 'SearchDetailForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(SearchDetailForm);
