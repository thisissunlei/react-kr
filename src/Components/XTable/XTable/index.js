import React from 'react';

import {Http} from 'kr/Utils';

import Loading from '../../Loading';
import Pagination from '../../Pagination';
import Notify from '../../Notify';


const Table = ({children})=>{
    return <table className="ui-table">{children}</table>
}

const TableHeader = ({children})=>{
    return <thead>{children}</thead>
}

const TableHeaderColumn = ({...props})=>{
  return <th {...props} />
}

const TableBody = ({children})=>{
  return <tbody>{children}</tbody>
}

const TableColumn = ({...props})=>{
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

  renderTable =  ()=>{
    return (
      <Table>
          <TableHeader> {this.renderHeader()} </TableHeader>
          <TableBody>{this.renderBody()}</TableBody>
          <TableFooter>{this.renderTableFooter()}</TableFooter>
      </Table>
    );

  }

  renderTableFooter = ()=>{

    return <TableRow>
      <TableColumn></TableColumn>
      <TableColumn>{this.renderPagination()}</TableColumn>
    </TableRow>

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
      if(type === 'checkbox'){
          thRows.push(<TableHeaderColumn key={key}><TableCheckBox {...checkboxProps} /></TableHeaderColumn>);
      }else{
        thRows.push(<TableHeaderColumn key={key} name={name}>{label}</TableHeaderColumn>);
      }
    });

    return <TableRow> {thRows}</TableRow>
  }


  getRowChecked = (rowNumber)=>{
    const {checkedAll,checkedRows} = this.state;
    return !!Number(checkedRows[rowNumber]);
  }

  createTableColumn = (child,itemData,key,rowNumber)=>{

    var {name,component,type} = child.props;

    var props = { itemData, key};

    const checkboxProps = {
      checked:this.getRowChecked(rowNumber)
    };

    if(name && itemData.hasOwnProperty(name)){
      props.children = itemData[name];
    }

    if(typeof type ==='string' && type === 'checkbox'){
      props.children = <TableCheckBox {...checkboxProps}/>;
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

      return <Loading />;

      return <Table>
                <TableHeader>{this.renderHeader()}</TableHeader>
                <TableBody> <TableRow><TableColumn><Loading/></TableColumn></TableRow></TableBody>
              </Table>
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
