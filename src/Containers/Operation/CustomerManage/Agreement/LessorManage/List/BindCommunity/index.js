import React, {

	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	KrField,
  Checkbox
} from 'kr-ui';
const jsonData = [
    {
        cityName: "北京",
        cityId: 1,
        isBind:false,
        community: [
            {
                cmtId: 1,
                isBind:false,
                cmtName: "北京创业大街社区"
            },
            {
                cmtId: 2,
                isBind:false,
                cmtName: "北京酒仙桥社区"
            }
        ]
    },
    {
        cityName: "上海",
        cityId: 3,
        isBind:false,
        community: [
            {
                cmtId: 3,
                isBind:false,
                cmtName: "上海田林社区"
            },
            {
                cmtId: 4,
                isBind:false,
                cmtName: "上海传奇广场社区"
            }
        ]
    }
];

export default class BindCommunity extends React.Component {

	static propTypes = {
		detail: React.PropTypes.object,
		onCancel: React.PropTypes.func,

	}

	constructor(props) {
		super(props);
		this.onCancel = this.onCancel.bind(this);
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
  renderCheckBox = () =>{
    jsonData.map(function(item,index){

    })
  }

	render() {

		return (

			<div className="bind-community" style={{marginTop:40}}>

      </div>

		);
	}
}
