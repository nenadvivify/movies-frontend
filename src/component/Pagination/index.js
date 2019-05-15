import React from 'react';
import Pagination from "rc-pagination";
import 'rc-pagination/assets/index.css';
import './style.scss';

const MyPagination = ({total, pageSize, onChange, current}) => {
	current = +current || 1;

	if(!current || current <= 1) {
		current = 1
	}

	return (
        <Pagination 
        current={current}
        total={total}
        onChange={onChange}
        pageSize={pageSize} />
	)
}

export default MyPagination;