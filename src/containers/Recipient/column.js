import React from 'react'



export const myself = [
	{
		Header: 'Country',
		accessor: 'country'
	},
	{
		Header: 'Bank account',
		accessor: 'bank_account'
	},
	{
		Header: 'Sort Code',
		accessor: 'sort_code'
	},
	{
		id: 'opton',
		Header: 'Option',
		accessor: 'name',
		Cell: props =>  <span className="clickable">Delete</span> ,
		className: 'text-blue text-center'
	}
]


export const someone_else = [
	{
		Header: 'First & Middle Name',
		accessor: 'first_middle_name'
	},
	{
		Header: 'Last Name',
		accessor: 'last_name'
	},
	{
		Header: 'Bank account',
		accessor: 'bank_account'
	},
	{
		Header: 'Sort Code',
		accessor: 'sort_code'
	},
	{
		id: 'opton',
		Header: 'Option',
		accessor: 'name',
		Cell: props =>  <span className="clickable">Delete</span> ,
		className: 'text-blue text-center'
	}
]