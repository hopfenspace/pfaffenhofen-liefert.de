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

	const postCodes = {
		"85107": "Baar-Ebenhausen",
		"85119": "Ernsgaden",
		"85290": "Geisenfeld",
		"85302": "Gerolsbach",
		"86558": "Hohenwart",
		"85304": "Ilmmünster",
		"85305": "Jetzendorf",
		"85077": "Manching",
		"85126": "Münchsmünster",
		"85276": "Pfaffenhofen an der Ilm",
		"85309": "Pörnbach",
		"85293": "Reichertshausen",
		"85084": "Reichertshofen",
		"85296": "Rohrbach (Ilm)",
		"85298": "Scheyern",
		"85301": "Schweitenkirchen",
		"85088": "Vohburg an der Donau",
		"85283": "Wolnzach",
		"85304": "Ehrensberg",	
		"85307": "Entrischenbrunn",	
		"85304": "Harres",	
		"85276": "Hettenshausen",	
		"85304": "Leiten",	
		"85304": "Prambach",	
		"85304": "Schaibmaierhof",	
		"85307": "Streitberg",	
		"85304": "Winden",
	};
	const renderPostalAndName = entry => {

		for(let code in postCodes) {
			let codeReg = new RegExp(code.toLowerCase(), 'iu');
			let cityReg = new RegExp(postCodes[code].toLowerCase(), 'iu');

			if(codeReg.test(entry.address) || cityReg.test(entry.address)) {
				return (
					<>
						<br />
						{code} {postCodes[code]}
					</>
				);
			}
		}

		return (<></>);
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