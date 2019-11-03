import React, { Suspense, lazy } from 'react'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Loading from './components/Loading'

const Employee = lazy(() => import('./pages/Employee'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/employee" component={Employee} />
          <Route render={() => <Redirect to="/employee" />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
