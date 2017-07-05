import React from 'react';
import {
	Section,
    Title,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Button,
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn,
    SearchForms,
    TableFooter,
    Dialog,
    Drawer,
    KrDate
} from 'kr-ui';
import {DateFormat,Http} from 'kr/Utils';
import {Store} from 'kr/Redux';
import {initialize} from 'redux-form';
import './index.less';
import SearchUpperForm from './SearchUpperForm';
import EditCommunity from './EditCommunity';

export default class CommunityAllocation  extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state={
            openSearchDialog:false,
            openEditCommunity:false,
            searchParams:{
                page:1,
                pageSize:15
            },
            //下面的七个是传到编辑
            //社区名称
            communityName:'',
            //开业
            opend:'',
            //开业时间
            openDate:'',
            //四个图片的
            listValue:{},
            firstValue:{},
            stationValue:{},
            detailValue:[]    
        }
	}
   
   //高级查询开关
   openSearchUpperDialog=()=>{
       this.setState({
           openSearchDialog:!this.state.openSearchDialog
       })
   }
   //高级查询提交
   searchUpperSubmit=(params)=>{
     var searchParams={
         cmtName:params.cmtName?params.cmtName:'',
         show:params.show?params.show:'',
         customed:params.customed?params.customed:'',
         appoint:params.appoint?params.appoint:''
     }
     this.setState({
       searchParams:Object.assign({},searchParams,this.state.searchParams),
     }) 
     this.openSearchUpperDialog();
   }
  
   //搜索名称
   onSearchSubmit=(param)=>{
     var searchParams={
         cmtName:param.content
     }
     this.setState({
       searchParams:Object.assign({},searchParams,this.state.searchParams)   
     }) 
   }
   
   //编辑打开
   onOperation=(type,itemDetail)=>{
     if(type=='edit'){
        let _this=this;
        Http.request('web-community-detail',{id:itemDetail.id}).then(function(response) {
            Store.dispatch(initialize('EditCommunity',response));
            _this.setState({
             communityName:response.cmtName,
             opend:response.open,
             openDate:response.openDate            
            })
        }).catch(function(err) {
            Message.error(err.message);
        });
       this.setState({
           openEditCommunity:!this.state.openEditCommunity
       })
     }
   }
   
   //点击空白关闭
   whiteClose=()=>{
       this.setState({
           openEditCommunity:false
       })  
   }
  
  //编辑取消
   editCancel=()=>{
      this.setState({
           openEditCommunity:!this.state.openEditCommunity
       })
   }
 
 //编辑提交
  editSubmit=(params)=>{
       let _this=this;
       let {searchParams}=this.state;
       Http.request('web-community-edit',{},params).then(function(response) {
           _this.setState({
               time:+new Date(),
               pageSize:15,
               page:searchParams.page
           })
        }).catch(function(err) {
            Message.error(err.message);
        });
        this.editCancel();
  } 

  onPageChange=(page)=>{
     var searchParams={
         page:page
     }
     this.setState({
       searchParams:Object.assign({},searchParams,this.state.searchParams)   
     })  
  } 

	render(){

        let {searchParams,communityName,opend,openDate,stationValue,detailValue,firstValue,listValue}=this.state;

		return(
           <div className='m-web-community'>
				<Title value="官网社区配置"/>
				<Section title="社区显示配置" description="" style={{marginBottom:-5,minHeight:910}}>
				<Row style={{marginBottom:21,position:'relative',zIndex:5}}>
                      <Col  style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem><div className='list-outSearch'><SearchForms placeholder='请输入社区名称' onSubmit={this.onSearchSubmit}/></div></ListGroupItem>
				            <ListGroupItem><Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>
				          </ListGroup>
			          </Col>
	           </Row>

	          <Table
			    style={{marginTop:8}}
                ajax={true}
                displayCheckbox={false}
                onOperation={this.onOperation}
	            ajaxParams={searchParams}
                onPageChange={this.onPageChange}
	            ajaxUrlName='web-community-list'
	            ajaxFieldListName="items"
					  >
		            <TableHeader>
		              <TableHeaderColumn>社区名称</TableHeaderColumn>
		              <TableHeaderColumn>所属城市</TableHeaderColumn>
                      <TableHeaderColumn>显示排序</TableHeaderColumn>
                      <TableHeaderColumn>开业状态</TableHeaderColumn>
		              <TableHeaderColumn>是否官网显示</TableHeaderColumn>
		              <TableHeaderColumn>是否企业定制</TableHeaderColumn>
		              <TableHeaderColumn>是否允许预约</TableHeaderColumn>
		              <TableHeaderColumn>操作人</TableHeaderColumn>
                      <TableHeaderColumn>操作时间</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow>
			                <TableRowColumn name="cmtName"></TableRowColumn>
                            <TableRowColumn name="city"></TableRowColumn>
			                <TableRowColumn name="sort"></TableRowColumn>
                            <TableRowColumn name="open"></TableRowColumn>
			                <TableRowColumn name="show" options={[{label:'是',value:'true'},{label:'否',value:'false'}]}></TableRowColumn>
			                <TableRowColumn name="customed" options={[{label:'是',value:'true'},{label:'否',value:'false'}]}></TableRowColumn>
			                <TableRowColumn name="appoint" options={[{label:'是',value:'true'},{label:'否',value:'false'}]}></TableRowColumn>
			                <TableRowColumn name="operater"></TableRowColumn>
                            <TableRowColumn name="operateDate" component={(value,oldValue)=>{
                                return (<KrDate value={value} format="yyyy-mm-dd"/>)
                            }}></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="编辑"  type="operation"  operation="edit" />
			                </TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>


                   {/*高级查询*/}
                    <Dialog
						title="高级查询"
						onClose={this.openSearchUpperDialog}
						open={this.state.openSearchDialog}
						contentStyle ={{ width: '666px',height:'322px'}}
					  >
						<SearchUpperForm
						    onCancel={this.openSearchUpperDialog}
                            onSubmit={this.searchUpperSubmit}
						/>
				    </Dialog>


                     {/*编辑*/}
					<Drawer
				        open={this.state.openEditCommunity}
				        width={750}
				        onClose={this.whiteClose}
				        openSecondary={true}
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			          >
						<EditCommunity
						  onCancel={this.editCancel}
                          onSubmit={this.editSubmit}
                          communityName={communityName}	
                          opend={opend}
                          openDate={openDate}
                          stationValue={stationValue}
                          detailValue={detailValue}
                          firstValue={firstValue}
                          listValue={listValue}
						/>

		            </Drawer>

       </Section>

	 </div>
	  );
	}
}
