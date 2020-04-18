import React, { useState } from "react";
import { urlify, ln2br } from './text-utils';
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
	const [expandedEntryId, setExpandedEntryId] = useState(null);

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

	const renderExpandedEntry = entry => {

		if(entry.id !== expandedEntryId)
			return (<></>);

		return (
			<>
				<tr></tr>
				<tr>
					<td colSpan={3}>
						<h4>Beschreibung</h4>
						{ln2br(entry.description)}
						<h4>Adresse</h4>
						{ln2br(entry.address)}
						<br /><br /><br />
					</td>
				</tr>
			</>
		);

	};

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
				<>
					<tr onClick={e => setExpandedEntryId(item.id === expandedEntryId ? null : item.id)}>
						<td><a href={'javascript:void()'}>{item.title}</a></td>
						<td>{get_category_text(item.category)}</td>
						<td><span dangerouslySetInnerHTML={{ __html: urlify(item.contact) }} /></td>
					</tr>
					{renderExpandedEntry(item)}
				</>
			))}
		</table>
	)
}