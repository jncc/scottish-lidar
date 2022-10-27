
import oglImageUrl from '../../assets/licences/ogl.png'

export type Licence =
  | 'unknown'
  | 'oglv3'
  | 'ncgl'

function getLicenceDetails(licence: Licence) {

  switch (licence) {
    case 'unknown' : return {
      name:  'UNKNOWN',
      image: '',
      url: ''
    }
    case 'oglv3' : return {
      name: 'Open Government Licence v3',
      image: oglImageUrl,
      url: 'http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'
    }
    case 'ncgl' : return {
      name: 'Non-Commercial Government Licence',
      image: '',
      url: 'https://www.nationalarchives.gov.uk/doc/non-commercial-government-licence/version/2/'
    }
  }
}

export function getLicenceDetailsFromUseConstraints(s: string) {

  let licence: Licence = 'unknown'

  if (s.indexOf('Open Government Licence v3') !== -1) {
    licence = 'oglv3'
  }

  if (s.indexOf('Non-Commercial Government Licence') !== -1) {
    licence = 'ncgl'
  }

  return getLicenceDetails(licence)
}
