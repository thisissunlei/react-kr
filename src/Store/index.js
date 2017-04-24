import CommonModel from './CommonModel';
import CommunityDetailModel from './CommunityDetailModel';
import FormModel from './FormModel';
import CommunityAgreementList from './CommunityAgreementList';
import NotifyModel from './NotifyModel';
import NavModel from './NavModel';
import OperationCommunityModel from './OperationCommunityModel';

module.exports = {
	CommonModel,
	CommunityDetailModel,
	FormModel,
	NotifyModel,
	CommunityAgreementList,
	NavModel,
	...OperationCommunityModel
}
