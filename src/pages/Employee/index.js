import React, { Suspense, lazy } from 'react'

import { Switch, Route } from 'react-router-dom'

import Loading from '../../components/Loading'

const Employee = lazy(() => import('./Employee'))
const EmployeeForm = lazy(() => import('./EmployeeForm'))

const Admin = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/employee" exact component={Employee} />
        <Route
          path="/employee/create"
          render={() => (
            <>
              <Employee />
              <EmployeeForm />
            </>
          )}
        />
        <Route
          path="/employee/edit/:id"
          render={() => (
            <>
              <Employee />
              <EmployeeForm />
            </>
          )}
        />
      </Switch>
    </Suspense>
  )
}

export default Admin
