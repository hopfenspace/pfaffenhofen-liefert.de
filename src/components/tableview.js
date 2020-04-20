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

	const cities = {
		"Baar-Ebenhausen": "85107",
		"Ernsgaden": "85119",
		"Geisenfeld": "85290",
		"Gerolsbach": "85302",
		"Hohenwart": "86558",
		"Ilmmünster": "85304",
		"Jetzendorf": "85305",
		"Manching": "85077",
		"Münchsmünster": "85126",
		"Pfaffenhofen": "85276",
		"Pörnbach": "85309",
		"Reichertshausen": "85293",
		"Reichertshofen": "85084",
		"Rohrbach": "85296",
		"Scheyern": "85298",
		"Schweitenkirchen": "85301",
		"Vohburg": "85088",
		"Wolnzach": "85283",
		"Ehrensberg": "85304",
		"Entrischenbrunn": "85307",
		"Harres": "85304",
		"Hettenshausen": "85276",
		"Leiten": "85304",
		"Prambach": "85304",
		"Schaibmaierhof": "85304",
		"Streitberg": "85307",
		"Winden": "85304",
	};
	const renderPostalAndName = entry => {

		let city = null;
		for(let curr in cities) {
			let reg = new RegExp(curr.toLowerCase(), 'iu');
			if(reg.test(entry.address)) {
				city = curr;
				break;
			}
		}

		if(city === null) {
			for(let curr in cities) {
				let reg = new RegExp(cities[curr], 'iu');
				if(reg.test(entry.address)) {
					city = curr;
					break;
				}
			}
		}

		if(city === null) {
			return (<></>);
		}
		else {
			return (
				<>
					<br />
					{cities[city]} {city}
				</>
			);
		}
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
						<td>
							<a href={'javascript:void()'}>{item.title}</a>
							{renderPostalAndName(item)}
						</td>
						<td>{get_category_text(item.category)}</td>
						<td><span dangerouslySetInnerHTML={{ __html: urlify(item.contact) }} /></td>
					</tr>
					{renderExpandedEntry(item)}
				</>
			))}
		</table>
	)
}