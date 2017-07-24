import React from 'react';
import {
	KrField
} from 'kr-ui';
import {
	numberToSign
} from 'kr/Utils'
import {reduxForm} from 'redux-form';
class New extends React.Component {


	constructor(props, context) {
		super(props, context);

		this.state = {
		}
	}




	componentDidMount() {}

	render() {
		return (
			<div style = {{height:2000}}>
				<KrField
					grid={1/2}
					style={{width:262,marginLeft:28}}
					name="leader"
					component="selectTree"
					label="直接上级"
					treeType = "personnel"
					ajaxUrlName = "get-personnel-tree"
					params = {{dimId:''}}
					requireLabel={true}
				/>
			</div>

		);
	}
}
export default reduxForm({ form: 'New'})(New);
