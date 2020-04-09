require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    author: 'Bürgernetz Landkreis Pfaffenhofen e.V.',
    title: 'pfaffenhofen-liefert.de',
    description:
      'Karte mit Geschäften im Landkreis Pfaffenhofen die während der COVID-19 Krise noch geöffnet haben',
    email: 'liefert@pfaffenhofen.de',
    teaserImage: "https://pfaffenhofen-liefert.de/preview.png",
    share: {
      text: 'pfaffenhofen-liefert.de',
      hashtags: 'pfaffenhofen,Coronavirus,StayHome' // separate with commas,
    },
    menuLinks: [
      {title: 'Start', link: '/', icon: 'map'},
      {title: 'Hinzufügen', link: '/add', icon: 'plus'},
      {title: 'Impressum', link: '/contact', icon: 'info'},
    ],
    mapData: {
      bounds: [
        [11.3633, 48.5718],
        [11.6843, 48.4886]
      ]
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "XX-XXXXXXXXX-X",
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          databaseURL: process.env.FIREBASE_URL
        }
      }
    },
    {
      resolve: `gatsby-source-firebase`,
      options: {
        // point to the firebase private key downloaded
        // credential: require('./secret/firebase-creds'),

        credential: {
          "type": process.env.FIREBASE_TYPE,
          "project_id": process.env.FIREBASE_PROJECT_ID,
          "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          "client_email": process.env.FIREBASE_CLIENT_EMAIL,
          "client_id": process.env.FIREBASE_CLIENT_ID,
          "auth_uri": process.env.FIREBASE_AUTH_URI,
          "token_uri": process.env.FIREBASE_TOKEN_URI,
          "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
          "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
        },

        // your firebase database root url
        databaseURL: process.env.FIREBASE_URL,

        // you can have multiple "types" that point to different paths
        types: [
          // if you're data is really simple, this should be fine too
          {
            type: "MapPoints",
            path: "data/",
          }
        ]
      }
    }
  ],
};
