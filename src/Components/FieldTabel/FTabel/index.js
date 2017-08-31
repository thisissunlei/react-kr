import React from 'react';

// var	tableData = [];
import FContent from '../FContent';
import './index.less';
import {
  arrUpMove,
  arrDownMove,
  arrDelEle,
} from 'kr/Utils';

export default class Table extends React.Component {
  // isFold = {true} 是否有展开的按钮
	// initFoldNum = "1" 默认展示几个
	// checkbox ={true} 是否有 checkbox
  // checkbox = {true}
	// 			batchDel = {true}
  //toolbar = {true} 是否有工具条
  constructor(props) {
    super(props);
    this.state = {
      //表格的数据
      tableData:[],
      //表头的数据
      headers:[],
      foldLabel :"展开",
      fold:false,
      handerChecked:false,
      checkedArr:[],


    }
  }
  componentDidMount() {
    this.setHeaders();
  }
  setHeaders = () =>{
    var headers = [];
    const {children} = this.props;
    headers = children.map((item,index)=>{
        return item.props;
    })
    this.setState({
      headers
    })
  }
  //表单头多选事件
  handerCheck = (event,item,index) =>{
    let data = [].concat(this.props.data);
    item = Object.assign({},item);
    item.checked = event.target.checked;
    data[index] = item;
    var headers = [].concat(data);
    this.setState({
      headers,
    })
  }


  //table的多选按钮点击
  tableHanerCheck = (event) =>{
    this.dataFilter(-1,event.target.checked)
  }


  componentWillReceiveProps (nextProps) {

    this.setState({
      tableData:nextProps.input.value
    })

  }



  //每一行多选按钮被点击
  contentCheck = (num,checked) =>{

    this.dataFilter(num,checked);
  }




  //上移下移函数
  moveClick = (type) =>{
    var isMove = true;
    const {tableData,checkedArr} = this.state;
    var newData = [].concat(tableData);
    for(let i=0;i<checkedArr.length;i++){
      if(type == "down" && checkedArr[i] == newData.length-1){
        isMove = false;
        break;
      }
      if(type == "up" && checkedArr[i] == 0){
        isMove = false;
        break;
      }
    }
    if(!isMove || checkedArr.length==0){
      return;
    }
    // checkedArr = [].concat(checkedArr);
    var sortArr = [].concat(checkedArr);
    if(type == "up"){
       sortArr.sort(function(a,b){
          return a-b;
       })
    }else{
      sortArr.sort(function(a,b){
          return b-a;
      })
    }
    sortArr.map((item,index)=>{
        if(type == "down"){
          newData = arrDownMove(newData,item);

        }else{

          newData = arrUpMove(newData,item);
        }

    })

    this.setCheckedArr(newData);
    this.setState({
      tableData:newData,
    })
  }
  //批量删除
  batchdelete = () =>{
    var newData = [].concat(this.state.tableData);
    let {checkedArr} = this.state;
    if(!newData.length){
      return ;
    }
    var sortArr = [].concat(checkedArr)
    sortArr.sort(function(a,b){
      return b-a;
    })

    sortArr.map((item,index)=>{
      newData = arrDelEle(newData,item);
    })
     this.setCheckedArr(newData);
    this.setState({
      tableData:newData
    })
  }



  setCheckedArr = (tableData) =>{

     var checkedArr = [];
     tableData.map((item,index)=>{
        if(item.checked){
          checkedArr.push(index);
        }
     })

     this.setState({
        checkedArr,
     })
  }

  //数据处理
  dataFilter = (num,checked) =>{
    var {tableData}  = this.state;
    var checkedNum = 0;
    var handerChecked = false;
    var checkedArr = [];
    var newData = tableData.map((item,index)=>{
      if(num==-1){
        item.checked = checked;
        if(item.checked){
          checkedArr.push(index)
          checkedNum++;
        }
        return item;
      }else{
          if(index == num){
            item.checked = checked;
          }
          if(item.checked){
            checkedArr.push(index)
            checkedNum++;
          }
          return item;
      }
    })
    if(checkedNum == newData.length && newData.length){
      handerChecked = true;
    }else{
      handerChecked = false;
    }

    this.setState({
      handerChecked,
      checkedArr,
      tableData:newData
    })

  }


  //展开按钮被点击
  foldClick = () =>{
    const {foldLabel} = this.state;
    var text = "";
    var fold = false;
    if(foldLabel == "展开"){
      text = "收起";
      fold = true;
    }else{
      text = "展开"
      fold = false;
    }
    this.setState({
      fold,
      foldLabel:text
    })

  }
  //生成表单头
   headReander = () =>{
      const {headers,handerChecked,tableData} = this.state;
      const {checkbox} = this.props;

      if(!headers){
          return;
      }

      var doms = headers.map((item,index)=>{
        return(
            <th key = {index}>
                {item.checkbox && <input
                    key={index}
                    type="checkbox"
                    onChange={(event) =>{
                        this.handerCheck(event,item,index)
                    }}
                    checked = {item.checked ? "checked":""}
                />}
                {item.label}
            </th>
        )
      })
      return (
        <tr className="hander">
          {checkbox &&
            <th>
              {tableData.length && <input
                    type="checkbox"
                    onChange={(event) =>{
                        this.tableHanerCheck(event)
                    }}
                    checked = {handerChecked ? "checked":""}
              />}
              {!tableData.length && <input
                  type="checkbox"

              />}
            </th>
          }
          {doms}
        </tr>
      );
  }



  tbodyRender = () =>{
    const {tableData,headers,fold} = this.state;
    const {initFoldNum,checkbox} = this.props;
    var showData = [].concat(tableData);
    if(!fold){
      showData = tableData.slice(0,initFoldNum||5);
    }

    let doms = showData.map((item,index)=>{
       return <FContent
          key = {index}
          data = {item}
          detail = {headers}
          checkbox = {checkbox}
          onCheck = {this.contentCheck}
          index = {index}
        />
    })
    return doms;

  }

  render(){
    const {
      headers,
      tableData,
      foldLabel,
      fold
    } = this.state;
    const {
      checkbox,
      children,
      isFold,
      batchDel,
      toolbar
    } = this.props;
    var iconName = fold? "icon-up":"icon-down"

    return (
       <div className = "ui-field-tabel">
        {toolbar && <div className = "ui-field-tabel-toolbar">
            <div className="move">
                <span
                  className ="move-up"
                  onClick = {()=>{
                    this.moveClick("up");
                  }}
                >上移</span>
                <span
                  className = "move-down"
                  onClick = {()=>{
                    this.moveClick("down");
                  }}
                >下移</span>
            </div>
            {batchDel && <span onClick = {this.batchdelete}>批量删除</span>}
         </div>}
        <table>
           <thead>
            {this.headReander()}
           </thead>
           <tbody>
            {this.tbodyRender()}
           </tbody>
        </table>
        {isFold && <div className = "ui-field-tabel-fold">
            <span className="fold" onClick = {this.foldClick}>
              <span >
              {foldLabel}
              </span><span className={iconName}></span>
            </span>

          </div>}
      </div>
    )
  }
}
