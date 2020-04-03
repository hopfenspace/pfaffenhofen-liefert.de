import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Head from '../components/head';

const Contact = () => {
  return (
    <Layout>
      <Head title={`Contact`} />
      <section className='ui vertical very fitted segment' style={{marginTop: '1rem'}}>
        <div className='ui container'>
          <h1 className='ui header'>
            <div className='content'>
            <span className='page-title'>
              pfaffenhofen-liefert.de
            </span>
              <div className='sub header'>
              </div>
              <Link to={'/'} className={'ui black icon button'}>
                <i className={'icon map'}/> Zurück zur Karte.
              </Link>
            </div>
          </h1>
        </div>
      </section>

      <section className='ui vertical segment' style={{minHeight: '55vh'}}>
        <div className='ui text container formcontainer'>
          <h2>Diese Seite wird betrieben von dem</h2>
          Bürgernetz Landkreis Pfaffenhofen e.V.<br />
          Sparkassenplatz 11<br />
          85276 Pfaffenhofen<br />
          D-85276 Pfaffenhofen/Ilm<br />
          <br />
          Email: liefert@pfaffenhofen.de<br />
          Telefon: 08441 4980299<br />
          <div className={'ui yellow message'} style={{fontWeight: 500, fontStyle: 'italic'}}>
            <i className={'icon external link'} />Read the Tutorial about how to set up your own map <a href={'https://medium.com/@marcfehr/how-to-build-a-fast-and-reliable-community-mapping-tool-with-gatsbyjs-and-firebase-74a0fa6b5b83?source=userActivityShare-f57d26da4972-1584988662&_branch_match_id=689400773593121406'} target={'_blank'} rel={'noopener noreferrer'}>here</a>.
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
