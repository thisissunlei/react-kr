import {
	PlanMap,
	Dialog,
	Button,
	XTable,
	XTableRow,
	Section,
	SliderTree,
    ArticleList
} from 'kr-ui';
import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import banner from './images/banner.png'
@inject("NavModel")
@observer
export default class DynamicsProfile extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams:{
				name:'ddsdfs'
			},
		
		}

	}
	componentDidMount(){
		const { NavModel } = this.props;
		NavModel.setSidebar(false);

	}
    getDetail = () =>{
        
    }
    profileRender = () =>{
        const detail = {
            title:"即时的多语种在线翻译",
            url:'',
            content:'美国知名社交网站facebook要来中国高薪挖人的消息已经在业界风传一段时间。昨天，清华大学首届“姚班”学生、即将博士毕业、因为杰出的编程才能江湖人称“楼教主”的楼天城亲口向记者证实，他已经拿到了facebook的offer（聘任通知书），被邀请去其位于硅谷的总部工作。至于传言中的“年薪20万美元+美国绿卡”的待遇，楼天城坦承，他与facebook还没有谈到待遇问题，但“应该差不多吧”。而且，对这个羡煞旁人的职位，这位博士生淡然表示“还在考虑”。'
        }
        const detail1 = {
            title:"即时的多语种在线翻译",
            url:banner,
            content:'美国知名社交网站facebook要来中国高薪挖人的消息已经在业界风传一段时间。昨天，清华大学首届“姚班”学生、即将博士毕业、因为杰出的编程才能江湖人称“楼教主”的楼天城亲口向记者证实，他已经拿到了facebook的offer（聘任通知书），被邀请去其位于硅谷的总部工作。至于传言中的“年薪20万美元+美国绿卡”的待遇，楼天城坦承，他与facebook还没有谈到待遇问题，但“应该差不多吧”。而且，对这个羡煞旁人的职位，这位博士生淡然表示“还在考虑”。'
        }
        
        return (<div>
            <ArticleList detail = {detail} />
            <ArticleList detail = {detail1} />
        </div>)
    }
	click = () =>{

    }
	render() {
		
		return (
			<div className="dynamics_profile">
                <img src={banner} alt=""/>
				<div className="dynamics_list" >
                    {this.profileRender()}
                    <div className="browse_more" 
                        onClick = {this.click}
                    >
                        浏览更多
                    </div>
                </div>

			</div>

		);
	}
}
