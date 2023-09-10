import './App.scss'
import Header from './components/Header'
import Home from './components/Home'
import TableUsers from './components/TableUsers'
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function App() {
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
          </Switch>
        </Container>
      </Router>
    </>
  )
}

export default App
