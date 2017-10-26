import {
	PlanMap,
	Dialog,
	Button,
	XTable,
	XTableRow,
	Section,
	SliderTree,
    ArticleList,
    Message
} from 'kr-ui';
import React, { PropTypes } from 'react';

import { observer, inject } from 'mobx-react';
import './index.less';
import {Http,delHtmlTag} from 'kr/Utils';
@observer
export default class PrintOther extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
		
		}

	}
	componentDidMount(){
		
	}
    getDetail = () =>{
        var params = Object.assign({},this.state.searchParams);
        
        var _this = this;
        let {listData} = this.state;
        Http.request("get-home-dynamics-list",params).then(function (response) {
           
         
            
		}).catch(function (err) {
			Message.error(err.message);
		});

        
    }
   
   
	render() {
        const {totalCount,searchParams,newPage} = this.state;
        var btnShow = false;
        if(newPage*searchParams.pageSize < totalCount){
            btnShow = true;
        }
        // return null;
		return (
			<div className="dynamics_profile">
                <img className = "title-img" src={banner} alt=""/>
				<div className="dynamics_list" style = {{marginBottom:btnShow?0:50}} >
                    {this.profileRender()}
                   {  btnShow && <div className="browse_more" 
                        onClick = {this.getDetail}
                    >
                        浏览更多
                    </div>}
                </div>

			</div>

		);
	}
}
