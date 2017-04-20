import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

import Operation from 'kr/Containers/Operation';
import Basic from 'kr/Containers/Basic';

module.exports =()=>{


	return (
    <Route path="community" component={Basic}>
         <IndexRedirect to="communityManage/detail" />

        {/*销控表*/}
        <Route path="communityManage" component={Basic}>
                <Route path="detail" component={Operation.CommunityManage.Detail}/>
        </Route>

        {/*公司成员*/}
        <Route path="companyMembers" component={Basic}>
                <Route path=":companyId/list/:communityId" component={Operation.CommunityManage.CompanyMembers}/>
        </Route>
    </Route>
	);
};
