import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';

import './index.less';
import ReactTooltip from 'react-tooltip'

export default class EditComponent extends React.Component {

	static defaultProps = {

		tooltip: '',
	}

	static PropTypes = {
		tooltip: React.PropTypes.string,
		defaultValue: React.PropTypes.string,
		ajaxUrlName: React.PropTypes.string,
		ajaxParams: React.PropTypes.object,


	}

	constructor(props, context) {
		super(props, context)
		this.state = {
			editOpen: false,
			oldtext: props.oldText
		}
	}
	onEdit = () => {
		let {
			oldtext
		} = this.state;

		this.setState({
			editOpen: true
		}, function() {

			this.editInput.focus();
			

		})
	}
	onSave = (event) => {
		var _this = this;
		let {input} = this.props;
		input.onChange(event.target.value||'');
		this.setState({
			editOpen: false,
		})
	}
	componentDidMount() {
		this.editInput.setAttribute('autocomplete','of')
	}
	render() {
		let {
			input,
			label,
			type,
			requireLabel,
			disabled,
			placeholder,
			style,
			inline,
			alignRight,
			simple,
			heightStyle,
			tooltip,
			editType,
			...other
		} = this.props;
		let className = '';
		const {editOpen} = this.state;
		var icon = !editOpen ? "edit-init" : "edit-active";
		var textAni = editOpen ? ("left-to-right-show "+className) : ("right-to-left-close "+className)
		

		return (
			<WrapComponent  label={label} requireLabel={requireLabel} inline={inline} wrapStyle={style||{}} alignRight={alignRight}>
							
				<div className = "tabel-edit">
                   
                    <div className = "box">
                       
						 <input 
								{...input}
								ref = {(ref)=>{
									this.editInput = ref;
								}}
								onBlur={this.onSave}
								onFocus = {this.onEdit}
								
								defaultValue={this.state.oldtext}  
						/>
						<span 
							className = "line"
							
							style = {{width:editOpen?"100%":"0"}}
						>	
						</span>
                        <span 
                            className={`edit ${icon}`} 
                            
                        ></span>
                    </div>
                    
                   
                    
                </div>

			</WrapComponent>

		);
	}
}
