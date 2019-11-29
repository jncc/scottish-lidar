
import React, { useState } from 'react'
import { Button, Modal, Fade } from 'react-bootstrap'
import { Collection } from '../catalog/types'
import { DatasetPath } from './DatasetPath'
import { DatasetLicenceAndMetadataButtons } from './DatasetLicenceAndMetadataButtons'

export function DatasetModal(props: any) {

  let c: Collection = props.collection

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="dataset-modal">

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <i className="fas fa-info-circle mr-3 text-secondary" />
          About this dataset
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <div>
          <h5>
            <i className="fas fa-th text-primary mr-2" />
            {c.metadata.title}
          </h5>
          <div className="mb-2">
            <DatasetPath dataset={props.path.dataset} />
          </div>
          <div className="mb-3">{c.metadata.abstract}</div>

          <DatasetLicenceAndMetadataButtons collection={props.collection} />

        </div>
      
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}><span className="mx-2">OK</span></Button>
      </Modal.Footer>

    </Modal>
  )
}
