import React from 'react';

import {Http} from 'kr/Utils';

import Loading from '../../Loading';
import Button from '../../Button';
import Pagination from '../../Pagination';
import Notify from '../../Notify';
import ListGroup from '../../ListGroup/ListGroup';
import ListGroupItem from '../../ListGroup/ListGroupItem';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

import DateFormat from 'kr/Utils/DateFormat';



import './index.less';

const Table = ({...props})=>{
    return <table className="ui-table" {...props}></table>
}

const TableHeader = ({children})=>{
    return <thead>{children}</thead>
}

const TableHeaderColumn = ({...props})=>{

  var style = props.style || {};

  if(props.width){
    style.width = props.width;
  }
  props.style = Object.assign({},style);
  return <th {...props} ></th>
}

const TableBody = ({children})=>{
  return <tbody>{children}</tbody>
}

const TableColumn = ({...props})=>{
    var tooltip = props.tooltip || undefined;
    if(tooltip){
      return <td {...props}><Tooltip placement="top" overlay={tooltip}><span>{props.children}</span></Tooltip></td>
    }
    return <td {...props}></td>
}

const TableRow = ({...props}) =>{
  return <tr {...props}></tr>
}

const TableCheckBox = ({...props})=>{
  return <input type="checkbox" {...props}/>
}

const TableFooter = ({...props}) => {
    return <tfoot {...props}></tfoot>
}


export default class XTable extends React.Component {

  static defaultProps = {
        page:1,
        pageSize:20,
        pageOpen:true,
        exportOpen:true,
        ajaxParams:{},
        ajaxFieldListName:'items',
  }

  static propTypes = {

    params:React.PropTypes.object,
    onExport:React.PropTypes.func,
    onLoading:React.PropTypes.func,
    onLoaded:React.PropTypes.func,

  }

  constructor(props,context){
    super(props,context);

    this.options = [];

    this.state = {
      isLoading:false,
      response:{},
      listData:[],
      checkedAll:false,
      checkedRows:{},
      rows:[{checked:false,rowNumber:0},{}],
    }

  }

  componentWillMount(){
    this.initialize();
  }


  onRowClick = (rowNumber)=>{
    const {checkedRows} = this.state;
     checkedRows[rowNumber] = Number(!!!checkedRows[rowNumber]);
    this.setState({checkedRows});

  }

  initialize = ()=>{

    var options = [];
    const {children} = this.props;
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      const { displayName } = child.type;
      if (displayName === 'XTableRow') {
        options.push(child);
      }
    });

    this.options = options;
    this.onLoadData();
  }

  onLoadData = (page)=> {

		var { ajaxUrlName,ajaxParams,ajaxFieldListName} = this.props;
    ajaxParams = Object.assign({},ajaxParams);

    if(page){
      ajaxParams.page = page;
    }

    var _this = this;

    this.setState({isLoading:true});

		Http.request(ajaxUrlName, ajaxParams).then(function(response) {


      var listData = response[ajaxFieldListName];
      var checkedRows = new Array(listData.length).join(0).split('');

      _this.setState({
        isLoading:false,
        response,
        listData,
        checkedRows,
				page: response.page,
				pageSize: response.pageSize,
				totalCount: response.totalCount,
      });
		}).catch(function(err) {
      Notify.error(err.message);
      _this.setState({
        isLoading:false
      });
		});

	}

  onExport = ()=>{
    const {onExport} = this.props;
    const {checkedRows,listData} = this.state;

    var exportData = [];

    checkedRows.forEach(function(item){
        if(item == 1){
          exportData.push(listData[item]);
        }
    });
    onExport && onExport(exportDatas);
  }

  renderTable =  ()=>{
    return (
      <div className="ui-table-wrap">
      <Table>
          <TableHeader>{this.renderHeader()}</TableHeader>
          <TableBody>{this.renderBody()}</TableBody>
      </Table>

      <div className="table-tools">
        <ListGroup>
          <ListGroupItem style={{float:'left'}}>
            <Button label="导出" onClick={this.onExport}/>
          </ListGroupItem>
          <ListGroupItem style={{float:'right'}}>
            {this.renderPagination()}
          </ListGroupItem>
        </ListGroup>
      </div>
      </div>
    );

  }

  onCheckedAll = ()=>{
    var {checkedAll,checkedRows} = this.state;
    checkedAll = !checkedAll;
    checkedRows = new Array(checkedRows.length+1).join(Number(checkedAll)).split('');
    this.setState({checkedAll,checkedRows});
  }

  renderHeader = ()=>{
    const options = this.options;
    var thRows = [];
    var _this = this;

    const checkboxProps = {
      onChange:this.onCheckedAll,
      checked:this.state.checkedAll
    }

    options.map(function(child,key){
      const {label,name,type} = child.props;
      let headerColumnProps = Object.assign({},child.props,{key});
      if(type === 'checkbox'){
          thRows.push(<TableHeaderColumn {...headerColumnProps}><TableCheckBox {...checkboxProps} /></TableHeaderColumn>);
      }else{
        thRows.push(<TableHeaderColumn {...headerColumnProps}>{label}</TableHeaderColumn>);
      }
    });

    return <TableRow>{thRows}</TableRow>
  }


  getRowChecked = (rowNumber)=>{
    const {checkedAll,checkedRows} = this.state;
    return !!Number(checkedRows[rowNumber]);
  }

  createTableColumn = (child,itemData,key,rowNumber)=>{

    var {name,component,type,format,tooltip,defaultValue} = child.props;

    var props = { itemData, key};

    const checkboxProps = {
      checked:this.getRowChecked(rowNumber)
    };

    if(name && itemData.hasOwnProperty(name)){
      props.children = itemData[name] || defaultValue;
    }

    if(typeof type ==='string' && type === 'checkbox'){
      props.children = <TableCheckBox {...checkboxProps}/>;
    }

// todo:date format
    if(typeof type === 'string' && type === 'date'){
        if(!props.children){
          props.children = defaultValue || '无';
        }else{
          props.children = DateFormat(props.children,format);
        }
    }

//todo:tooltip
    if(tooltip && typeof tooltip === 'string'){
      props.tooltip = tooltip;
    }else if(tooltip && typeof tooltip === 'function'){
      props.tooltip = tooltios(itemData);
    }

    if(component && typeof component === 'function'){
      props.children = component(itemData);
    }

    return <TableColumn {...props}></TableColumn>

  }

  onPageChange = (page)=>{
    this.onLoadData(page);
  }

  renderPagination = ()=>{
    const {page,pageSize,totalCount} = this.state;
    return <Pagination page={page} pageSize={pageSize} totalCount={totalCount} onPageChange={this.onPageChange}/>
  }

  renderBody = ()=>{

    const {listData} = this.state;
    const options = this.options;

    var bodyRows = [];
    var columns = [];
    var _this = this;

    return listData.map(function(itemData,rowKey){
      columns = [];
      options.map(function(child,columnKey){
        columns.push(_this.createTableColumn(child,itemData,columnKey,rowKey));
      });
      return <TableRow key={rowKey} onClick={_this.onRowClick.bind(_this,rowKey)}>{columns}</TableRow>;
      });

    }

    renderLoading = ()=>{

      return <div className="ui-table-wrap">
      <Table><TableHeader>{this.renderHeader()}</TableHeader></Table>
                <div className="not-table-data"><Loading/></div>
              </div>
    }

    render(){

      const {isLoading} = this.state;

      if(isLoading){
        return this.renderLoading();
      }

      return (
        <div>
          {this.renderTable()}
        </div>
      );

    }

  }
