import React from 'react';
import {
  KrField,
  Button
} from 'kr-ui';
import './index.less';
export default class BasicInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
	}


	render(){

		return(

			<div className='basic-form'>
        <div>
  				 <KrField component="labelText" grid={1/2} label="表单名称" value='123' defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1/2} label="表单表名" value='123' defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1/2} label="表单类型" value='123' defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1/2} label="表单分类" value='123' defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1} label="是否启用" value='123' defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1} label="描述" value='123' defaultValue="无" inline={false}/>
        </div>

        <div className='edit-btn'>
          <Button
              label="编辑"
              type='button'
              onTouchTap={this.newSwidth}
          />
        </div>

      </div>
		);
	}

}
