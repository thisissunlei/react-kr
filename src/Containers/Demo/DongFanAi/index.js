import React from 'react';
import {
	KrField,
} from 'kr-ui';
import {
	reduxForm,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import { Creatable } from 'react-select';

import { AsyncCreatable } from 'react-select';

class DongFanAi extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state={
			options:[{label:'one',value:"one"}],
			inputList:''
	        
		}
		
	}

	


	componentDidMount() {}

	 getOptions = (input, callback) =>{
  			 setTimeout(function() {
		    callback(null, {
		      options: [
		        { value: 'one', label: 'One' },
		        { value: 'two', label: 'Two' }
		      ],
		      // CAREFUL! Only set this to true when there are no more options,
		      // or more specific queries will not be sent to the server.
		      complete: true
		    });
		  }, 500);
		};
	onInputKeyDown=(event)=> {
		    switch (event.keyCode) {
		        case 9:   // TAB
		            // Extend default TAB behavior by doing something here
		            break;
		        case 13: // ENTER
		            // Override default ENTER behavior by doing stuff here and then preventing default
		            event.preventDefault();
		            break;
		    }
		}

	onOptionClick=(item)=>{
		
		this.setState({
			inputList:item.value
		})
		
	}
	render() {
		let {options,inputList}=this.state;
		
		return (
			<div>
				<form>
				<AsyncCreatable
						style={{width:260,marginLeft:25}}
						name="payAccount"
						value={inputList}
						loadOptions={this.getOptions}
						label="付款账户"
						requireLabel={true}
						options={options}
						onInputKeyDown={this.onInputKeyDown}
						multi={false}
						allCreate={true}
						backspaceRemoves={true}
						ignoreAccents={true}
						ignoreCase={true}
						disabled={false}
						onBlurResetsInput={true}
						placeholder="请输入..."
						searchable={true}
						tabSelectsValue={true}
						onChange={this.onOptionClick}
				/>
				</form>

			</div>

		);
	}
}
export default reduxForm({
	form: 'dongfanfi'
})(DongFanAi);
