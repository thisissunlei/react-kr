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
export default class Form  extends React.Component{

	constructor(props,context){
		super(props, context);
    this.state={
      styleBool: false,
      selectStyle: {
				'display': 'none'
			},
      searchParams: {
				page: 1,
				pageSize: 15,
				orgId: '1',
				orgType: "ROOT",
			},
      dimData: [],
      treeData: [],
      searchKey: '',
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

		this.initSelect();
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


  componentWillUnmount() {
		window.removeEventListener("click", this.controlSelect, false);
	}

	initSelect = (e) => {
		window.addEventListener("click", this.controlSelect);
	}

  //获取树数据
  getTreeData = () => {
		const _this = this;
		Http.request("org-list",{dimId: 1}).then(function (response) {
			_this.setState({
				treeData: _this.fnTree([response]),
			});
		}).catch(function (err) {
			Message.error(err.message);
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

  controlSelect = () => {
		this.setState({
			selectStyle: {
				'display': 'none'
			},
			styleBool: false,
		})
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
					<div className="header">
						<span className="title" style={{ 'backgroundColor': `${styleBool?'#fff':''}` }} onClick={(event) => {
							event.stopPropagation();
							this.clickSelect();
						}}>
							<span className="title-text">{this.state.dimName}</span>
							<span className="title-list" style={this.state.selectStyle}>
								{this.state.dimData.map((item, index) => { return this.renderDimList(item, index) })}
							</span>
							{this.state.dimData.length>0
								&&
								<span className="square">

								</span>
							}

						</span>

					</div>
					<div className="search">
						<input type="text" onChange={this.change} placeholder="输入机构名称" ref="searchKey"/>
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

               <TabC label='个人信息'>
                <h1>asda</h1>
               </TabC>

               <TabC label='工作信息'>
                <h1>3344</h1>
               </TabC>
             </TabCs>
          </div>
				</div>
			</div>
		);
	}

}
