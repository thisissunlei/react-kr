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

const Demo_Lianxi = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Demo/Lianxi').default)
  }, 'Demo_Lianxi')
}

const Demo_AnBo = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Demo/AnBo').default)
  }, 'Demo_AnBo')
}



module.exports =()=>{
	return (
		<Route path="demo" getComponent={Basic}>
				<Route path="zhangqu" getComponent={Demo_ZhangQu}/>
				<Route path="machaoyue" getComponent={Demo_MaChaoYue}/>
				<Route path="dongfanai" getComponent={Demo_DongFanAi}/>
				<Route path="liuyihao" getComponent={Basic}>
					<Route path="new" getComponent={Demo_LiuYiHao_New}/>
				</Route>
				<Route path="zhangchi" getComponent={Demo_ZhangChi}/>
				<Route path="tanlinlin" getComponent={Demo_TanLinLin}/>
				<Route path="wushulin" getComponent={Demo_WuShuLin}/>
				<Route path="lianxi" getComponent={Demo_Lianxi}/>
				<Route path="anbo" getComponent={Demo_AnBo}/>
		</Route>
	);
};
