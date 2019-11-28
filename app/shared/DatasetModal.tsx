
import React, { useState } from 'react'
import { Button, Modal, Fade } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import debounce from 'lodash/debounce'

export function DatasetModal(props: any) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="dataset-modal">

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <i className="fas fa-globe mr-3 text-secondary" />
          About this dataset
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <h5 className="text-center font-weight-bold mb-4">
          You can use this link in your GIS client
        </h5>

        <div className="row">
          <div className="col text-center py-3 gutter-line">
            <i className="fas fa-rocket fa-3x text-secondary mb-3" />

            <div>
              How to use WMS <a href="http://www.qgis.org/en/docs" target="_blank">in QGIS</a>
            </div>
          </div>
          <div className="col text-center py-3">
            <div className="">
              <i className="fas fa-globe-americas fa-3x text-secondary mb-3" />            

            </div>
            <div>
              How to use WMS <a href="https://www.arcgis.com/features/index.html" target="_blank">in ArcGIS</a>
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
