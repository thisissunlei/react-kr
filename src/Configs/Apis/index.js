import AgreementApi from './AgreementApi';
import OrderApi from './OrderApi';
import OtherApi from './OtherApi';
import DemoApi from './DemoApi';
import NavApi from './NavApi';
import PlanApi from './PlanApi';
import CustomerApi from './CustomerApi';
import FinanceApi from './FinanceApi';
import PersonalApi from './PersonalApi';
import OperationApi from './OperationApi';
import CommunityApi from './CommunityApi';
import WebBackstageApi from './WebBackstageApi';
import MemberApi from './MemberApi';


module.exports = {
  ...AgreementApi,
  ...OtherApi,
  ...DemoApi,
  ...NavApi,
  ...OrderApi,
  ...PlanApi,
  ...CustomerApi,
  ...FinanceApi,
  ...PersonalApi,
  ...OperationApi,
  ...CommunityApi,
  ...MemberApi,
}
