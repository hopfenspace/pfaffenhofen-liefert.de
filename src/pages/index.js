import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import { MapViewComponent } from '../components/mapview.main';
/* SEO Component with React Helmet */
import Head from '../components/head';
import logo from '../../static/teaser.jpg';
import categories from '../components/categories';
import {urlify, ln2br} from '../components/text-utils';

import './tablestyle.scss';

const get_category_text = ident => {

  const result = categories.find(x => x.ident === ident);
  if(result)
    return result.text;
  else
    return ident;

};

const Index = () => {
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
      site {
        siteMetadata {
          title
          email
          teaserImage
        }
      }
    }
  `);

  return (
    <Layout>
      <Head title={data.site.siteMetadata.title} />
      <div className="index">
        <section
          className="ui vertical very fitted segment"
          style={{ marginTop: '1rem' }}
        >
          <div className="ui container">
            <h1 className="ui header">
              <div className="content">
                <img src={logo} className="logo-header" alt="Logo" />
                <div className="sub header">
                  Viele kleine Läden und Dienstleister verwandeln sich in der
                  Corona-Krise in Heimlieferdienste oder bieten To-Go an. Wir
                  zeigen Ihnen, welche. Ist Ihr Geschäft nicht drauf?.{' '}
                  <Link to={'/add'}>Helfen sie mit!</Link>
                </div>
              </div>
            </h1>
          </div>
        </section>
        <section>
          <MapViewComponent />
        </section>
        <section className="ui vertical segment intro">
          <div
            className="ui text container formcontainer"
            style={{ 'max-width': '1111px !important' }}
          >
            <h2>Alle Teilnehmenden Geschäfte als Liste</h2>
            <p></p>

            <table>
              <tr>
                <th>Name</th>
                <th>Kategorie</th>
                <th>Kontakt</th>
              </tr>
              {data.allMapPoints.nodes.map((item, i) => (
                <tr key={item.timestamp}>
                  <td>{item.title}</td>
                  <td>{get_category_text(item.category)}</td>
                  <td><span dangerouslySetInnerHTML={{ __html: urlify(item.contact) }} /></td>
                </tr>
              ))}
            </table>

            <h2>Wie lege ich einen Eintrag an?</h2>
            <p>
              Sie können weitere Einträge hinzufügen. Wir prüfen neue Einträge
              und schalten diese frei, bevor sie auf der Karte erscheinen.
            </p>
            <Link
              to={'/add'}
              className="ui primary fluid button"
              style={{ marginTop: '1rem' }}
            >
              Eintrag erfassen
            </Link>
            <h2>Wie kann ich mich austragen lassen?</h2>
            <p>
              Sie sind auf der Karte und wollen das garnicht? Schreiben sie
              einfach eine E-Mail an{' '}
              <a
                href={`mailto:${data.site.siteMetadata.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.site.siteMetadata.email}
              </a>
              .{' '}
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
