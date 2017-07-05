import React from 'react';

import {
  ShallowEqual
} from 'kr/Utils';

import Checkbox from '../../Checkbox';
import './index.less'
import WrapComponent from '../WrapComponent';

export default class GroupCheckboxComponent extends React.Component {

  static displayName = 'GroupCheckboxComponent';

  static propTypes = {
    inline: React.PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      options: [],
      checkedAll: false,
    }
    this.isInit = false;
  }

  componentDidMount() {
    this.setInit(this.props.defaultValue);
  }

  componentWillReceiveProps(nextProps) {

    if (!ShallowEqual(this.props.defaultValue, nextProps.defaultValue)) {
        this.setInit(nextProps.defaultValue);
    }
  }

  setInit = (defaultValue)=>{

      if(!defaultValue.length){
        return ;
      }

      if(this.isInit){
        return ;
      }

      this.setState({
        options: [].concat(defaultValue)
      }, function() {
        this.valuationInputValue()
      });

      this.isInit = true;
  }

  onChange = (checked, index) => {

    let {
      options
    } = this.state;

    options[index].checked = checked;
    let checkedAll = options.length == this.checkedLength(options);

    this.setState({
      options,
      checkedAll
    }, function() {
      this.valuationInputValue();
    });

  }
  checkedLength = (data) =>{
    var sum = 0;
    data = data || [];
    data.map(function(item,index){
      if(item.checked){
        sum++;
      }
    })
    return sum;
  }

  onSelectAll = (checkedAll) => {

    let {
      options
    } = this.state;

    options.forEach(function(item, index) {
      item.checked = checkedAll;
    });

    this.setState({
      options,
      checkedAll
    }, function() {
      this.valuationInputValue();
    });
  }

  renderSelectAllSwitch = () => {
    const {checkAllData} = this.props;
    var _this = this;
    var label  = checkAllData.label ? checkAllData.label : '全部';

    return <Checkbox label = {label}
    value = "all"
    checked = {
      this.state.checkedAll
    }
    onCheck = {
      (checked) => {
        _this.onSelectAll(checked);
      }
    }
    />
  }

  renderOptions = () => {


    let children = [];
    let {
      options
    } = this.state;
    let {
      name,
      childrenInline
    } = this.props;
    let inline = childrenInline ? 'inline-block' : 'block';
    let className = childrenInline ? 'inline-children-style':'';
    var _this = this;

    children = options.map(function(item, index) {
      return <div className = {className} key={index} style = {{display:inline}}>
         <Checkbox  label={item.label} value={item.value} checked={item.checked} onCheck={(checked)=>{
            _this.onChange(checked,index);
          }}/>
          {item.checked && item.component && item.component()}
        </div>
    })

    return children;
  }

  valuationInputValue = () => {

    let {
      options
    } = this.state;
    let values = [];
    let {
      input,
      onChange,
      checkAllData
    } = this.props;
    checkAllData = checkAllData || {};

    options.map(function(item, index) {
      if (item.checked) {
        values.push(item.value);
      }
    });
    input.onChange && input.onChange(values.join(','));
    onChange && onChange(options, values.join(','),checkAllData);
  }

  render() {

    let {
      input,
      label,
      type,
      meta: {
        touched,
        error
      },
      requireLabel,
      disabled,
      placeholder,
      style,
      inline,
      isCheckAll,
      indent
    } = this.props;
    var indentStyle = {}
    if(indent){
      indentStyle = {
        marginLeft:20
      }
    }
    return (

      <WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} >
					<div className="ui-group-checkbox">
              <input type="hidden" name={input.name} value={input.value} />
              {isCheckAll && this.renderSelectAllSwitch()}
              <div style = {indentStyle}>
                {this.renderOptions()}
              </div>
					</div>
				</WrapComponent>
    );
  }

}
