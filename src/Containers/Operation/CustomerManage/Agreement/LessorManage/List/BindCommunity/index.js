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
        name: "北京",
        cityId: 1,
				type:'city',
        isBind:false,
        community: [
            {
                cmtId: 1,
								type:'cmt',
                isBind:false,
                cmtName: "北京创业大街社区"
            },
            {
                cmtId: 2,
								type:'cmt',
                isBind:false,
                cmtName: "北京酒仙桥社区"
            }
        ]
    },
    {
        cityName: "上海",
        cityId: 3,
				type:'city',
        isBind:false,
        community: [
            {
                cmtId: 3,
                isBind:false,
								type:'cmt',
                cmtName: "上海田林社区"
            },
            {
                cmtId: 4,
                isBind:false,
								type:'cmt',
                cmtName: "上海传奇广场社区"
            }
        ]
    }
];

export default class BindCommunity extends React.Component {

	// static propTypes = {
	// 	detail: React.PropTypes.object,
	// 	onCancel: React.PropTypes.func,
	//
	// }

	constructor(props) {
		super(props);
		this.onCancel = this.onCancel.bind(this);
        this.state = {
            jsonData: jsonData,
        }
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
  renderCheckBox = () =>{
		// return <div>werw</div>
    let parentArr = jsonData.map(function(item,index){
        let childArr = item.community.map(function(item1,index1){
            return <div><Checkbox label = {item1.cmtName} checked = {item1.isBind} index = {item1} /></div>
        })
        return (<div>
                    <div><Checkbox label = {item.cityName} checked = {item.isBind} data = {item} /></div>
                    {childArr}
                </div>)
    })
    return <div>{parentArr}</div>
  }

	render() {

		return (

			<div className="bind-community" style={{marginTop:40}}>
          {this.renderCheckBox()}
      </div>

		);
	}
}
