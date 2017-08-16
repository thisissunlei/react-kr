import React from 'react';
import {
	KrField,
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
	Drawer,
	Message
} from 'kr-ui';
import {
	Http
} from "kr/Utils";
import './index.less';
import { observer, inject } from 'mobx-react';

@inject("NavModel")
@observer
export default class Home extends React.Component {

	constructor(props,context){
		super(props, context);
        this.state={
            infoList:{},
        }
	}

  componentDidMount() {
    const { NavModel } = this.props;
	NavModel.setSidebar(false);
  }
  
  render() {
    return (
      <div className="g-home">
        <div className="g-home-header">
            <div className="home-date">
							<div className="date">
								<div className="left-date">
								8月2日
								</div>
								<div className="right-date">
									周三
								</div>
							</div>
						</div>
            <div className="home-common">
							<div className="left itemOne">

							</div>
							<div className="right">
								<span className="top">

								</span>
								<span className="bottom">
									已办事宜
								</span>
							</div>
						</div>
            <div className="home-common">
							<div className="left itemTwo">

							</div>
							<div className="right">
								<span className="top">

								</span>
								<span className="bottom">
									已办事宜
								</span>
							</div>
						</div>
            <div className="home-common">
							<div className="left itemThird">

							</div>
							<div className="right">
								<span className="top">

								</span>
								<span className="bottom">
									我的请求
								</span>
							</div>
						</div>
						<div className="home-common">
							<div className="left itemFourth">
								
							</div>
							<div className="right">
								<span className="top">

								</span>
								<span className="bottom">
									发起流程
								</span>
							</div>
						</div>
        </div>
				<div className="g-home-middle">
						<div className="g-home-middle-item">
							
						</div>
						<div className="g-home-middle-item">
							<div className="title">
								<div className="circle">
									
								</div>
								<div className="left">
									最近动态
								</div>
								<div className="right">
									更多
								</div>
							</div>
						</div>
						<div className="g-home-middle-item">
							<div className="title">
								<div className="circle">
									
								</div>
								<div className="left">
									最近动态
								</div>
								
							</div>
						</div>
				</div>
      </div>
    );
  }
}
