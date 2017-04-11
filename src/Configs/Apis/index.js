import AgreementApi from './AgreementApi';
import OtherApi from './OtherApi';
import DemoApi from './DemoApi';
import NavApi from './NavApi';

module.exports = {
  ...AgreementApi,
  ...OtherApi,
  ...DemoApi,
  ...NavApi,
}
