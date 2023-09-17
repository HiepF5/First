import './App.scss'
import Header from './components/Header'
import Home from './components/Home'
import TableUsers from './components/TableUsers'
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'

function App() {
  const dataUserRedux = useSelector((state) => state.user.account)
  console.log('check>>: ', dataUserRedux)
  return (
    <>
      <Router>
        <Container>
          <Header />
          <Switch>
            <Route exact path='/home'>
              <Home />
            </Route>
            <Route path='/users'>
              <TableUsers />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
          </Switch>
        </Container>
      </Router>
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
    </>
  )
}

export default App
