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

export default class MenuSetting extends Component {

	constructor(props, context) {
		super(props, context);
		var roleId = this.props.params.userId;
		this.state = {
			data: '',
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
			<FirstMenu key={index} detail={item}/>
		)
	}
	render() {
        let data = this.state.data;

		return (
			<div className="g-menu">
                <Section title="菜单配置" >
                    <div className="list">
						{data.map((item,index)=>{
							return this.renderData(item,index);
						})}
                    </div>
                </Section>
			</div>
		);
	}

}
