//Components
import Calendar from './Calendar';
import Section from './Section';
import Form from './Form/index';
import BreadCrumbs from './BreadCrumbs';
import Table from './Table/index';
import Date from './Date';
import Loading from './Loading';
import Pagination from './Pagination';
import Button from './Button';
import MyForm from './MyForm';
import Notify from './Notify';

//materal-ui
import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Divider,
	FontIcon,
	DatePicker,
	Paper,
	Avatar,
	Dialog
} from 'material-ui';

module.exports = {

	//Components
	Calendar,
	Section,
	BreadCrumbs,
	Date,
	Loading,
	Pagination,
	Notify,
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
	Paper,
	Avatar,
	Dialog
}
