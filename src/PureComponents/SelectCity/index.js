import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {
	KrField,
	Button,
	Section,
	Grid,
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	SearchForms
} from 'kr-ui';
import {
	observer,
} from 'mobx-react';
@observer
export default class  SelectCity extends React.Component{

	constructor(props,context){
		super(props, context);

	}


 componentDidMount(){
		 Http.request('codeCategoryEdit').then(function(response) {
	 	  
	 	}).catch(function(err) {
	     Message.error(err.message);
	 	});
 }


	render(){

		return(

			<div>
					<Section title="会议室配置" description="" style={{marginBottom:-5,minHeight:910}}>
					    <Row style={{paddingBottom:21,position:'relative',zIndex:5,borderBottom:'solid 1px #b1d8ff'}}>


									<Col  style={{marginTop:0,float:"right",marginRight:-10}}>
										<ListGroup>
											<ListGroupItem><SearchForms placeholder='请输入您要查询的内容 ' onSubmit={this.onSearchSubmit}/></ListGroupItem>
										</ListGroup>
									</Col>
							</Row>


					</Section>
			</div>
		);
	}

}
