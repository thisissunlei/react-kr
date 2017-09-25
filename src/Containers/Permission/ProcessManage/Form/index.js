import React from 'react';
import {
  SliderTree,
  TabCs,
  TabC,
  Message,
} from 'kr-ui';
import {
	Http,
	DateFormat,
} from "kr/Utils";
import './index.less';
import TypeList from './TypeList';
import FormList from './FormList';
import tree from './tree.json';
export default class Form  extends React.Component{

	constructor(props,context){
		super(props, context);
    this.state={
      nameKey: '',
      data:{
        children:[],
        id:0,
        name:"全部类型",
        treeType:"top"
      },
      dimData: [],
      treeData: [],
      searchKey: ''
    }
	}

  componentWillMount(){
    
  }

  componentDidMount() {
	  this.getTreeData();
	}
  
  addSubmit=()=>{
    this.getTreeData();
  }

  editSubmit=()=>{
    this.getTreeData();
  }

  //获取树数据
  getTreeData = () => {
    let {nameKey,data} = this.state; 
    var _this = this;
		Http.request('get-from-navigation', {
      nameKey:nameKey
		}).then(function (response) {
      let treeData = Object.assign({},data);
      treeData.children = response.items;
      _this.setState({
        treeData : _this.fnTree([treeData]),
      });
		}).catch(function (err) {
      
    });

	}

  //递归
  fnTree = (data) =>{
    
		let key = 0;
    
		var arr = data.map((item,index)=>{
			var obj = Object.assign({},item);
      if(!obj.children){
        obj.children=[];
        obj.treeType='single';
      }
      if(obj.children.length!=0){
				obj.children = this.fnTree(obj.children);
			}
			obj.isClick = true;
      obj.orgName = obj.name;
      obj.orgId = obj.id;
			obj.key = key++;
			return obj;
		})
		return arr;
	}


  //搜索
  change = (event) => {
		this.setState({
			searchKey: event.target.value || ' ',
		})
	}

  //树选择
  onSelect = (data) => {
		this.setState({
      data:data[0]
		});
	}



	render(){

    let {styleBool,
        selectStyle,
        treeData,
        searchKey,
        data
    }=this.state;

   
		return(

      <div className="g-oa-labour pessi-form-type">
				<div className="left">
					<div className="search">
						<input type="text" onChange={this.change} placeholder="输入表单名称" ref="searchKey"/>
						<span className="searching">

						</span>
					</div>
					<div className="oa-tree">
						<SliderTree
							onSelectTree={this.onSelect}
              treeData={this.state.treeData}
							searchKey={this.state.searchKey}
							type="department-radio"
							TreeTheme = "institutionsTheme"
						/>
					</div>
				</div>
				<div className="right">
          <div className='right-center'>
            <TabCs
                 isDetail='iconTab'
                 label = {data.name}
                 >
                { data.id === 0 &&
                    <TabC label='类型列表'>
                      <TypeList 
                          id={data.id}
                          addSubmit={this.addSubmit}
                          editSubmit={this.editSubmit}
                      />
                    </TabC>
                 }

                 <TabC label='表单列表'>
                   <FormList 
                      id={data.id}
                   />
                 </TabC>
               

             </TabCs>
          </div>
				</div>
			</div>
		);
	}

}
