import React from 'react';

import Section from 'kr-ui/Section';


import './index.less';

export default class Help extends React.Component{

	constructor(props,context){
		super(props, context);
	}


	render(){

		return(
			<div>
					<Section title="帮助中心" description="" >

						遇到疑难杂症了？ok,@joneyphair,马上解决
					</Section>
			</div>

		);

	}

}
