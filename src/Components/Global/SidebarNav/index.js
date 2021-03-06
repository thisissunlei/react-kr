import React, {
	PropTypes
} from 'react';
import {
	connect
} from 'react-redux';
import {
	List,
	ListItem
} from 'kr-ui';
import {
	MakeSelectable
} from 'material-ui/List';
import './index.less';

let SelectableList = MakeSelectable(List);

function wrapState(ComposedComponent) {

	return class SelectableList extends React.Component {

		static propTypes = {
			children: PropTypes.node.isRequired,
			defaultValue: PropTypes.number.isRequired,
			selectedItemStyle: PropTypes.object,
		};

		componentWillMount() {
			this.setState({
				selectedIndex: this.props.defaultValue,
			});
		}

		handleRequestChange = (event, index) => {
			this.setState({
				selectedIndex: index,
			});
		};

		render() {
			return ( < ComposedComponent value = {
					this.state.selectedIndex
				}
				onChange = {
					this.handleRequestChange
				}
				selectedItemStyle = {
					{
						backgroundColor: '#394457',
						color: '#fff'
					}
				} > {
					this.props.children
				} < /ComposedComponent>
			);
		}
	};
}

SelectableList = wrapState(SelectableList);

export default class SidebarNav extends React.Component {

	PropTypes = {
		items: React.PropTypes.isArray,
		current_parent: React.PropTypes.string,
		current_child: React.PropTypes.string,
	}

	constructor(props, context) {
		super(props, context);
	}

	renderMenuItem(item, index, parentIndex) {

		if(!item.permission){
			return null;
		}

		let {
			current_router,
			current_child
		} = this.props;
		var childStyles = {};
		let initiallyOpen = false;
		let parentStyles = {
			fontSize: '16px',
			marginTop: '-8px',
			marginLeft: '-20px',
			width: "180px",
			color: '#79859a',
			paddingBottom: '3px',
			paddingTop: '22px'
		};



		let jumpUrl = '';

		if (item.originUrl) {
			jumpUrl = item.originUrl;
		} else {
			jumpUrl = './#' + item.router;
		}

		var styles = {};

		childStyles.fontSize = '14px';
		childStyles.color = '#333';
		childStyles.paddingLeft = "20px";
		childStyles.width = "180px";
		childStyles.lineHeight = "16px";
		var isSelected = false;

		isSelected = item.active;

		if (isSelected) {
			childStyles.backgroundColor = '#283243';
			childStyles.color = '#fff';
		} else {
			childStyles.backgroundColor = '#394457';
			childStyles.color = '#c8d2d9';
		}
		/*
				if (item.router === current_router) {
					childStyles.backgroundColor = '#328ECC';
					childStyles.color = '#fff';
				} else {
					childStyles.backgroundColor = '#fff';
				}
				*/
		
		if (item.menuItems && item.menuItems.length) {
			return (

				<ListItem
					key={index}
					style={parentStyles}
					initiallyOpen={true}
					value={index}
					open={true}
					primaryText={item.primaryText}
					primaryTogglesNestedList={false}
					autoGenerateNestedIndicator={false}
					disabled={true}
					leftIcon={
						<div  
							className={item.iconName}  
							style={{
								fontSize:18,
								position: 'absolute',
								margin:'22px 0 0 39px',
								color:`${item.iconColor}`
							}}
							>
						</div>
					}
					nestedItems = {
						item.menuItems.map((it, ind) => this.renderMenuItem(it, ind, index))
					}

			/>

		);
	}
	return (
		<ListItem
					primaryText={item.primaryText}
					key={index}
					value={parentIndex+'-'+index}
					href={jumpUrl}
					style={childStyles}
			   	/>
	);

}

openUrl() {

}


render() {

	const style = {
		margin: '20px 0 0 0 ',
		display: 'inline-block',
		boxShadow: ' 0 0 0 0',
		width: 120,
	};


	return (

		<div >
			<SelectableList defaultValue={1000} >
		{this.props.items.map((item,index)=>this.renderMenuItem(item,index))}
			</SelectableList>
			</div>
	);

}
}
