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
		Http.request('findReceiptDetail',{id:id}).then(function(response) {
			  _this.setState({infoList: response},function(){
					var fileList=[];
					if(this.state.infoList.uploadFileIds.length>0){
						this.state.infoList.uploadFileIds.map((item, value) => {
							fileList.push(<a href={item.fileUrl} target="_blank">{item.fileName}</a>)
							fileList.push(<br />)
						});
					}else{
						fileList=['暂无上传任何附件'];
					}
						this.fileList=fileList;
				})
				console.log(response);
		})

	}
  onCancel = () => {
        let {onCancel} = this.props;
        onCancel && onCancel();
    }
	getThumbnailContent = (item) => {
  return (
    <img src={item.thumbnail} width={90} height={90}/>
  );
	}
	renderPayList = () => {
		let {
			payInfoList
		} = this.state;
		var type;
		if (payInfoList.cimbList && payInfoList.cimbList.length > 0) {
			return payInfoList.cimbList.map((item, index) => {
				if (item.contactType == 1) {
					type = "承租意向书"
				} else if (item.contactType == 2) {
					type = "入驻协议书"
				} else if (item.contactType == 3) {
					type = "增租协议书"
				} else if (item.contactType == 4) {
					type = "续租协议书"
				}
				return (
					<div key={index} className="u-order-list u-clearfix">
						<div className="u-order-name">{`${type}-${item.contactName}`}</div>
						{
							item.frontmoney?(
							<div className="u-order-font-list">
								<div className="u-order-deatil">定金<span className="u-font-red">{`（未回款额：${item.nFrontmoney}）`}</span></div>
								<div className="u-order-count">{item.frontmoney}</div>
							</div>
						):''
						}
						{
							item.depositId?(
							<div className="u-order-font-list">
								<div className="u-order-deatil">履约保证金<span className="u-font-red">{`（未回款额：${item.nDeposit}）`}</span></div>
								<div className="u-order-count">{item.deposit}</div>
							</div>
						):''
						}
						{
							item.totalrentId?(
							<div className="u-order-font-list">
								<div className="u-order-deatil">工位服务费<span className="u-font-red">{`（未回款额：${item.nTotalrent}）`}</span></div>
								<div className="u-order-count">{item.totalrent}</div>
							</div>
						):''
						}

					</div>

				)

			})
		}

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
											value={infoList.company}
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
											name="uploadFileIds"
											value={this.fileList}
							/>
						</CircleStyleTwo>
					 <CircleStyleTwo num="3" info="付款明细" circle="bottom">
						 <div className="u-add-total-count">
							 <span className="u-add-total-icon"></span>
							 <span className="u-add-total-title">付款总金额：</span>
							 <span>{infoList.flowAmount}</span>
						 </div>
						 <div className="u-order-title">对应合同</div>
						 {/*\\this.renderPayList()*/}
					</CircleStyleTwo>
			</div>


		);
	}
}
