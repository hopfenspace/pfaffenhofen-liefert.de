import React from 'react'

export function escapehtml(s) {
  return s.replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function urlify(inputText) {
  let replacedText = escapehtml(inputText)

  // URLs starting with http://, https://, or ftp://
  const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim
  replacedText = replacedText.replace(
    replacePattern1,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  )

  // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  const replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank" rel="noopener noreferrer">$2</a>'
  )

  // Change email addresses to mailto:: links.
  const replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_-]+?(\.[a-zA-Z]{2,6})+)/gim
  replacedText = replacedText.replace(
    replacePattern3,
    '<a href="mailto:$1" rel="noopener noreferrer">$1</a>'
  )

  replacedText = replacedText.replace(/\n/g, '<br />')

  return replacedText
};

export function ln2br(text) {
  return (
    <span dangerouslySetInnerHTML={{ __html: escapehtml(text).replace(/\n/g, '<br />') }} />
  )
};
