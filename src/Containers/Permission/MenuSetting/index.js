import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, {
	Component,
	PropTypes
} from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';
import {
	Http
} from "kr/Utils";

import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
import {
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
	Grid,
	Row,
	Col,
	ListGroupItem,
	ListGroup,
	Dialog,
	SearchForms,
	KrDate,
	Message
} from 'kr-ui';
import './index.less';
import FirstMenu from './FirstMenu';
import CreateFirst from './CreateFirst';

export default class MenuSetting extends Component {

	constructor(props, context) {
		super(props, context);
		var roleId = this.props.params.userId;
		this.state = {
			openFirstCreate:false,
			data: [],
		}
	}
	componentDidMount() {

        // var _this = this;
        // Http.request('get-version-detail', {

        //     },{}).then(function(response) {
        //         _this.setState({data: response},function(){

        //         })
        //     }).catch(function(err) {});
		this.updateData();
    }
	onSearchSubmit = () => {
	

	}

	renderData=(item,index)=>{
		//console.log("重新renderdata");
		//console.log(item,"renderdata");
		return (
			<FirstMenu key={index} detail={item} onSubmit={this.updateData}/>
		)
	}
	updateData=()=>{
		    var _this = this;
			//console.log("进入update");
			Http.request('get-menu-list', {

            },{}).then(function(response) {
                _this.setState({data: response.items},function(){
					
                })
            }).catch(function(err) {});
    
	}
	openFirstCreate=()=>{
		let openFirstCreate = this.state.openFirstCreate;
		var _this = this;
		this.setState({
			openFirstCreate:!openFirstCreate
		})
	}
	onCreateFirstSubmit=(form)=>{
		var _this = this;
		const {
			onSubmit,
		} = this.props;
		Http.request('first-level-save', {},form).then(function(response) {
			_this.updateData();
			_this.openFirstCreate();
			Message.success("新建成功");
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	render() {
        let data = this.state.data;
		//console.log(data);
		return (
			<div className="g-menu">
                <Section title="菜单配置" >
					<div className="new-nav">
						<Button label="新增导航" type="button" onClick={this.openFirstCreate} width={82} height={30} fontSize={14}/>
					</div>
                    <div className="list">
						{this.state.data.map((item,index)=>{
							return this.renderData(item,index);
						})}
                    </div>
                </Section>
				<Dialog
						title="新增导航"
						modal={true}
						open={this.state.openFirstCreate}
						onClose={this.openFirstCreate}
						contentStyle={{width:460}}
					>
						<CreateFirst onSubmit={this.onCreateFirstSubmit} onCancel={this.openFirstCreate} />
				</Dialog>
			</div>
		);
	}

}
