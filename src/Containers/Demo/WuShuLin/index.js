import React from 'react';
import { reduxForm } from 'redux-form';
import {
	SwitchSlide,
	KrField
} from 'kr-ui';
import './index.less';



class Tree extends React.Component {

	constructor(props, context) {
		super(props, context)
	}

	render() {

		return (
			<div className="ui-tree">{props.children}</div>
		);
	}

}



class TreeNode extends React.Component {


	static contextTypes = {
		checked: React.PropTypes.bool,
		registerChildrenNode: React.PropTypes.func,
	}

	getChildContext() {
		return {
			checked: this.state.checked,
			registerChildrenNode: this.registerChildrenNode
		};
	}


	static defaultProps = {
		extend: false,
		checked: false,
	}

	static propTypes = {
		extend: React.PropTypes.bool
	}

	static childContextTypes = {
		checked: React.PropTypes.bool,
		registerChildrenNode: React.PropTypes.func,
	}


	constructor(props, context) {
		super(props, context)

		this.state = {
			checked: props.checked,
			extend: props.extend,
		}

		this.childrenNode = [];
	}

	componentDidMount() {
		const { registerChildrenNode } = this.context;
		registerChildrenNode && registerChildrenNode(this);
	}

	componentWillReceiveProps(nextProps) {

	}

	registerChildrenNode = (treeNode) => {
		this.childrenNode.push(treeNode);
	}

	/*
	shouldComponentUpdate(nextProps,nextState,contextProps){

	}
	*/

	onSelect = () => {
		var extend = this.state.extend;
		extend = !extend;
		this.setState({ extend });
	}

	onCheck = (event) => {

		var checked = this.state.checked;
		checked = !checked;

		this.setState({ checked });

		this.childrenNode.map(function (treeNode) {
			if (checked) {
				treeNode.toChecked && treeNode.toChecked();
			} else {
				treeNode.toCancelChecked && treeNode.toCancelChecked();
			}
		});

	}

	childrenNodeToChecked = () => {

		const { checked } = this.state;

		this.childrenNode.map(function (treeNode) {
			if (checked) {
				treeNode.toChecked && treeNode.toChecked();
			} else {
				treeNode.toCancelChecked && treeNode.toCancelChecked();
			}
		});
	}



	toChecked = () => {
		this.setState({ checked: true }, function () {
			this.childrenNodeToChecked();
		});
	}

	toCancelChecked = () => {
		this.setState({ checked: false }, function () {
			this.childrenNodeToChecked();
		});
	}

	renderCheckbox = () => {

		var { checked } = this.state;

		return (
			<input type="checkbox" checked={checked} onChange={this.onCheck} />
		);

	}

	renderTitle = () => {

		const { title } = this.props;

		return (
			<div className="tree-node-title">
				{this.renderCheckbox()}
				<span className="item-title" onClick={this.onSelect}>
					{title}
				</span>
			</div>
		);

	}

	renderChildren = () => {

		const { children } = this.props;
		const { extend } = this.state;

		const styles = {};

		if (!extend) {
			styles.display = 'none';
		} else {
			styles.display = 'block';
		}

		return (
			<div className="tree-node-children" style={styles}>
				{children}
			</div>
		);

	}

	render() {

		const { title, children } = this.props;

		return (
			<div className="tree-node" ref={(ref) => this.treeNode = ref}>
				{this.renderTitle()}
				{this.renderChildren()}
			</div>
		);

	}

}

class WuShuLin extends React.Component {

	constructor(props, context) {
		super(props, context);
	}



	componentDidMount() {

	}



	render() {

		const treeData = [
			{
				label: '你',
				children: [
					{
						label: 'ok-',
						children: [
							{
								label: 'ok-',
								children: [
									{
										label: 'ok-',
										children: [],
									},

									{
										label: 'ok-',
										children: [],
									},
								],
							},
							{
								label: 'ok-',
								children: [],
							},
							{
								label: 'ok-',
								children: [],
							},
							{
								label: 'ok-',
								children: [],
							},
						],
					},
					{
						label: '--ok-',
						children: [

							{
								label: '--ok-',
								children: [],
							},

							{
								label: '--ok-',
								children: [],
							},
						],
					},
					{
						label: '--ok-',
						children: [],
					},
				]
			}
		];

		const loop = (data, parentIndex = 0) => {

			return data.map((item, index) => {

				var realKey = parentIndex + '-' + item.label;
				var key = parentIndex + '-' + index;

				if (item.children) {
					return (<TreeNode key={key} realKey={realKey} title={item.label} itemData={item}>
						{loop(item.children, key)}
					</TreeNode>);
				}
				return <TreeNode key={key} realKey={realKey} title={item.label} itemData={item} />;
			});

		};

		let treeNodes = loop(treeData);


		return (
			<div>
				<Tree>
					{treeNodes}
				</Tree>
			</div>
		);
	}
}

export default reduxForm({ form: 'WuShuLin' })(WuShuLin);
