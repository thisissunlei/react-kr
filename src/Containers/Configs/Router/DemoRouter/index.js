import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

import {Demo,Basic} from 'kr/Containers';

module.exports =()=>{
	return (
		<Route path="demo" component={Basic}>
				<Route path="zhangqu" component={Demo.ZhangQu}/>
				<Route path="machaoyue" component={Demo.MaChaoYue}/>
				<Route path="dongfanai" component={Demo.DongFanAi}/>
				<Route path="liuyihao" component={Basic}>
						<Route path="new" component={Demo.LiuYiHao.New}/>
						<Route path="PlanMap" component={Demo.LiuYiHao.PlanMap}/>
				</Route>
				<Route path="zhangchi" component={Demo.ZhangChi}/>
				<Route path="tanlinlin" component={Demo.TanLinLin}/>
				<Route path="wushulin" component={Demo.WuShuLin}/>
		</Route>
	);
};
