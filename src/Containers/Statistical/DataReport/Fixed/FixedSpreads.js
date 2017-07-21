import React from 'react';

import {
	CheckPermission,
	Button,
	Dialog,
	Title,
	Section
} from 'kr-ui';
import './index.less';
import State from '../State';
import {
	observer,
} from 'mobx-react';
@observer
export default class FixedSpreads extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state={
          
		}
				
	}
    
	//账单明细关闭
	
	 
	render() {
		
		return (
			
            <div>
                 <table ref = {
                            (ref)=>{
                                this.spreads = ref;
                            }
                        } 
                    className = "report-table" width = "186" cellSpacing="0" cellPadding="5" >
                    <tbody>
                        <tr>

                            <td rowSpan="2">城市</td>
                            <td rowSpan="2">社区</td>
                            <td >fsf</td>
                        </tr>
                        <tr>
                            <td >sdfs</td>
                        </tr>
                        <tr>

                            <td >全国</td>
                            <td >全部</td>
                            
                            <td ></td>
                            
                        </tr>
                    
                    </tbody>
                </table>
            </div>

		);
	}
}

