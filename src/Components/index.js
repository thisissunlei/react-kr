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
import Dialog from './Dialog';

import Notify from './Notify';

module.exports = {
	Calendar,
	Section,
	BreadCrumbs,
	Date,
	Loading,
	Pagination,
	Dialog,
	Notify,
	...Form,
	...Table,
	...Button,
}
