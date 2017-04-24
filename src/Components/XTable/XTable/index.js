import React from 'react';

import {Http} from 'kr/Utils';

import Loading from '../../Loading';


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
    }

  }

  componentWillMount(){
    this.initialize();
  }


  onRowClick = (rowNumber)=>{
    const {checkedRows} = this.state;

    if(checkedRows.hasOwnProperty(rowNumber)){
          delete checkedRows[rowNumber]
    }else{
         checkedRows[rowNumber] = true;
    }
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

  onLoadData = ()=> {

		var { ajaxUrlName,ajaxParams,ajaxFieldListName} = this.props;
    ajaxParams = Object.assign({},ajaxParams);

    var _this = this;

    this.setState({isLoading:true});

		Http.request(ajaxUrlName, ajaxParams).then(function(response) {


      _this.setState({
        isLoading:false,
        response,
        listData:response[ajaxFieldListName]
      });

/*
			_this.onInitial({
				response: response,
				listData: response[_this.props.ajaxFieldListName],
				page: response.page,
				pageSize: response.pageSize,
				totalCount: response.totalCount,
				isLoaded: true,
				loading: false,
				allRowsSelected: false
			});
  */


		}).catch(function(err) {

		});

	}


  renderTable =  ()=>{

    return (
      <Table>
          <TableHeader> {this.renderHeader()} </TableHeader>
          <TableBody>{this.renderBody()}</TableBody>
      </Table>
    );

  }


  onCheckedAll = ()=>{
    var {checkedAll,checkedRows} = this.state;
    checkedAll = !checkedAll;

    if(!checkedAll){
      checkedRows = {};
    }
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
    var checked = !!(Object.keys(checkedRows).indexOf(rowNumber.toString()) != -1);
    if(checkedAll){
      checked = true;
    }
    return checked;
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

    render(){

      const {isLoading} = this.state;

      if(isLoading){
        //return <Loading/>
      }

      return (
        <div>
          {this.renderTable()}
        </div>
      );

    }

  }
