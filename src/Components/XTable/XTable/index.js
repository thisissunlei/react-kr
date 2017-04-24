import React from 'react';

import {Http} from 'kr/Utils';



const Table = ({children})=>{
    return <table>{children}</table>
}

const TableHeader = ({children})=>{
    return <thead>{children}</thead>
}
const TableBody = ({children})=>{
  return <tbody>{children}</tbody>
}
const TableColumn = ({children,value,component,itemData})=>{

    if(component && typeof component === 'function'){
        return <td>{component(itemData)}</td>
    }
    return <td>{value}</td>
}
const TableRow = ({children}) =>{
  return <tr>{children}</tr>
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
      response:{},
      listData:[],
    }
  }

  componentWillMount(){
    this.initialize();
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
		Http.request(ajaxUrlName, ajaxParams).then(function(response) {
      _this.setState({
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

  renderHeader = ()=>{
    const options = this.options;
    var thRows = [];
    options.map(function(child,key){
      const {label,name} = child.props;
      thRows.push(React.createElement('th',{key,name},label));
    });
    return React.createElement('tr',{},thRows);
  }

  renderBody = ()=>{
    const {listData} = this.state;
    const options = this.options;

    var bodyRows = [];
    var columns = [];

    listData.forEach(function(itemData,rowKey){
        columns = [];
        options.forEach(function(child,columnKey){
            var value = '';
            var {name,component} = child.props;
            var columnProps = {
                itemData,
                value:'',
                key:columnKey,
            };
            if(itemData.hasOwnProperty(name)){
                columnProps.value = itemData[name];
            }
            if(component && typeof component ==='function'){
              columnProps.component = component;
            }
            columns.push(<TableColumn {...columnProps} ></TableColumn>);
        });
        bodyRows.push(<TableRow key={rowKey}>{columns}</TableRow>);
    });
    return bodyRows;
  }

  render(){

    return (
      <div>
          {this.renderTable()}
      </div>
    );

  }

}
