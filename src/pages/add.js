import React from 'react';
import { Link } from 'gatsby'
/* SEO Component with React Helmet */
import Head from '../components/head'
import Layout from '../components/layout'
import { MapAddComponent } from '../components/mapview.add'

const Add = () => {
  return (
    <Layout>
      <Head title={`Add`} />
      <div className='index'>
        <section className='ui vertical very fitted segment' style={{marginTop: '1rem'}}>
          <div className='ui container'>
            <h1 className='ui header'>
              <div className='content'>
              <span className='page-title'>
              Haben Sie einen neuen Lieferdienst für ihre Waren? Tragen Sie sich ein.
              </span>
                <div className='sub header'>
                Wenn Sie ganz neu einen Lieferdienst anbieten, dann tragen Sie sich bitte hier ein.
                </div>
              </div>
            </h1>
          </div>
        </section>

        <section className='ui vertical segment'>
          <div className='ui text container formcontainer'>
            <h2>So funktioniert es:</h2>
            Wählen Sie auf der Karte den Ort aus, in dem sich Ihr Geschäft befindet. Danach können Sie zusätzliche Infos angeben, was sie genau anbieten und wie Kunden ihre Waren oder Dienstleistungen beziehen können. Wir veröffentlichen nach einer Prüfung diese Daten{' '}
            <Link to='/'>
            in dieser Karte
            </Link>.
          </div>
        </section>
        <section>
          <MapAddComponent />
        </section>

      </div>
    </Layout>
  );
};

export default Add;
