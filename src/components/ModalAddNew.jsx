import axios from 'axios'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { fetchPostUser } from '../service/UserService'
import { toast } from 'react-toastify'

const ModalAddNew = ({ show, handleShow, handleUpdateTable }) => {
  const [name, setName] = useState('')
  const [job, setJob] = useState('')
  const handleSubmitUser = async () => {
    let user = {
      name: name,
      job: job
    }
    let res = await fetchPostUser(user)
    console.log(res)
    if (res && res.id) {
      handleShow()
      toast.success('Success!')
      setName('')
      setJob('')
      handleUpdateTable({ first_name: name, id: res.id })
    } else {
      toast.error('Error!')
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleShow} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
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
          <Button variant='primary' onClick={handleSubmitUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalAddNew
