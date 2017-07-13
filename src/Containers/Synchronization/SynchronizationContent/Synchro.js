import React from 'react';
import {reduxForm,initialize} from 'redux-form';
import {Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Message,
	ListGroup,
	ListGroupItem,
	ButtonGroup
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import './index.less';
import State from './State';
@observer
export default class Synchro extends React.Component {

	constructor(props) {
		super(props);
		
	}
	componentDidMount(){
	}
	componentWillMount() {
	}
	onSubmit=(value)=>{
		console.log("dsadasda",value);
		this.getData()
		
	}
	getData=()=>{
		console.log('=========')
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					State.synchroListe = xhr.response.data;
				}else{
					alert('err')
				}
			}
		};

		xhr.open('GET', 'http://optest02.krspace.cn/api/krspace-finance-web/news/get-news-list?createUser=&publishedStatus=&stickStatus=&title=&page=1&pageSize=&',false);
		xhr.send(null);
	}
	

	render() {
		let communityInfoFloorList = [{value:1,label:'1'}]
		let {handleSubmit} = this.props;
		
		return (
		<div className="m-synchro-system">
			<div className="u-title-box">
				<img className="u-title-img" src={require('./images/activity.svg')} />
				<span className="u-title-text">手动同步</span>
				<span className="u-close-page" onClick={this.onCancel}>
					<img 
						src={require('./images/closeIMG.svg')} 
						className="u-close-page-img"
					 />
				</span>
			</div>
			<form name="planTable" onSubmit={handleSubmit(this.onSubmit)} className="form-list">
				<KrField
							name="name"
							type="text"
							component="input"
							label="接口地址 ：  "
							style={{marginRight:20,width:260}}
							grid={1/3}
							inline={true}

					 	/>
                <KrField 
                	name="start" 
                	grid={1/3} 
                	component="input"  
                	label="备注：  " 
                	inline={true} 
                	style={{marginRight:20,width:260}}
                	/>
                <Button  label="同步" type="submit"  width={60}/>
            </form>

             {State.synchroList.length && <Table
			    style={rowStyle}
	            displayCheckbox={false}
					  >
		            <TableHeader>
		              <TableHeaderColumn>序号</TableHeaderColumn>
		              <TableHeaderColumn>时间</TableHeaderColumn>
		              <TableHeaderColumn>内容</TableHeaderColumn>
		          	</TableHeader>
				<TableBody className='noDataBody' >
					{State.synchroList.map((item,index)=>{
			        		return (
				        		<TableRow key={index}>
					                <TableRowColumn><span className="tableOver">{item.createUser}</span>{this.everyTd(item.company)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver">{item.orderNum}</span>{this.everyTd(item.communityName)}</TableRowColumn>
					                <TableRowColumn><span className="tableOver">{title}</span>{this.everyTd(type)}</TableRowColumn>
					            </TableRow>
					          	);
			        	})}
				</TableBody>
			</Table>}
           {State.pages.page && <div className='footPage' style={rowFootStyle}><Pagination  totalCount={State.pages.totalPaper} page={State.pages.page} pageSize={State.pages.pageSize} onPageChange={this.onPageChange}/></div>}

				
		</div>


		);
	}
}

Synchro = reduxForm({
    form: 'Synchro'
})(Synchro);

