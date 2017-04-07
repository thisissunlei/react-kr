import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

import {
	Actions,
	Store
} from 'kr/Redux';

import {Demo,Basic} from 'kr/Containers';


const DemoRouter = ()=>{


  return (
    <Route path="demo" component={Basic}>

      <Route path="zhangqu" component={Demo.ZhangQu}/>
      <Route path="machaoyue" component={Demo.MaChaoYue}/>
      <Route path="dongfanai" component={Demo.DongFanAi}/>
      <Route path="liuyihao" component={Basic}>
        <Route path="new" component={Demo.LiuYiHao.New}/>
        <Route path="detail" component={Demo.LiuYiHao.Detail}/>
      </Route>
      <Route path="zhangchi" component={Demo.ZhangChi}/>
      <Route path="tanlinlin" component={Demo.TanLinLin}/>
      <Route path="wushulin" component={Demo.WuShuLin}/>
    </Route>
  );

}

module.exports = DemoRouter;
