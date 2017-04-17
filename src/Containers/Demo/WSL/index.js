import React from 'react';
import {KrField} from 'kr-ui';
import './index.less';

export default class WSL  extends React.Component{

	constructor(props,context){
		super(props, context);

	}


	render(){

		return(
             <div>
			       <KrField name="uploadImageList"
								component="uploadImageList"
								style={{marginTop:10}}
								photoSize={'212*136'}
								pictureFormat={'JPG'}
								pictureMemory={'32K'}
								//requestURI = {this.state.requestURI}
					/>
			  </div>
		);
	}

}
