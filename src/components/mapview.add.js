import React, { useState } from 'react'
import './mapview.add.scss'
import AnimatedMap from './map-add/animatedmap/component.js'
import categories from '../components/categories'
import { useStaticQuery, graphql, Link } from 'gatsby';
import firebase from "gatsby-plugin-firebase";

const scrollToElement = require('scroll-to-element');

/*
See gatsby-config.js in main dir for bounds
 */

export function MapAddComponent() {

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title,
          share {
            text,
            hashtags
          },
          mapData {
            bounds
          }
        },
      }
    }
  `);

  const [mapActive, setMapActive] = useState(false);
  const [map, setMap] = useState(null);
  const [positionSelected, setPositionSelected] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [showError, setShowError] = useState(false);
  const [content, setContent] = useState({
    position: [],
    category: '',
    title: '',
    description: '',
    contact: '',
    address: '',
    phone: '',
    email: '',
    name: '',
    timestamp: Date.now(),
    approved: false
  })

  const onChange = e => {
    // content[e.target.name] = e.target.value
    const c = { ...content }
    c[e.target.name] = e.target.value
    setContent(c)
  };

  React.useEffect(() => {
    if (mapActive) {
      map.on('click', e => {
        const pos = [e.lngLat.lng, e.lngLat.lat]

        console.log(pos);
        setContent({ ...content, position: pos })
        map.getSource('position').setData({
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: pos }
            }
          ]
        })
      });

      // Fit effect
      map.fitBounds(
        data.site.siteMetadata.mapData.bounds,
        { duration: 700 }
      )
    }
  }, [mapActive]);

  React.useEffect(() => {
    scrollToElement('#formcontent')
  }, [positionSelected]);

  React.useEffect(() => {
    if (formSent === true) {
      const newPostKey = firebase
        .database()
        .ref()
        .child('data')
        .push().key

      firebase
        .database()
        .ref('/data/' + newPostKey)
        .update(content)
        .then(() => {
          console.log('Writing done')
        })
        .catch(e => {
          console.log('error', e)
        })
    }
  }, [formSent])

  const validateForm = () => {
    let error = false
    error = content.title.length === 0 ? true : error
    error = content.description.length === 0 ? true : error
    error = content.address.length === 0 ? true : error
    error = content.contact.length === 0 ? true : error
    error = content.name.length === 0 ? true : error
    error = content.email.length === 0 ? true : error
    error = content.category.length === 0 ? true : error

    if (error) {
      setShowError(true)
    } else {
      setFormSent(true)
    }
  }

  return (
    <div id={'map-add-component'}>
      <div
        id='mapcontainer'
        style={{ display: positionSelected ? 'none' : 'inherit' }}
      >
        <AnimatedMap getMapObject={m => setMap(m)} enabled={mapActive} />
        {!mapActive && (
          <div id='overlay' className='box'>
            <h3>Eintrag anlegen</h3>
            <p>
            Wählen Sie auf dieser Karte den Ort Ihres Geschäftes aus. Sie können dazu die Karte vergrössern. Um einen Ort zu wählen, klicken Sie auf die Karte.
            </p>
            <button
              className='ui primary button'
              onClick={() => setMapActive(true)}
            >
              Karte laden und Eintrag anlegen.
            </button>
          </div>
        )}

        {content.position.length > 0 && (
          <div id='selectThisPoint' className='box'>
            <h3>Diese Position wählen?</h3>
            <p>Wollen Sie dies als Ihre Position festlegen?</p>
            <div className='ui buttons'>
              <button
                className='ui button'
                onClick={() => {
                  setContent({ ...content, position: [] })
                }}
              >
                Nein, neu wählen
              </button>
              <button
                className='ui positive button'
                onClick={() => setPositionSelected(true)}
              >
                Ja, eintragen!
              </button>
            </div>
          </div>
        )}
      </div>

      {positionSelected && !formSent && (
        <div id='formcontent' className='ui vertical segment'>
          <div className='ui text container formcontainer'>
            <button
              className='ui left labeled icon button compact'
              onClick={() => {
                setPositionSelected(false)
                setContent({ ...content, position: [] })
              }}
            >
              <i className='left arrow icon' />
              Ort ändern
            </button>
            <div className='ui form'>
              <h4 className='ui horizontal divider header'>
                Über den Eintrag
              </h4>
              <p>
                Bitte beantworten sie die folgenden Fragen.
              </p>

              <div className='field'>
                <label>Kategorie</label>
                <select
                  value={content.category}
                  className='ui dropdown'
                  onChange={e =>
                    setContent({ ...content, category: e.target.value })
                  }
                >
                  <option value='' />
                  {categories.map(c => (
                    <option value={c.ident} key={c.ident}>
                      {c.text}
                    </option>
                  ))}
                </select>
                {/*
                <CategoryButtons
                  onClick={name => setContent({ ...content, category: name })}
                  selected={content.category}
                /> */}
              </div>

              <div className='field required'>
                <label>Titel</label>
                <input
                  type='text'
                  name='title'
                  value={content.title}
                  onChange={onChange}
                  placeholder='Pizza Lieferservice / Einkaufs Hilfe / ...?'
                />
              </div>

              <div className='field required'>
                <label>Beschreibung</label>
                <textarea
                  rows={4}
                  name='description'
                  onChange={onChange}
                  placeholder='Kurzer Text der das Angebot beschreibt.'
                  defaultValue={content.description}
                />
              </div>

              <div className='field required'>
                <label>Kontakt Informationen</label>
                <textarea
                  rows={4}
                  name='contact'
                  placeholder='Öffentlich Lesbare Kontaktinformationen. Zum Beispiel: Telefon: 08441 123456, Email: meinLaden@pfaffenhofen.de'
                  defaultValue={content.contact}
                  onChange={onChange}
                />
              </div>

              <div className='field required'>
                <label>Adresse</label>
                <textarea
                  rows={4}
                  name='address'
                  placeholder='Ihre Geschäftsadresse.'
                  defaultValue={content.address}
                  onChange={onChange}
                />
              </div>

              <h4 className='ui horizontal divider header'>
                Weitere Informationen
              </h4>
              <p>
                Diese Informationen werden nicht auf der Webseite veröffentlicht.
              </p>

              <div className='field required'>
                <label>Ihr Name</label>
                <input
                  type='text'
                  name='name'
                  placeholder='Max Mustermann'
                  defaultValue={content.name}
                  onChange={onChange}
                />
              </div>

              <div className='field required'>
                <label>Ihre E-Mail Adresse</label>
                <input
                  type='text'
                  name='email'
                  placeholder='max.mustermann@pfaffenhofen.de'
                  defaultValue={content.email}
                  onChange={onChange}
                />
              </div>

              <div className='field'>
                <label>Telefonnummer (optional)</label>
                <input
                  type='text'
                  name='phone'
                  placeholder='08441 ...'
                  defaultValue={content.phone}
                  onChange={onChange}
                />
              </div>

              {showError && (
                <div className='ui negative message'>
                  <div className='header'>Fehlende Angaben</div>
                  <p>
                    Bitte füllen sie alle Pflichtfelder aus.
                  </p>
                </div>
              )}

              <div className='ui buttons'>
                <button className='ui positive button' onClick={validateForm}>
                  Absenden
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {formSent && (
        <div className='ui vertical segment'>
          <div className='ui text container'>
            <div className='ui success message'>
              <div className='header'>Thanks!</div>
              <p>
                Ihre Daten wurden Erfolgreich übermittelt und werden auf der Seite veröffentlicht:{' '}
                <Link to='/'>{' '}{data.site.siteMetadata.title}
                </Link>{' '}
                Sobald die Redaktion den Eintrag freigeschaltet hat.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className='ui vertical segment'>
        <div className='ui text container formcontainer'>
          <h2>Was passiert mit meinen Daten?</h2>
          Das Bürgernetz wird Ihre Daten auf einer Karte darstellen. Dadurch sieht man in welchen Geschäften man  im Landkreis Pfaffenhofen trotz geschlossener Türen noch virtuell einkaufen kann.<br />
          <h2>Wer kann sich eintragen?</h2>
          Es können sich alle eintragen: vom Pizzaservice, über den Weinhändler, den Bastelladen und viele mehr. Das Bürgernetz behält sich vor, Einträge nicht zu veröffentlichen.
          <h2>Kann ich mich wieder löschen lassen?</h2>
          Das Bürgernetz gibt die erfassten Daten weder intern noch extern an Dritte weiter. Die Daten werden nur für diese Website und diese Karte verwendet. Falls die Redaktion Ihren Eintrag löschen soll, schreiben Sie eine E-Mail an{' '}
          <a
            href='mailto:liefert@pfaffenhofen.de'
          >
            liefert@pfaffenhofen.de
          </a>
          Andernfalls werden Ihre Daten gelöscht, sobald diese Karte nicht mehr benötigt wird.
        </div>
      </div>
    </div>
  )
}
