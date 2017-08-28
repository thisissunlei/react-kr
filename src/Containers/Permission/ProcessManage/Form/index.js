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
      dimData: [],
      treeData: [],
      searchKey: '',
      tree:tree
    }
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

		this.getTreeData();
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
    console.log('rrrr',data);
		var _this = this;
		this.setState({
			searchParams: {
				page: 1,
				pageSize: 15,
				orgId: data[0].orgId,
				orgType: data[0].treeType,
			}
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
        searchKey
    }=this.state;

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
                 label = "全部数据"
                 >
               <TabC label='基本信息'>
                 <span>11</span>
               </TabC>

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
