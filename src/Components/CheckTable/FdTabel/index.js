import React from 'react';

// var	tableData = [];
import FdContent from '../FdContent';
import './index.less';
import Nothing from '../../Nothing';
import Toolbar from '../../Toolbar';
import DeleForm from './DeleForm';
import Dialog from '../../Dialog';
import Message from '../../Message';
import {
  arrUpMove,
  arrDownMove,
  arrDelEle,
} from 'kr/Utils';

export default class Table extends React.Component {


  static defaultProps = {
    batchDel:false,
    checkbox:false,
    toolbar:false,
    isFold:false
	}

	static propTypes = {
		/**
		 * isFold 选中时值为true
		 */
		isFold: React.PropTypes.bool,
		/**
		 * 默认展示几个
		 */
		initFoldNum: React.PropTypes.string,
		/**
		 * 是否有工具条
		 */
		toolbar: React.PropTypes.bool,
		/**
		 *是否有删除按钮
		 */
    batchDel: React.PropTypes.bool,
    /**
		 *是否显示复选框
		 */
    checkbox:React.PropTypes.bool,
    
  };
  
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
      //批量删除
      openDelForm:false,

    }
  }
  componentDidMount() {
    this.setHeaders();
    this.toolbarRender();
  }
  setHeaders = () =>{
    var _this=this;
    var headers = [];
    const {children} = this.props;
    children.map((item,index)=>{
        if(item.type.displayName === "FRow"){
          headers.push(item.props);
        }
        
    })
    this.setState({
      headers
    })
  }

  
  //表单头多选事件
  handerCheck = (event,item,index) =>{
    var {headers,tableData}  = this.state;
    headers=[].concat(headers);
    tableData=[].concat(tableData);
    item = Object.assign({},item);
    item.checked = event.target.checked;
    headers[index]= item;
    if(headers[index].checked){
      tableData.map((list,j)=>{
        list[headers[index].name]=true;
      })
    }else if(!headers[index].checked&&headers[index].checkbox){
      tableData.map((list,j)=>{
        list[headers[index].name]=false;
      })
    }
    this.setState({
      headers,
      tableData
    })
  }
  
  //批量删除
  deleForm=()=>{
    this.setState({
      openDelForm:!this.state.openDelForm
    })
  }
 


  //table的多选按钮点击
  tableHanerCheck = (event) =>{
    this.dataFilter(-1,event.target.checked)
  }


  componentWillReceiveProps (nextProps) {
    if(Array.prototype.isPrototypeOf(nextProps.input.value)){
      var tableData = nextProps.input.value;
      this.setState({
        tableData,
      })
    }
  }



  //每一行多选按钮被点击
  contentCheck = (num,checked) =>{
    this.dataFilter(num,checked);
  }
  
  //单个点击
  singleCheck=(event,item,index)=>{
     let {tableData,headers}=this.state;
     var num=0;
     headers=[].concat(headers);
     tableData=[].concat(tableData);
     tableData[index][item.name]=event.target.checked;
      tableData.map((items,indexs)=>{
        if(items[item.name]){
          num++
        }
      })
     
     var header=[];
     if(tableData.length&&num==tableData.length){
        headers.map((list,i)=>{
          list = Object.assign({},list);
          if(item.name==list.name){
            list.checked=true;
          }
          header.push(list);
        })
     }else{
        headers.map((list,i)=>{
          list = Object.assign({},list);
          if(item.name==list.name){
            list.checked=false;
          }
          header.push(list);
        })
     }
     this.setState({
        headers:header,
        tableData,
     })
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
    
    const {moveClick}=this.props;
    moveClick && moveClick(newData);


  }
  //批量删除
  batchdelete = () =>{
    var newData = [].concat(this.state.tableData);
    let {checkedArr} = this.state;
    var deleteData = [];
    if(!newData.length){
      this.setState({
        openDelForm:false
      })
      Message.error('请选择至少一个字段');
      return ;
    }

    
    var sortArr = [].concat(checkedArr)
    sortArr.sort(function(a,b){
      return b-a;
    })

    sortArr.map((item,index)=>{
      newData = arrDelEle(newData,item);
      deleteData.push(this.state.tableData[item])
    })
    
    const {batchdelete}=this.props;
    batchdelete && batchdelete(deleteData);
    this.deleForm();

    this.setCheckedArr(newData);
    this.setState({
      tableData:newData
    })
  }
  //生成工具条
  toolbarRender = () =>{
    let {children} = this.props;
    var doms = children.map((item,index)=>{
      if(item.type.displayName === "Toolbars"){
        let {children} = item.props;
       
        return children;
      
      }
    })
    return doms;
  }
 
  
  //设置勾选的数据  
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
    text = foldLabel == "展开" ? "收起" : "展开";
    fold = foldLabel == "展开" ? true : false;
    
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

        //是否生成多选框
        return(
            <th key = {index}>
                {item.checkbox && <input
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
          {/*
          在有数据时要显示功能
          */}
          {checkbox &&
            <th>
              {!!tableData.length && <input
                    
                    type="checkbox"
                    onChange={(event) =>{
                        this.tableHanerCheck(event)
                    }}
                    checked = {handerChecked ? "checked":""}
              />}
            {/*
              在有数据时要显示功能
            */}
              {!tableData.length && <input type="checkbox" />}
            </th>
          }
          {doms}
        </tr>
      );
  }


  tbodyRender = () =>{
    const {tableData,headers,fold} = this.state;
    const {initFoldNum,checkbox,isSingle} = this.props;
    var showData = [].concat(tableData);
     
    if(!fold){
      showData = tableData.slice(0,initFoldNum||5);
    }
   
    let doms = showData.map((item,index)=>{
       return <FdContent
          key = {index}
          data = {item}
          detail = {headers}
          checkbox = {checkbox}
          rowCheck = {this.contentCheck}
          onCheck={this.singleCheck}
          index = {index}
          isSingle={isSingle}
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
      toolbar,
      initFoldNum
    } = this.props;
    var iconName = fold? "icon-up":"icon-down";
    var nothing = tableData.length ? true : false;
    var downFoldNum = tableData.length < initFoldNum ? false : true;

    return (
       <div className = "ui-field-tabel">
        {toolbar && <div className = "ui-field-tabel-toolbar">
           {this.toolbarRender()}
           {batchDel &&
             <div className='ui-dele-all' onClick = {this.deleForm}>
               <span className='ui-del-pic'></span>
               <span style={{marginTop:-12,display:'inline-block',verticalAlign:'middle'}}>批量删除字段</span>
             </div>
            }
            <div className="move">
               <div className='ui-move-up' style={{marginRight:'4px'}}>
                  <span
                    className ="move-up ui-move-pic"
                    onClick = {()=>{
                      this.moveClick("up");
                    }}
                  ></span>
              </div>
              <div className='ui-move-up'>
                <span
                  className = "move-down ui-down-pic"
                  onClick = {()=>{
                    this.moveClick("down");
                  }}
                ></span>
             </div>
            </div>
         </div>}
        <table>
           <thead>
            {this.headReander()}
           </thead>
           <tbody>
            {this.tbodyRender()}
           </tbody>
        </table>
          {!nothing && <Nothing style={{textAlign:"center"}} iconStyle = {{height:150,marginLeft:-20}} fontSize="14px"/>}
        {isFold && downFoldNum && <div className = "ui-field-tabel-fold">
            <span className="fold" onClick = {this.foldClick}>
              <span >
              {foldLabel}
              </span><span className={iconName}></span>
            </span>

          </div>}


           {/*批量删除*/}
							<Dialog
							title="提示"
							onClose={this.deleForm}
							open={this.state.openDelForm}
							contentStyle ={{ width: '446px',height:'auto'}}
							>
								<DeleForm
										onCancel={this.deleForm}
										onSubmit={this.batchdelete}
								/>
						</Dialog>
      </div>
    )
  }
}
