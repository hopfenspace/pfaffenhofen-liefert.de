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

const includes = (haystack, needle) => haystack.toLowerCase().includes(needle.toLowerCase());

export default function TableView(props) {
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

	let entries = data.allMapPoints.nodes;

	if(props.categories.length !== 0)
		entries = entries.filter(x => props.categories.indexOf(x.category) !== -1);

	if(props.search)
		entries = entries.filter(x => includes(x.name, props.search)
			|| includes(x.title, props.search)
			|| includes(get_category_text(x.category), props.search)
			|| includes(x.description, props.search));

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