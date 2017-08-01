import { default as Organization } from './Organization';
import {default as PersonalManage} from './PersonalManage';
import {default as PeopleDetail} from './PeopleDetail';
import {default as BasicConfig} from './BasicConfig';
import {default as ProcessManage} from './ProcessManage';
module.exports = {
	...Organization,
	...PersonalManage,
	...BasicConfig,
	...PeopleDetail,
	...ProcessManage
}


























