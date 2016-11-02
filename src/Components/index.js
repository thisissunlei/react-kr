//Components
import Calendar from './Calendar';
import Dialog from './Dialog';
import DotTitle from './DotTitle';
import Section from './Section';
import SelfAdaption from './SelfAdaption';
import Form from './Form/index';
import BreadCrumbs from './BreadCrumbs';
import Table from './Table/index';
import Date from './Date';
import KrDate from './Date';
import Loading from './Loading';
import Pagination from './Pagination';
import Button from './Button';
import Checkbox from './Checkbox';
import Notify from './Notify';
import IframeContent from './IframeContent';
//import Tabs from './Tabs/index';
import PageHeader from './PageHeader';
import Paper from './Paper';

import {
	Grid,
	Row,
	Col
} from './Grid';



//materal-ui
import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Divider,
	FontIcon,
	DatePicker,
	Avatar,
	Snackbar,
} from 'material-ui';

import {
	List,
	ListItem
} from 'material-ui/List';
import {
	Tabs,
	Tab
} from 'material-ui/Tabs';

module.exports = {
	//Components
	Paper,
	IframeContent,
	Calendar,
	Section,
	BreadCrumbs,
	Date,
	Loading,
	Pagination,
	Notify,
	Grid,
	Row,
	Col,
	Dialog,
	List,
	DotTitle,
	ListItem,
	Checkbox,
	SelfAdaption,
	...Form,
	...Table,
	...Button,


	//materal-ui
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Divider,
	FontIcon,
	DatePicker,
	Avatar,
	Dialog,
	Snackbar,
	Tabs,
	Tab,
	KrDate,
	//...Tabs,
	PageHeader,
}
