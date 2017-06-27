import React from 'react';
import {
	Title,
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	SearchForms,
	Dialog,
	Message,
	DivTitle,
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import {Actions,Store} from 'kr/Redux';
import './index.less';
import ReactMixin from "react-mixin";
import AdvancedQuery from './AdvancedQuery';
import {reduxForm} from 'redux-form';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import State from './State';

@observer
@ReactMixin.decorate(LinkedStateMixin)

class MaChaoYue extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		this.state={
			picUrl:'',
			selectedCommunitys:[],
			batchUploadNum :false,
			openSchedule : false,
			submitValues : '',
			submitNum : 0,
			innerBoxWidth :0,
			uploadedNum:0,
			totalNum:0,
			submitValuesParams:{},
			requestURI:'/api/krspace-finance-web/community/sysDeviceDefinition/upload-pic',
			communitys: []
		}
	}
	onSubmit=(value)=>{
		let cmtIds = [];
		value.communitys.map((item)=>{
			cmtIds.push(item.id)
		})
	}



	
	
	render() {
		// let {communitys}=this.state;
		const {handleSubmit}=this.props;
		let communitys = [1,2,3];
		

		return (
			    <div style={{background: '#fff',width:'750px'}}>
			    <div>基本信息</div>
			    <DivTitle index={1} title='进本信息'>
			    	dsadad
				<form onSubmit={handleSubmit(this.onSubmit)}>

					<KrField name="communitys"
						options={communitys}
						component="activity"
						defaultValue={communitys}
						getList={this.getList}
						label="活动推送社区"
					/>
					<Button  label="开始上传" type="submit"/>

			    </form>
			    	
			    	
				</DivTitle>

				</div>
		);

	}

}
export default MaChaoYue = reduxForm({
	form: 'MaChaoYue',
	// validate,
})(MaChaoYue);
