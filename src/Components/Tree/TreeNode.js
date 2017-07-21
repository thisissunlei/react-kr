import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import classNames from 'classnames';
import Animate from 'rc-animate';
import { browser } from './util';
import toArray from 'rc-util/lib/Children/toArray';
import './assets/index.less'
var IconType = ["ROOT","DEPARTMENT","SUBCOMPANY"];
const browserUa = typeof window !== 'undefined' ? browser(window.navigator) : '';
const ieOrEdge = /.*(IE|Edge).+/.test(browserUa);
// const uaArray = browserUa.split(' ');
// const gtIE8 = uaArray.length !== 2 || uaArray[0].indexOf('IE') === -1 || Number(uaArray[1]) > 8;

const defaultTitle = '---';

class TreeNode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoading: false,
      dragNodeHighlight: false,
    };
  }

  componentDidMount() {
    if (!this.props.root._treeNodeInstances) {
      this.props.root._treeNodeInstances = [];
    }
    this.props.root._treeNodeInstances.push(this);
  }
  // shouldComponentUpdate(nextProps) {
  //   if (!nextProps.expanded) {
  //     return false;
  //   }
  //   return true;
  // }

  onCheck = () => {
    this.props.root.onCheck(this);
  }

  onSelect() {

    this.props.root.onSelect(this);
  }

  onMouseEnter = (e) => {
    e.preventDefault();
    this.props.root.onMouseEnter(e, this);
  }

  onMouseLeave = (e) => {
    e.preventDefault();
    this.props.root.onMouseLeave(e, this);
  }

  onContextMenu = (e) => {
    e.preventDefault();
    this.props.root.onContextMenu(e, this);
  }

  onDragStart = (e) => {
    // console.log('dragstart', this.props.eventKey, e);
    // e.preventDefault();
    e.stopPropagation();
    this.setState({
      dragNodeHighlight: true,
    });
    this.props.root.onDragStart(e, this);
    try {
      // ie throw error
      // firefox-need-it
      e.dataTransfer.setData('text/plain', '');
    } catch (error) {
      // empty
    }
  }

  onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.root.onDragEnter(e, this);
  }

  onDragOver = (e) => {
    // todo disabled
    e.preventDefault();
    e.stopPropagation();
    this.props.root.onDragOver(e, this);
    return false;
  }

  onDragLeave = (e) => {
    e.stopPropagation();
    this.props.root.onDragLeave(e, this);
  }

  onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      dragNodeHighlight: false,
    });
    this.props.root.onDrop(e, this);
  }

  onDragEnd = (e) => {
    e.stopPropagation();
    this.setState({
      dragNodeHighlight: false,
    });
    this.props.root.onDragEnd(e, this);
  }
  /*====展开函数=====*/
  onExpand = () => {
    const callbackPromise = this.props.root.onExpand(this);
    if (callbackPromise && typeof callbackPromise === 'object') {
      const setLoading = (dataLoading) => {
        this.setState({ dataLoading });
      };
      setLoading(true);
      callbackPromise.then(() => {
        setLoading(false);
      }, () => {
        setLoading(false);
      });
    }
  }

  // keyboard event support
  onKeyDown(e) {
    e.preventDefault();
  }

  renderSwitcher(props, expandedState) {
    const prefixCls = props.prefixCls;
    const switcherCls = {
      [`${prefixCls}-switcher`]: true,
    };
    if (!props.showLine) {
      switcherCls[`${prefixCls}-noline_${expandedState}`] = true;
    } else if (props.pos === '0-0') {
      switcherCls[`${prefixCls}-roots_${expandedState}`] = true;
    } else {
      switcherCls[`${prefixCls}-center_${expandedState}`] = !props.last;
      switcherCls[`${prefixCls}-bottom_${expandedState}`] = props.last;
    }
    if (props.disabled) {
      switcherCls[`${prefixCls}-switcher-disabled`] = true;
      return <span className={classNames(switcherCls)}></span>;
    }
    if(!props.itemData.children.length ){
      switcherCls[`${prefixCls}-noline_docu_${expandedState}`] = true;
    }
    /*=========展开的尖括号=========*/
    return <span className={classNames(switcherCls)} onClick={this.onExpand}></span>;
  }

  renderCheckbox(props) {
    const prefixCls = props.prefixCls;
    const checkboxCls = {
      [`${prefixCls}-checkbox`]: true,
    };
    if (props.checked) {
      checkboxCls[`${prefixCls}-checkbox-checked`] = true;
    } else if (props.halfChecked) {
      checkboxCls[`${prefixCls}-checkbox-indeterminate`] = true;
    }
    let customEle = null;
    if (typeof props.checkable !== 'boolean') {
      customEle = props.checkable;
    }
    if (props.disabled || props.disableCheckbox) {
      checkboxCls[`${prefixCls}-checkbox-disabled`] = true;
      return <span ref="checkbox" className={classNames(checkboxCls)}>{customEle}</span>;
    }
    return (
      <span ref="checkbox"
        className={classNames(checkboxCls) }
        onClick={this.onCheck}
      >{customEle}</span>);
  }

  renderChildren(props) {
    const renderFirst = this.renderFirst;
    this.renderFirst = 1;
    let transitionAppear = true;
    if (!renderFirst && props.expanded) {
      transitionAppear = false;
    }
    const children = props.children ? toArray(props.children) : props.children;
    let newChildren = children;
    if (children &&
      (Array.isArray(children) &&
        children.every((item) => item.type && item.type.isTreeNode) ||
        (children.type && children.type.isTreeNode))) {
      const cls = {
        [`${props.prefixCls}-child-tree`]: true,
        [`${props.prefixCls}-child-tree-open`]: props.expanded,
      };
      if (props.showLine) {
        cls[`${props.prefixCls}-line`] = !props.last;
      }
      const animProps = {};
      if (props.openTransitionName) {
        animProps.transitionName = props.openTransitionName;
      } else if (typeof props.openAnimation === 'object') {
        animProps.animation = assign({}, props.openAnimation);
        if (!transitionAppear) {
          delete animProps.animation.appear;
        }
      }

      return (
        <span>
           {!props.expanded ? null : <ul className={classNames(cls)} data-expanded={props.expanded}>
            {React.Children.map(children, (item, index) => {
              return props.root.renderTreeNode(item, index, props.pos);
            }, props.root)}
          </ul>}
        </span>
      );
      newChildren = (
        <Animate {...animProps}
          showProp="data-expanded"
          transitionAppear={transitionAppear}
          component=""
        >

        </Animate>
      );


    }
    return newChildren;
  }
  iconJudge = (prefixCls,iconState,props) =>{
    var props = this.props;
    if(!props.type){
      return `${prefixCls}-icon__${iconState}`
    }else if(props.type){
      var allTypes = props.type.split("-");
      
      var typeText = "";
      // console.log(props.itemData.treeType,IconType[0])
      if(allTypes[0]=="department"){
          for(let i=0;i<IconType.length;i++){
            if(props.itemData.treeType == IconType[i]){
              // console.log()
                typeText = IconType[i]+"_"+iconState;
                break;
            }
          }
      }else{
        typeText =iconState;
      }

      if(allTypes[0] == "role"){
        
      }
      
      if(allTypes[0] == "personnel"){

      }
     
      return `${prefixCls}-icon__${typeText}` 
    }
  }
  render() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const expandedState = props.expanded ? 'open' : 'close';
    let iconState = expandedState;

    let canRenderSwitcher = true;
    const content = props.title;
    let newChildren = this.renderChildren(props);
    if (!newChildren || newChildren === props.children) {
      // content = newChildren;
      newChildren = null;
      if (!props.loadData || props.isLeaf) {
        canRenderSwitcher = false;
        iconState = 'docu';
      }
    }
    // For performance, does't render children into dom when `!props.expanded` (move to Animate)
    // if (!props.expanded) {
    //   newChildren = null;
    // }
    
    var iconTypeName = this.iconJudge(prefixCls,iconState,props);
    const iconEleCls = {
      [`${prefixCls}-iconEle`]: true,
      [`${prefixCls}-icon_loading`]: this.state.dataLoading,
      // [`${prefixCls}-icon__${iconState}`]: true,
      [iconTypeName]:true,
    };

    const selectHandle = () => {
      var showIcon = !props.itemData.children.length?"none":"inline-block";
      /*==========icon修改的位置(this.props.itemData)获取位置的数据===========*/
      const icon = (props.showIcon || props.loadData && this.state.dataLoading) ?
        <span
          className={classNames(iconEleCls)}
          onClick = {(e)=>{
            e.preventDefault();
              if(props.type == "allSelect"){
                return ;
              }
              this.onExpand();
          }}
          style = {{display:showIcon}}

        ></span> : null;
      const title = <span
                      className={`${prefixCls}-title`}
                      onClick = {(e)=>{
                        e.preventDefault();
                        if(props.type == "allSelect"){
                          return ;
                        }
                        
                        this.onExpand();
                      }}
                    >
                        {content}
                    </span>;
      const wrap = `${prefixCls}-node-content-wrapper`;
      const domProps = {
        className: `${wrap} ${wrap}-${iconState === expandedState ? iconState : 'normal'}`,
      };
      //disabled 是否禁止
      if (!props.disabled) {
        /*=========父节点是否可选择的判断=========*/
        if (props.selected || !props._dropTrigger && this.state.dragNodeHighlight)
        {
          domProps.className += ` ${prefixCls}-node-selected`;
        }
        if(props.expanded && props.itemData.children.length!=0){
          domProps.className += ` ${prefixCls}-node-selected`;

        }

        domProps.onClick = (e) => {
          e.preventDefault();
          if (props.selectable) {
            this.onSelect();
          }
          // not fire check event
          // if (props.checkable) {
          //   this.onCheck();
          // }
        };
        if (props.onRightClick) {
          domProps.onContextMenu = this.onContextMenu;
        }
        if (props.onMouseEnter) {
          domProps.onMouseEnter = this.onMouseEnter;
        }
        if (props.onMouseLeave) {
          domProps.onMouseLeave = this.onMouseLeave;
        }
        if (props.draggable) {
          domProps.className += ' draggable';
          if (ieOrEdge) {
            // ie bug!
            domProps.href = '#';
          }
          domProps.draggable = true;
          domProps['aria-grabbed'] = true;
          domProps.onDragStart = this.onDragStart;
        }
      }
      return (
        <span ref="selectHandle" title={typeof content === 'string' ? content : ''} {...domProps}>
          {icon}{title}
        </span>
      );
    };

    const liProps = {};
    if (props.draggable) {
      liProps.onDragEnter = this.onDragEnter;
      liProps.onDragOver = this.onDragOver;
      liProps.onDragLeave = this.onDragLeave;
      liProps.onDrop = this.onDrop;
      liProps.onDragEnd = this.onDragEnd;
    }

    let disabledCls = '';
    let dragOverCls = '';
    if (props.disabled) {
      disabledCls = `${prefixCls}-treenode-disabled`;
    } else if (props.dragOver) {
      dragOverCls = 'drag-over';
    } else if (props.dragOverGapTop) {
      dragOverCls = 'drag-over-gap-top';
    } else if (props.dragOverGapBottom) {
      dragOverCls = 'drag-over-gap-bottom';
    }

    const filterCls = props.filterTreeNode(this) ? 'filter-node' : '';

    const noopSwitcher = () => {
      const cls = {
        [`${prefixCls}-switcher`]: true,
        [`${prefixCls}-switcher-noop`]: true,
      };
      if (props.showLine) {
        cls[`${prefixCls}-center_docu`] = !props.last;
        cls[`${prefixCls}-bottom_docu`] = props.last;
      } else {
        cls[`${prefixCls}-noline_docu_close`] = true;
      }
      if(props.selected){
        cls[`${prefixCls}-noline_docu_close`] = false;
        cls[`${prefixCls}-noline_docu_open`] = true;
      }else{
        cls[`${prefixCls}-noline_docu_open`] = false;
        cls[`${prefixCls}-noline_docu_close`] = true;
      }

      return <span className={classNames(cls)}></span>;
    };

    return (
      <li {...liProps} ref="li"
        className={classNames(props.className, disabledCls, dragOverCls, filterCls) }
      >
        {canRenderSwitcher ? this.renderSwitcher(props, expandedState) : noopSwitcher()}
        {props.checkable ? this.renderCheckbox(props) : null}
        {selectHandle()}
        {newChildren}
      </li>
    );
  }
}

TreeNode.isTreeNode = 1;

TreeNode.propTypes = {
  prefixCls: PropTypes.string,
  disabled: PropTypes.bool,
  disableCheckbox: PropTypes.bool,
  expanded: PropTypes.bool,
  isLeaf: PropTypes.bool,
  root: PropTypes.object,
  onSelect: PropTypes.func,
};

TreeNode.defaultProps = {
  title: defaultTitle,
};

export default TreeNode;
