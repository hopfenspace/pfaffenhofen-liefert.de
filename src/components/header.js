import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import logo from '../../static/favicon.png';
import bnvLogo from '../../static/buergernetz.svg';
import hsLogo from '../../static/hopfenspace.svg';

/* Additional Header Styles */
import './header.scss';

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <header>
      <div className={'ui unstackable grid'}>
        <div className={'ui twelve wide column logo-column'}>
          <div
            className={'header-logo'}
            style={{
              backgroundImage: 'url('+ logo +')'
            }}
          />
          <h1 className={'logo-font'}>
            <span>{data.site.siteMetadata.title}</span>
          </h1>
        </div>
        <div className={'ui four wide right aligned column'} style={{padding: '.8rem 1.4rem 0 0'}}>
          <div className={'icon-container'}>
            <a href={'https://bn-paf.de'}><img height={'50'} src={bnvLogo} /></a>
            <a href={'https://hopfenspace.org'}><img height={'50'} src={hsLogo} /></a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
