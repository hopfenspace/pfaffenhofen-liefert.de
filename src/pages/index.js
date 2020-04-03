import React from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
import { Link } from 'gatsby'
import { MapViewComponent } from '../components/mapview.main'
/* SEO Component with React Helmet */
import Head from '../components/head'

const Index = () => {

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title,
          email
        }
      }
    }
  `);

  return (
    <Layout>
      <Head title={data.site.siteMetadata.title} />
      <div className='index'>
        <section className='ui vertical very fitted segment' style={{marginTop: '1rem'}}>
          <div className='ui container'>
            <h1 className='ui header'>
              <div className='content'>
                <span className={'page-title'}>Pfaffenhofen liefert: Diese Geschäfte haben virtuell geöffnet.</span>
                <div className='sub header'>
                  Viele kleine Läden und Dienstleister verwandeln sich in der Corona-Krise in Heimlieferdienste. Wir zeigen Ihnen, welche. Ist Ihr Geschäft nicht drauf?.{' '}
                  <Link to={'/add'}>
                    Helfen sie mit!
                  </Link>
                </div>
              </div>
            </h1>
          </div>
        </section>
        <section>
          <MapViewComponent />
        </section>
        <section className='ui vertical segment intro'>
          <div className='ui text container formcontainer'>
            <h2>What do I see on this map?</h2>
            <p>
              At the moment, the map shows people and shops who offer their help and services for the community in and around Muizenberg. I'm currently working to add more functionality to it:
            </p>
            <ul>
              <li>A "help" <strong>function for vulnerable people and people in need</strong> who's data need to be protected. This will will soon be online.</li>
              <li>Also, there will be an option to offer <strong>help without being on a map</strong>, if the offered services are not bound to any location.</li>
            </ul>
            <Link
              to={'/add'}
              className='ui primary fluid button'
              style={{marginTop: '1rem'}}
            >
              Add public information now
            </Link>
            <h2>How can I delete myself from the app?</h2>
            <p>
              Write me an email to{' '}
              <a
                href={`mailto:${data.site.siteMetadata.email}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {data.site.siteMetadata.email}
              </a>
              .{' '}Otherwise, all your data will be automatically deleted once this map is not being needed anymore.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
