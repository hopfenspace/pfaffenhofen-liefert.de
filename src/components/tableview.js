import React from "react";
import { urlify } from './text-utils';
import { useStaticQuery, graphql } from 'gatsby';
import categories from '../components/categories';

import './tableview.scss';

const get_category_text = ident => {

	const result = categories.find(x => x.ident === ident);
	if(result)
	  return result.text;
	else
	  return ident;

};

export function TableView(props) {
	const data = useStaticQuery(graphql`
	query {
		allMapPoints(filter: { approved: { eq: true } }) {
			nodes {
				approved
				address
				category
				contact
				description
				email
				id
				name
				phone
				position
				title
			}
		}
	}
	`);

	const entries = data.allMapPoints.nodes
		.filter(x => props.categories.length === 0 || props.categories.indexOf(x.category) !== -1);

	entries.sort((a, b) => a.category.localeCompare(b.category));

	return (
		<table>
			<tr>
				<th>Name</th>
				<th>Kategorie</th>
				<th>Kontakt</th>
			</tr>
			{entries.map((item, i) => (
				<tr>
					<td>{item.title}</td>
					<td>{get_category_text(item.category)}</td>
					<td><span dangerouslySetInnerHTML={{ __html: urlify(item.contact) }} /></td>
				</tr>
			))}
		</table>
	)
}