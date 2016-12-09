import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';

import Tooltip from '../../Tooltip';
import './index.less';

export default class InputComponent extends React.Component{

	static defaultProps = {


	}

	static PropTypes = {

		defaultValue: React.PropTypes.string,
		ajaxUrlName: React.PropTypes.string,
		ajaxParams: React.PropTypes.object,
					// save:React.PropTypes.func,

	}
// static PropTypes = {
// 	defaultValue:
// }
	constructor(props,context){
		super(props,context)
    this.state ={
      editOpen:false,
      oldtext:props.oldText
    }
	}
  onEdit = ()=>{

    console.log(this.state.editOpen)
    this.setState({
      editOpen:true
    },function(){

      document.getElementById('focus').focus();
    document.getElementsByClassName('contract')[0].style.display="none"

    })
  }
  onSave = ()=>{
		var _this=this;
    this.setState({
      editOpen:false,
      oldtext:document.getElementById('focus').value
    },function(){

        document.getElementsByClassName('contract')[0].style.display="inline-block";

				_this.props.save(_this.state.oldtext);
    })
  }
	componentDidMount(){

	}

	render(){
    let {input, label, type,requireLabel,disabled,placeholder,style,inline,simple,heightStyle,...other} = this.props;
    let className = '';


			return (
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} wrapStyle={style}>
					<Tooltip  style={{visibility:'visible'}} offsetTop={10} place='top'>{this.state.oldtext}</Tooltip>
          <span className="contract">{this.state.oldtext}</span>
          {!this.state.editOpen && <span className="ui-label-text"><span className="edit" onTouchTap={this.onEdit}></span></span>}
					{this.state.editOpen && <input id="focus" onBlur={this.onSave} className={className} defaultValue={this.state.oldtext} />}

				</WrapComponent>

		);
	}
}
