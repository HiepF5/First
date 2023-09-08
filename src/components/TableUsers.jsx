import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { fetchAllUser } from '../service/UserService'
import ReactPaginate from 'react-paginate'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalAddNew from './ModalAddNew'
import ModalEdit from './ModalEdit'
import ModalConfirm from './ModalConfirm'
import down from '../assets/down.svg'
import up from '../assets/up.svg'
import './TableUsers.scss'
import _, { includes } from 'lodash'
import { debounce } from 'lodash'
function TableUsers() {
  const [listUsers, setListUsers] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
  const [isShowModalEdit, setIsShowModalEdit] = useState(false)
  const [dataUserEdit, setDataUserEdit] = useState({})
  const [dataUserDelete, setDataUserDelete] = useState({})
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [sortBy, setSortBy] = useState('asc')
  const [sortField, setSortField] = useState('id')
  const [keyword, setKeyWord] = useState('')
  useEffect(() => {
    getUsers(1)
  }, [])
  const getUsers = async (page) => {
    let res = await fetchAllUser(page)
    if (res && res.data) {
      setListUsers(res.data)
      setTotalUsers(res.total)
      setTotalPages(res.total_pages)
    }
  }
  const handlePageClick = (event) => {
    console.log(event)
    getUsers(+event.selected + 1)
  }
  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers])
  }
  const handleEditUser = (user) => {
    setDataUserEdit(user)
    setIsShowModalEdit(true)
  }
  const handleDeleteUser = (user) => {
    setDataUserDelete(user)
    setIsShowModalDelete(true)
  }
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy)
    setSortField(sortField)
    let cloneListUsers = _.cloneDeep(listUsers)
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
    setListUsers(cloneListUsers)
  }
  const handleSearch = debounce((e) => {
    let term = e.target.value
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers)
      cloneListUsers = cloneListUsers.filter((item) => item.email.includes(term))
      setListUsers(cloneListUsers)
    } else {
      getUsers(1)
    }
  }, 500)
  return (
    <>
      <div className='my-3 d-flex justify-content-between'>
        <span>
          <b>List User</b>
        </span>
        <button
          className='btn btn-success'
          onClick={() => {
            setIsShowModalAddNew(true)
          }}
        >
          Add new user
        </button>
      </div>
      <div>
        <input
          placeholder='Search'
          className='col-4 my-3'
          // value={keyword}
          onChange={(e) => {
            handleSearch(e)
          }}
        />
        <button>Search</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className='sort_header'>
                ID
                <span>
                  <img style={{ height: '1.25rem' }} src={down} onClick={() => handleSort('desc', 'id')} />
                  <img style={{ height: '1.25rem' }} src={up} onClick={() => handleSort('asc', 'id')} />
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className='sort_header'>
                First Name
                <span>
                  <img style={{ height: '1.25rem' }} src={down} onClick={() => handleSort('desc', 'first_name')} />
                  <img style={{ height: '1.25rem' }} src={up} onClick={() => handleSort('asc', 'first_name')} />
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <th>
                <button className='btn btn-warning mx-3' onClick={() => handleEditUser(item)}>
                  Edit
                </button>
                <button className='btn btn-danger' onClick={() => handleDeleteUser(item)}>
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel='...'
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel='< previous'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
      />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleShow={() => setIsShowModalAddNew(false)}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEdit show={isShowModalEdit} handleShow={() => setIsShowModalEdit(false)} user={dataUserEdit} />
      <ModalConfirm show={isShowModalDelete} handleShow={() => setIsShowModalDelete(false)} user={dataUserDelete} />
    </>
  )
}

export default TableUsers
