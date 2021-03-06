import CommonModel from './CommonModel';
import CommunityDetailModel from './CommunityDetailModel';
import FormModel from './FormModel';
import NewIndentModel from './NewIndentModel';
import CommunityAgreementList from './CommunityAgreementList';
import NotifyModel from './NotifyModel';
import NavModel from './NavModel';
import OperationCommunity from './OperationCommunity';
import LeftIconClick from './LeftIconClick';
import TextDicModel from './TextDicModel';

module.exports = {
	CommonModel,
	CommunityDetailModel,
	FormModel,
	NotifyModel,
	CommunityAgreementList,
	NavModel,
	...OperationCommunity,
	NewIndentModel,
	LeftIconClick,
	TextDicModel
}
