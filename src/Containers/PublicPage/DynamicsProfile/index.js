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

import banner from './images/banner.png'
@inject("NavModel")
@observer
export default class DynamicsProfile extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams:{
				page:1,
                pageSize:10,
			},
            newPage:1,
            listData:[],
            totalPages:0,
            totalCount:0
		
		}

	}
	componentDidMount(){
		const { NavModel } = this.props;
		NavModel.setSidebar(false);
        this.getDetail();
	}
    getDetail = () =>{
        var params = Object.assign({},this.state.searchParams);
        
        var _this = this;
        let {listData} = this.state;
        Http.request("get-home-dynamics-list",params).then(function (response) {
           
            _this.setState({
                listData:listData.concat(response.items),
                searchParams:{
                    page:response.page+1,
                    pageSize:10,
                },
                newPage:response.page,
                totalPages:response.totalPages,
                totalCount:response.totalCount
            })
            
		}).catch(function (err) {
			Message.error(err.message);
		});

        
    }
   
    goDetail = (data) =>{
        let id=data.id;
        Http.request('home-click-dynamic',{},{id:id}).then(function (response) {  
		}).catch(function (err) {
		});
        if(data.linkUrl){
            window.open(data.linkUrl);
            return ;
        }
       
		window.open(`./#/publicPage/${id}/dynamicsDetail`,'_blank');
    }
    profileRender = () =>{
        let {listData} = this.state; 

        var items = this.dataFilter(listData);
        var articleList = items.map((item,indx)=>{
            return <ArticleList detail = {item} onClick= {this.goDetail}/>
        })
        
        return articleList;
    }
    dataFilter = (data) =>{
       var arr=data.map((item,index)=>{
            if(item.photoUrl){
                item.url = item.photoUrl;
                item.content = delHtmlTag(item.content||item.desc);
            }
            return item;
        })
        return arr;
     
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
