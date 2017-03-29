import React from 'react';
import {
	reduxForm,
	change
} from 'redux-form';
import {
	Actions,
	Store,
} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	KrField,
} from 'kr-ui';
import State from './State';
@observer
class SearchData extends React.Component {
	

	constructor(props) {
		super(props);
	}
	
	onChangeSource=(params)=>{
	  let data = !params ? {} : params;
	  if(!data.value){
		 data.value=""
	  }
      var searchParams={};
	  searchParams.sourceId=data.value;
	  State.searchParamsData(searchParams);
	}
    onChangeCity=(params)=>{
      let data = !params ? {} : params;
	  if(!data.value){
		 data.value=""
	  }
      var searchParams={};
      searchParams.cityId=data.value;
      State.searchParamsData(searchParams);
    }


	render() {

		let {refreshState}=this.props;

		return (
		  <div>
			<form>
				 <span className='source-customer'>客户来源:</span>
                 <KrField  grid={1} name="sourceId" style={{marginTop:4,width:262}} component='searchSource'  onChange={this.onChangeSource} placeholder='请选择' refreshState={refreshState}/>

                <div style={{marginLeft:20,display:'inline-block'}}>   
                  <span className='source-customer'>所属城市:</span>
                  <KrField  grid={1} name="cityId" style={{marginTop:4,width:262}} component='searchCity'  onChange={this.onChangeCity} placeholder='请选择'/>
			    </div>
			</form>
          </div>

		);
	}
}

export default reduxForm({
	form: 'SearchData'
})(SearchData);
