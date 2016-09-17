import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr/Redux/Actions';


function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
  };
}

module.exports = function(mapStateToProps){
	return connect(mapStateToProps,mapDispatchToProps);
}


