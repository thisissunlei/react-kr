
import AgreementApi from './AgreementApi';
import OrderApi from './OrderApi';
import OtherApi from './OtherApi';
import DemoApi from './DemoApi';
import NavApi from './NavApi';
import PlanApi from './PlanApi';
import CustomerApi from './CustomerApi';
import FinanceApi from './FinanceApi';
import PermissionApi from './PermissionApi';
import OperationApi from './OperationApi';
import CommunityApi from './CommunityApi';
import WebBackstageApi from './WebBackstageApi';
import MemberApi from './MemberApi';
import NotifyApi from './NotifyApi';
import StatisticalApi from './StatisticalApi';
import CommonApi from './CommonApi';
import SynchronizationApi from './SynchronizationApi';
import OAApi from './OAApi';
import SmartHardware from './SmartHardware';



module.exports = {
  ...AgreementApi,
  ...OtherApi,
  ...DemoApi,
  ...NavApi,
  ...OrderApi,
  ...PlanApi,
  ...CustomerApi,
  ...FinanceApi,
  ...PermissionApi,
  ...OperationApi,
  ...CommunityApi,
  ...MemberApi,
  ...NotifyApi,
  ...StatisticalApi,
  ...WebBackstageApi,
  ...CommonApi,
  ...SmartHardware,
  ...SynchronizationApi,
  ...OAApi
}
