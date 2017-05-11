import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

const Basic = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Basic').default)
  }, 'Basic')
}

const Demo_ZhangQu = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Demo/ZhangQu').default)
  }, 'Demo_ZhangQu')
}

const Demo_MaChaoYue = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Demo/MaChaoYue').default)
  }, 'Demo_MaChaoYue')
}

const Demo_DongFanAi = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Demo/DongFanAi').default)
  }, 'Demo_DongFanAi')
}


const Demo_LiuYiHao_New = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Demo/LiuYiHao/New').default)
  }, 'Demo_LiuYiHao_New')
}

const Demo_LiuYiHao_PlanMap = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Demo/LiuYiHao/PlanMap').default)
  }, 'Demo_LiuYiHao_PlanMap')
}


const Demo_LiuYiHao_FloorMap = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Demo/LiuYiHao/FloorMap').default)
  }, 'Demo_LiuYiHao_FloorMap')
}


const Demo_ZhangChi = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Demo/ZhangChi').default)
  }, 'Demo_ZhangChi')
}

const Demo_TanLinLin = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Demo/TanLinLin').default)
  }, 'Demo_TanLinLin')
}

const Demo_WuShuLin = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Demo/WuShuLin').default)
  }, 'Demo_WuShuLin')
}

module.exports =()=>{
	return (
		<Route path="demo" getComponent={Basic}>
				<Route path="zhangqu" getComponent={Demo_ZhangQu}/>
				<Route path="machaoyue" getComponent={Demo_MaChaoYue}/>
				<Route path="dongfanai" getComponent={Demo_DongFanAi}/>
				<Route path="liuyihao" getComponent={Basic}>
					<Route path="new" getComponent={Demo_LiuYiHao_New}/>
					<Route path="floorMap" getComponent={Demo_LiuYiHao_FloorMap}/>
					<Route path="planMap" getComponent={Demo_LiuYiHao_PlanMap}/>
				</Route>
				<Route path="zhangchi" getComponent={Demo_ZhangChi}/>
				<Route path="tanlinlin" getComponent={Demo_TanLinLin}/>
				<Route path="wushulin" getComponent={Demo_WuShuLin}/>
		</Route>
	);
};
