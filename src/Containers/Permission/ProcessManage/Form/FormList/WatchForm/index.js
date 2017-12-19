import React from 'react';
import {
	TabCs,
	TabC,
	DrawerTitle
} from 'kr-ui';
import BasicInfo from './BasicInfo';
import TextInfo from './TextInfo';
import './index.less';

export default class WatchForm  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	editOpen=()=>{
    const {editOpen}=this.props;
    editOpen && editOpen();
  }

  allClose=()=>{
    const {allClose}=this.props;
    allClose && allClose();
  }

	render(){


		let {basicInfo,textInfo}=this.props;


		return(

			<div>
				 <div className='m-or-role' style={{paddingLeft:0}}>
				    <div className="title">
                    <DrawerTitle title ="查看表单" onCancel = {this.allClose}/>
            		</div>
			    </div>
				<div className='role-tab'>
				    <TabCs
					  isDetail='role'
			        >
						<TabC label='基本信息'>
							<BasicInfo
								 editOpen={this.editOpen}
								 allClose={this.allClose}
								 basicInfo={basicInfo}
							/>
						</TabC>

						<TabC label='字段信息'>
						  <TextInfo 
							  textInfo={textInfo}
								basicInfo={basicInfo}
								onClose={this.allClose}
							/>
						</TabC>
				  </TabCs>

			  </div>
			</div>
		);
	}
}
