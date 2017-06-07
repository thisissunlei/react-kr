import React from 'react';

import {
  ShallowEqual
} from 'kr/Utils';

import Checkbox from '../../Checkbox';

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

    this.setState({
      options
    }, function() {
      this.valuationInputValue();
    });

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

    var _this = this;

    return <Checkbox label = "全部"
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
      name
    } = this.props;

    var _this = this;

    children = options.map(function(item, index) {
      return <div key={index}>
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
      onChange
    } = this.props;

    options.map(function(item, index) {
      if (item.checked) {
        values.push(item.value);
      }
    });

    input.onChange && input.onChange(values.join(','));
    onChange && onChange(options, values.join(','));
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
    } = this.props;

    return (

      <WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} >
					<div className="ui-group-checkbox">
              <input type="hidden" name={input.name} value={input.value} />
              {/*{this.renderSelectAllSwitch()}*/}
              {this.renderOptions()}
					</div>
				</WrapComponent>
    );
  }

}
