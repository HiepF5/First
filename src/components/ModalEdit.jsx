import axios from 'axios'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { fetchPostUser } from '../service/UserService'
import { toast } from 'react-toastify'

const ModalEdit = ({ show, handleShow, user }) => {
  const [name, setName] = useState(user.first_name)
  const [job, setJob] = useState(user.first_name)
  const handleEditUser = () => {
    handleShow()
  }
  return (
    <>
      <Modal show={show} onHide={handleShow} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='mb-3'>
              <label className='form-label'>Name</label>
              <input type='text' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Job</label>
              <input type='text' className='form-control' value={job} onChange={(e) => setJob(e.target.value)} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleShow}>
            Close
          </Button>
          <Button variant='primary' onClick={handleEditUser}>
            Confirm Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalEdit
