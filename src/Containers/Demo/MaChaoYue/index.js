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
import {
	CommonItem
} from 'kr/PureComponents/Agreement';
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
	print=()=>{
		window.print();
	}
	componentWillMount() {
		let height = document.getElementsByClassName('demo-Machaoyue')[0];
		console.log('will',height)
	}
	componentDidMount() {
		let height = document.getElementsByClassName('demo-Machaoyue')[0].offsetHeight;
		console.log('======',height)
		this.pages = Math.ceil(height/1120)+1;
		console.log('did',this.pages)
	}



	
	
	render() {
		// let {communitys}=this.state;
		const {handleSubmit}=this.props;
		let communitys = [1,2,3];
		let src = `http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/app_public_upload/201706/I/172847235_696.png`;
		
		console.log('render',this.pages)
		return (
			    <div style={{background: '#fff',height:1400}} className="demo-Machaoyue">
				<CommonItem />

				<Button onClick={this.print}>打印</Button>

				</div>
		);

	}

}
export default MaChaoYue = reduxForm({
	form: 'MaChaoYue',
	// validate,
})(MaChaoYue);
