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
import tree from './tree.json';
export default class Form  extends React.Component{

	constructor(props,context){
		super(props, context);
    this.state={
      searchParams: {
				page: 1,
				pageSize: 15,
				orgId: '1',
				orgType: "ROOT",
			},
      //tab
      data:{
        children:[],
        orgId:1,
        orgName:"全部类型",
        pId:0,
        treeType:"ROOT"
      },
      dimData: [],
      treeData: [],
      searchKey: '',
      tree:tree
    }
	}

  componentWillMount(){
    this.getTreeData();
  }

  componentDidMount() {
		/*const { NavModel } = this.props;
		NavModel.setSidebar(false);

    var {checkOperate} = this.props.NavModel;
    */

		var _this = this;
		Http.request('extra-list', {
			dimId:1
		}).then(function (response) {
			_this.setState({ dimData: response.items })
		}).catch(function (err) { });

		/*setTimeout(function() {
		   _this.setState({
			 isLeave :checkOperate("hrm_resource_dimission"),
		     isRemove : checkOperate("hrm_resource_account"),
		     istranfer : checkOperate("hrm_resource_move"),
			 isCard : checkOperate("hrm_resource_card"),
		     isOpen : checkOperate("hrm_resource_account")
		   })
		},500);*/
	}


  //获取树数据
  getTreeData = () => {
      let {tree}=this.state;
			this.setState({
				treeData: this.fnTree(tree),
        data:this.fnTree(tree)[0]
			});
	}

  //递归
  fnTree = (data) =>{
		let key = 0;
		var arr = data.map((item,index)=>{
			var obj = Object.assign({},item);
			if(obj.children.length!=0){
				obj.children = this.fnTree(obj.children);
			}
			obj.isClick = true;
			obj.key = key++;
			return obj;
		})
		return arr;
	}


  //搜索
  change = (event) => {
		this.setState({
			searchKey: event.target.value || ' ',
		},function(){
		})
	}

  //树选择
  onSelect = (data) => {
		var _this = this;
		this.setState({
			searchParams: {
				page: 1,
				pageSize: 15,
				orgId: data[0].orgId,
				orgType: data[0].treeType,
			},
      data:data[0]
		},function(){
			_this.getOrganizationDetail();
		});

	}

  getOrganizationDetail = ()=>{

		/*var searchParams = Object.assign({},this.state.searchParams);
		const that = this;
		Http.request('org-detail', searchParams).then(function (response) {
			const dataName = {};
			dataName.orgName = response.orgName;
			dataName.status = response.status || '0';
			dataName.orgId = response.orgId || '1';
			dataName.treeType = response.orgType || 'ROOT';
			that.setState({
				dataName,
			});
		}).catch(function (err) {

		});*/
	}



	render(){

    let {styleBool,
        selectStyle,
        searchParams,
        dimData,
        treeData,
        searchKey,
        data
    }=this.state;

    var children=[];
    if(data.children.length==0){
      children=[data];
    }else{
      for(var index in data.children){
          children.push(data.children[index])
      }
    }


		return(

      <div className="g-oa-labour">
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
                 label = {data.orgName}
                 >
                 {
                 children.map((item,index)=>{
                   return <TabC label={item.orgName}>
                            <TypeList
                              item={item}
                            />
                          </TabC>
                 })
                }

                 <TabC label='表单列表'>
                   <h1>3344</h1>
                 </TabC>

             </TabCs>
          </div>
				</div>
			</div>
		);
	}

}
