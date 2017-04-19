import React from 'react';

import {Http} from 'kr/Utils';
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipeGallery} from 'react-photoswipe';

import {
	reduxForm,
	formValueSelector,
	initialize
} from 'redux-form';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	KrDate,
	ListGroupItem,
	SearchForms,
	ButtonGroup,
} from 'kr-ui';
import './index.less';


export default class ItemDetail extends React.Component {

	static PropTypes = {
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
      infoList:[]
		}
	}
	componentDidMount() {
    var _this = this;
    var id = this.props.detail.id
    Http.request('findPaymentEvidence', {
            id: id
        }, {}).then(function(response) {
            _this.setState({infoList: response})
            console.log(response);
        }).catch(function(err) {});

	}
  onCancel = () => {
        let {onCancel} = this.props;
        onCancel && onCancel();
    }

	getThumbnailContent = (item) => {
	  return (
	    <img src={item.src} width={90} height={90}/>
	  );
	}
	render() {

		let {infoList} = this.state;
		let {detail}=this.props;
		let items = [];
		if(infoList.urls){
			items = infoList.urls.map((item,value) => {
				return(
					{
						src: item.src,
						w: 900,
						h: 900,
					}
				)
			});
		}

		return (
			<div className="u-audit-add">
			     <div className="u-audit-add-title">
			     	<span className="u-vouch-add-icon"></span>
			     	<span>凭证详情</span>
			     	<span className="u-audit-close" style={{
								marginRight: 40
						}} onTouchTap={this.onCancel}></span>
			     </div>

					 <div style={{marginLeft:46,marginTop:30}}>
						 <KrField grid = {1 / 2}   inline={false} component="labelText" label="签约方名称" value={infoList.customerName}/>
						 <KrField grid = {1 / 2}  component="labelText" inline={false} label="付款方式" value={infoList.payWayName}/>
						 <KrField grid = {1 / 2} component="labelText" inline={false} label="付款方名称" value={infoList.paymentAccount}/>
						 <KrField grid = {1 / 2}  component="labelText" label="入驻社区" inline={false} value={infoList.communityName}/>
						 <KrField grid = {1}  component="labelText" inline={false} defaultValue={infoList.remark} label="备注说明" />
						 <KrField grid = {1}  component="labelText" inline={false} label="添加凭证" />

						 	<div style={{marginLeft:19,marginTop:-28}}>
								<PhotoSwipeGallery items={items}  options={{index:detail.id}} thumbnailContent={this.getThumbnailContent}/>
							</div>
					 </div>
			</div>


		);
	}
}
