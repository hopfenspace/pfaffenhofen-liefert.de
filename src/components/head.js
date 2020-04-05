import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

const Head = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          teaserImage
        }
      }
    }
  `);

  return (
    <Helmet
      htmlAttributes={{ lang: 'de' }}
      title={`${title} | ${data.site.siteMetadata.title}`}
      meta={[
        { name: 'description', content: data.site.siteMetadata.description },
        { name: 'og:url', content: "https://pfaffenhofen-liefert.de" },
        { name: 'og:image', content: data.site.siteMetadata.teaserImage },
        { name: 'og:image:secure_url', content: data.site.siteMetadata.teaserImage },
        { name: 'og:locale', content: "de_DE"},
        { name: 'og:image:type', content: "image/jpeg"},
        { name: 'og:image:alt', content: "pfaffenhofen-liefert.de Logo" },
      ]}
    />
  );
};

export default Head;
