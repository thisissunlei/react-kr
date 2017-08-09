import React from 'react';
import {
	KrField
} from 'kr-ui';
import {
	numberToSign
} from 'kr/Utils'
import {reduxForm} from 'redux-form';
let positionList = [
    {
        "label": "财务主管",
        "value": 1
    },
    {
        "label": "财务总监",
        "value": 2
    },
    {
        "label": "财务经理",
        "value": 3
    },
    {
        "label": "出纳",
        "value": 4
    },
    {
        "label": "高级经理（法务）",
        "value": 5
    },
    {
        "label": "法务专员",
        "value": 6
    },
    {
        "label": "档案管理专员",
        "value": 7
    },
    {
        "label": "副总裁",
        "value": 8
    },
    {
        "label": "高级咨询经理",
        "value": 9
    },
    {
        "label": "项目主管",
        "value": 10
    },
    {
        "label": "高级研究员",
        "value": 11
    },
    {
        "label": "公共事务副总裁",
        "value": 12
    },
    {
        "label": "公共事务总监",
        "value": 13
    },
    {
        "label": "HR主管",
        "value": 14
    },
    {
        "label": "行政高级主管",
        "value": 15
    },
    {
        "label": "HRBP",
        "value": 17
    },
    {
        "label": "高级HRBP",
        "value": 18
    },
    {
        "label": "薪酬福利专员",
        "value": 19
    },
    {
        "label": "薪酬福利助理",
        "value": 20
    },
    {
        "label": "董秘",
        "value": 23
    },
    {
        "label": "CFO",
        "value": 24
    },
    {
        "label": "VP",
        "value": 25
    },
    {
        "label": "投资总监",
        "value": 26
    },
    {
        "label": "投资主管",
        "value": 27
    },
    {
        "label": "CEO",
        "value": 28
    },
    {
        "label": "CEO司机兼助理",
        "value": 29
    }
];
class New extends React.Component {


	constructor(props, context) {
		super(props, context);

		this.state = {
            right:[
                {
                    "label": "财务主管",
                    "value": 1
                },
                {
                    "label": "财务总监",
                    "value": 2
                },
                {
                    "label": "财务经理",
                    "value": 3
                },
            ]
		}
	}




	componentDidMount() {}

	render() {

		return (
			<div style = {{height:2000}}>
			<KrField
						grid={1/2}
						style={{width:262}}
						name="jobId"
						leftData={positionList}
						component="switchSlide"
						label="职务"
						checkable = {true}
						control='double'
						requireLabel={true}
						multiSwitch={true}
                        rightData={this.state.right}
				/>
			</div>

		);
	}
}
export default reduxForm({ form: 'New'})(New);
