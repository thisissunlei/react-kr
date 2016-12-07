import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';


import './index.less';

export default class InputComponent extends React.Component{



	constructor(props,context){
		super(props,context)



    this.state ={
      editOpen:false,
      value1:'改动前一二三四五六七'
    }
	}
  onEdit = ()=>{

    console.log(this.state.editOpen)
    this.setState({
      editOpen:true
    },function(){

      document.getElementById('focus').focus();
    document.getElementsByClassName('hetong')[0].style.display="none"

    })
  }
  onSave = ()=>{

    this.setState({
      editOpen:false,
      value1:document.getElementById('focus').value
    },function(){

        document.getElementsByClassName('hetong')[0].style.display="inline-block";


    })
  }
	componentDidMount(){

	}

	render(){
    let {input, label, type,requireLabel,disabled,placeholder,style,inline,simple,heightStyle,...other} = this.props;
    let className = '';


			return (
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} wrapStyle={style}>
          <span className="hetong">{this.state.value1}</span>
          {!this.state.editOpen && <span className="ui-label-text"><span className="edit" onTouchTap={this.onEdit}></span></span>}
					{this.state.editOpen && <input id="focus" onBlur={this.onSave} className={className} defaultValue={this.state.value1} />}

				</WrapComponent>

		);
	}
}
