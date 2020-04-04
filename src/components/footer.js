import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import './footer.scss';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author,
          title,
          email,
        }
      }
    }
  `);

  return (
    <footer className='ui vertical inverted segment'>
      <div className='ui center aligned container'>
        <i className='ui icon copyright' />{new Date().getFullYear()}{' '}Bürgernetz Landkreis Pfaffenhofen e.V.{' '}|{' '}<a href={`mailto:${data.site.siteMetadata.email}`}><i className='ui icon envelope' />E-Mail</a>{' '}
      </div>
    </footer>
  );
};

export default Footer;
