import axios from 'axios'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { fetchDeleteUser } from '../service/UserService'
import { toast } from 'react-toastify'

const ModalConfirm = ({ show, handleShow, user }) => {
  const confirmDelete = async () => {
    console.log('delete')
    let res = await fetchDeleteUser(user.id)
    handleShow()
    console.log(user.id)
  }
  return (
    <>
      <Modal show={show} onHide={handleShow} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Are you sure you want to delete this user?</p>
            {user.first_name}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleShow}>
            Close
          </Button>
          <Button variant='primary' onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalConfirm
