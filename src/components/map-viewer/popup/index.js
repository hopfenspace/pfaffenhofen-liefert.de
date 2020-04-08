import React from 'react'
import './styles.scss'
import 'semantic-ui-css/components/label.css'
import 'semantic-ui-css/components/header.css'
import categories from '../../../components/categories'
import {urlify, ln2br} from '../../text-utils'

function Popup(props) {
  const cat = categories.find(c => c.ident === props.category)
  return (
    <div className='popup'>
      <div className='badge'>
        <span
          className='colorindicator'
          style={{ backgroundColor: cat.color }}
        />
        <span className='text'>{cat.text}</span>
      </div>
      <span className='clearfix' />

      <h2>Name</h2>
      {props.title}

      <h2>Description</h2>
      {ln2br(props.description)}

      <h2>Contact</h2>
      <span dangerouslySetInnerHTML={{ __html: urlify(props.contact) }} />

      <h2>Address</h2>
      {ln2br(props.address)}
    </div>
  )
}

export default Popup
