import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { fetchAllUser } from '../service/UserService'
import ReactPaginate from 'react-paginate'
import ModalAddNew from './ModalAddNew'
import ModalEdit from './ModalEdit'
import ModalConfirm from './ModalConfirm'
import down from '../assets/down.svg'
import up from '../assets/up.svg'
import plus from '../assets/plus.svg'
import save from '../assets/save.svg'
import import_ex from '../assets/import.svg'
import './TableUsers.scss'
import _, { includes } from 'lodash'
import { debounce } from 'lodash'
import { CSVLink, CSVDownload } from 'react-csv'
import papa from 'papaparse'
import { toast } from 'react-toastify'
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
  const [dataExport, setDataExport] = useState([])
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
  const getUsersExport = (event, done) => {
    let result = []
    if (listUsers && listUsers.length > 0) {
      result.push(['Id', 'Email', 'First Name', 'Last Name'])
      listUsers.map((item, index) => {
        let arr = []
        arr[0] = item.id
        arr[1] = item.email
        arr[2] = item.first_name
        arr[3] = item.last_name
        result.push(arr)
      })
      setDataExport(result)
      done()
    }
  }
  const csvData = [
    ['firstname', 'lastname', 'email'],
    ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
    ['Raed', 'Labes', 'rl@smthing.co.com'],
    ['Yezzi', 'Min l3b', 'ymin@cocococo.com']
  ]
  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0]
      if (file.type !== 'text/csv') {
        toast.error('Please upload a csv file')
        return
      }
      papa.parse(file, {
        complete: function (result) {
          let rawCSV = result.data
          console.log(rawCSV[0][1], rawCSV[0][2])
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (rawCSV[0][0] !== 'email' || rawCSV[0][1] !== 'first_name' || rawCSV[0][2] !== 'last_name') {
                toast.error('Please upload format Header csv file')
                return
              } else {
                let result = []
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let arr = {}
                    arr.email = item[0]
                    arr.first_name = item[1]
                    arr.last_name = item[2]
                    result.push(arr)
                    console.log(result)
                  }
                })
                setListUsers(result)
              }
            } else {
              toast.error('Please format csv file')
            }
          } else {
            toast.error('Not found data csv file')
          }
        }
      })
    }
  }
  return (
    <>
      <div className='my-3 d-flex justify-content-between'>
        <span>
          <b>List User</b>
        </span>
        <div>
          <label htmlFor='import_ex' className='btn btn-warning'>
            <img style={{ height: '1.25rem', marginBottom: '4px', marginRight: '6px' }} src={import_ex} />
            Import
          </label>
          <input type='file' hidden id='import_ex' onChange={(event) => handleImportCSV(event)} />

          <CSVLink
            data={dataExport}
            filename={'my-file.csv'}
            target='_blank'
            className='btn btn-primary m-2'
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <img style={{ height: '1.25rem', marginBottom: '4px', marginRight: '6px' }} src={save} />
            Export
          </CSVLink>
          <button
            className='btn btn-success'
            onClick={() => {
              setIsShowModalAddNew(true)
            }}
          >
            <img style={{ height: '1.25rem' }} src={plus} />
            Add new user
          </button>
        </div>
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
            <tr key={index}>
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
