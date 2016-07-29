import {Link} from 'react-router';
import React, {Component, PropTypes} from 'react';

import './index.less';


export default class Footer extends Component{


	render(){

		return (

			<div className="f-footer">

			<div className="container">

			<ul>
				<li>

				<div className="title">让创业更简单</div>

					<div className="item">
					<a href="">关于36氪</a>
					<a href="">氪空间</a>
					<a href="">加入我们</a>
					<a href="">寻求报道</a>
					<a href="">客户端下载</a>
					</div>

					<div className="item">
					<span>反馈建议</span>
					<a href="">service@36kr.com</a>
					</div>

					<div className="item">
					<span>客服电话</span>
					<a href="">400-9953636</a>
					</div>

				</li>

				<li>
				<div className="title">合作伙伴</div>
				</li>

				<li>

				</li>
			</ul>

			</div>


			</div>
		);

	}



}






