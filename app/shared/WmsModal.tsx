
import React, { useState } from 'react'
import { Button, Modal, Fade } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import debounce from 'lodash/debounce'

export function WmsModal(props: any) {
  const {wmsUrl, ...rest} = props

  let wmsLink = wmsUrl + '?service=wms&version=1.3.0&request=GetCapabilities'

  let [copied, setCopied] = useState(false)
  let resetCopied = () => { setCopied(false) }
  let handleCopiedToClipboard = () => {
    setCopied(true)
    debounce(resetCopied, 5000)()
  }

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="wms-modal">

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <i className="fas fa-globe me-3 text-secondary" aria-hidden="true" />
          Get WMS link
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-2">
          <span className="wms-link badge rounded-pill bg-secondary">
            <i className="fas fa-globe me-2" aria-hidden="true" />
            {wmsLink}
          </span>
        </div>

        <div className="copy-to-clipboard mb-5">
          <CopyToClipboard text={wmsLink} onCopy={() => handleCopiedToClipboard()}>
                  <Button variant="danger text-white">
                    <i className="fas fa-copy me-2" aria-hidden="true" />
                    Copy to clipboard
                  </Button>
          </CopyToClipboard>
          <Fade in={copied}>
            <span className="ms-3">
              <i className="fas fa-check-circle text-secondary me-1" aria-hidden="true" />
              Copied! Now paste the link into your GIS client.
            </span>
          </Fade>
        </div>

        <h5 className="text-center font-weight-bold mb-4">
          You can use this link in your GIS client
        </h5>

        <div className="row">
          <div className="col text-center py-3 gutter-line">
            <i className="fas fa-rocket fa-3x text-secondary mb-3" aria-hidden="true" />

            <div>
              How to use WMS <a href="http://www.qgis.org/en/docs" target="_blank">in QGIS</a>
            </div>
          </div>
          <div className="col text-center py-3">
            <div className="">
              <i className="fas fa-globe-americas fa-3x text-secondary mb-3" aria-hidden="true" />            

            </div>
            <div>
              How to use WMS <a href="https://desktop.arcgis.com/en/arcmap/10.3/map/web-maps-and-services/adding-wms-services.htm" target="_blank">in ArcGIS</a>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}><span className="mx-2">OK</span></Button>
      </Modal.Footer>

    </Modal>
  )
}
