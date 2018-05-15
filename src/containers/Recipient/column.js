import React from 'react'



export const myself = [
	{
		id: 'bankAccount',
		Header: 'Bank account',
		accessor: d => d.account_info.account_no
	},
	{
		id: 'sortCode',
		Header: 'Sort Code',
		accessor: d => d.account_info.iban
	},
	{
		Header: 'Description',
		accessor: 'description'
	},
	{
		id: 'opton',
		Header: 'Option',
		accessor: 'name',
		Cell: () =>  <span className="clickable">Delete</span> ,
		className: 'text-secondary text-center'
	}
]


export const someone_else = [
	{
		Header: 'First & Middle Name',
		accessor: 'first_and_middle_name'
	},
	{
		Header: 'Last Name',
		accessor: 'last_name'
	},
	{
		id: 'bankAccount',
		Header: 'Bank account',
		accessor: d => d.account_info.account_no
	},
	{
		id: 'sortCode',
		Header: 'Sort Code',
		accessor: d => d.account_info.iban
	},
	{
		Header: 'Description',
		accessor: 'description'
	},
	{
		id: 'opton',
		Header: 'Option',
		accessor: 'name',
		Cell: () =>  <span className="clickable">Delete</span> ,
		className: 'text-secondary text-center'
	}
]