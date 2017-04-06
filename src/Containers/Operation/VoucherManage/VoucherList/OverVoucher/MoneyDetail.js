import React from 'react';
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipeGallery} from 'react-photoswipe';
import {Http} from 'kr/Utils';
import {
	KrField,
	KrDate,
	CircleStyleTwo
} from 'kr-ui';
import './index.less';


export default class VoucherDetail extends React.Component {

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
		Http.request('findPaymentEvidence',{id:id}).then(function(response) {
			  _this.setState({infoList: response})
				console.log(response);
		})

	}
  onCancel = () => {
        let {onCancel} = this.props;
        onCancel && onCancel();
    }
	renderFileName=()=>{

		this.fileList.map((item, value) => {
			return (
				<div key={index}>{item}</div>
			)
		});
	}
	getThumbnailContent = (item) => {
  return (
    <img src={item.thumbnail} width={90} height={90}/>
  );
	}
	render() {
    let {infoList} = this.state;
		console.log(this.state.infoList);
		let items = [];
		let urls = ['http://lorempixel.com/1200/900/sports/1',
		'http://lorempixel.com/1200/900/sports/2',
		'http://lorempixel.com/1200/900/sports/1',
		'http://lorempixel.com/1200/900/sports/2',
		'http://lorempixel.com/1200/900/sports/1',
	]
		items = urls.map((item,value) => {
			return(
				{
					src: item,
			    thumbnail: item,
			    w: 900,
			    h: 900,
			    title: value
				}
			)
		});
		return (
			<div className="u-audit-detail">
					 <CircleStyleTwo num="1" info="付款凭证">
						 	<div style={{marginTop:-28}}>
								<PhotoSwipeGallery items={items} thumbnailContent={this.getThumbnailContent}/>
						 	</div>
					 </CircleStyleTwo>
					  <CircleStyleTwo num="2" info="付款信息" style={{marginTop:45}}>
							<KrField
											grid = {1 / 2}
											inline={false}
											component="labelText"
											label="客户名称"
											value={infoList.customerName}
							/>
							<KrField
											grid = {1 / 2}
											component="labelText"
											inline={false}
											label="所属订单"
											value={infoList.payWayName}
							/>
							<KrField
											grid = {1 / 2}
											component="labelText"
											inline={false}
											label="订单起止"
											value={infoList.paymentAccount}
								/>
							<KrField
											grid = {1 / 2}
											component="labelText"
											label="公司主体"
											inline={false}
											value={infoList.communityName}
							/>
							<KrField
											grid = {1 / 2}
											component="labelText"
											inline={false}
											label="收款方式"
											value={infoList.paymentAccount}
								/>
							<KrField
											grid = {1 / 2}
											component="labelText"
											label="我司账户"
											inline={false}
											value={infoList.communityName}
							/>
							<KrField
											grid = {1 / 2}
											component="labelText"
											inline={false}
											label="付款账户"
											value={infoList.paymentAccount}
								/>
							<KrField
											grid = {1 / 2}
											component="labelText"
											label="收款日期"
											inline={false}
											value={infoList.communityName}
							/>
							<KrField
											grid = {1}
											component="labelText"
											inline={false}
											defaultValue={infoList.remark}
											label="备注"
							/>
							<KrField
											grid = {1}
											component="labelText"
											inline={false}
											label="上传附件"
							/>
						</CircleStyleTwo>
					 <CircleStyleTwo num="3" info="付款明细" circle="bottom">
						 <div className="u-add-total-count">
							 <span className="u-add-total-icon"></span>
							 <span className="u-add-total-title">付款总金额：</span>
							 <span>{infoList.flowAmount}</span>
						 </div>
						 <div className="u-order-title">对应合同</div>
					</CircleStyleTwo>
			</div>


		);
	}
}
