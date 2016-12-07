
import React,{Component} from 'react';

import './index.less';

export default class PersonalCenter extends Component{

	static displayName = 'PersonalCenter';
  constructor(props){
    super(props)
		this.state={

		}
  }

	render(){
    let {} = this.props;
		let {}=this.state;
		return (
      <div className="g-personal-center">
          <div className="personal-data">
						<div className="left_box">
								<div className="left">

								</div>
								<div className="middle">
									<div className="line">
										
									</div>
									<div className="circle">

									</div>
									<div className="circle">

									</div>
								</div>
						</div>
								<div className="right_box">

								</div>

          </div>
					<div className="main">
							<div className="level">

							</div>
							<div>

							</div>
							<div>

							</div>
					</div>
    	</div>
		);
	}
}
