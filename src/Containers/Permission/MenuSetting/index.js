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
			data: [
    {
        "name": "th1",
        "childList": [
            {
                "name": "th2",
                "id": 99
            },
            {
                "name": "th2",
                "childList": [
                    {
                        "name": "th3",
                        "id": 100
                    },
                    {
                        "name": "th3",
                        "id": 101
                    },
                    {
                        "name": "th3",
                        "id": 102
                    }
                ],
                "id": 11
            }
        ],
        "id": 10
    },
    {
        "name": "th1",
        "childList": [
            {
                "name": "th2",
                "id": 99
            },
            {
                "name": "th2",
                "childList": [
                    {
                        "name": "th3",
                        "id": 100
                    },
                    {
                        "name": "th3",
                        "id": 101
                    },
                    {
                        "name": "th3",
                        "id": 102
                    }
                ],
                "id": 11
            }
        ],
        "id": 10
    }
],
		}
	}
	// componentDidMount() {

    //     var _this = this;
    //     Http.request('get-version-detail', {

    //         },{}).then(function(response) {
    //             _this.setState({data: response},function(){

    //             })
    //         }).catch(function(err) {});
    // }
	onSearchSubmit = () => {
	

	}

	renderData=(item,index)=>{
		return (
			<FirstMenu key={index} detail={item} onSubmit={this.updateData}/>
		)
	}
	updateData=()=>{
		    var _this = this;
			Http.request('get-menu-list', {

            },{}).then(function(response) {
                _this.setState({data: response},function(){

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
		}).catch(function(err) {});
	}
	render() {
        let data = this.state.data;
		console.log(data);
		return (
			<div className="g-menu">
                <Section title="菜单配置" >
					<div className="new-nav">
						<Button label="新增导航" type="button" onClick={this.openFirstCreate} width={100} height={40} fontSize={14}/>
					</div>
                    <div className="list">
						{data.map((item,index)=>{
							return this.renderData(item,index);
						})}
                    </div>
                </Section>
				<Dialog
						title="新增导航"
						modal={true}
						open={this.state.openFirstCreate}
						onClose={this.openFirstCreate}
						contentStyle={{width:666}}
					>
						<CreateFirst  onSubmit = {this.onCreateFirstSubmit} onCancel={this.openFirstCreate} />
				</Dialog>
			</div>
		);
	}

}
