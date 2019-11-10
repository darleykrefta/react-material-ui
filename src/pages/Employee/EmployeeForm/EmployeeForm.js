import React, { useEffect, useState, useCallback } from 'react'

import { useAsync } from 'react-async'

import { useHistory, useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import { Formik, Field, Form } from 'formik'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TextField } from 'formik-material-ui'

import * as employeeApi from '../../../api/employee'

import * as Yup from 'yup'

const useStyles = makeStyles({
  container: {
    minWidth: '500px'
  }
})

const EmployeeForm = () => {
  const classes = useStyles()

  const history = useHistory()

  let { id } = useParams()

  const [initialValues, setInitialValues] = useState({
    name: '',
    lastname: '',
    email: '',
    pis: ''
  })

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 2 chars long!')
      .max(50, 'Name must be at most 30 chars long!')
      .required('Name is required'),
    lastname: Yup.string()
      .min(2, 'Last name must be at least 2 chars long!')
      .max(50, 'Last name must be at most 30 chars long!')
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid e-mail')
      .required('E-mail is required'),
    pis: Yup.string()
      .matches(/^[0-9]*$/, 'PIS must contain only numbers!')
      .required('PIS is required')
  })

  const onFetchEmployee = id => {
    return employeeApi.getEmployeeById({ id })
  }

  const { data: employee, isLoading, run: fetchEmployee } = useAsync({
    deferFn: onFetchEmployee
  })

  useEffect(
    () => {
      if (id) {
        fetchEmployee(id)
      }
    },
    // eslint-disable-next-line
    [id]
  )

  useEffect(
    () => {
      if (employee) {
        setInitialValues(employee)
      }
    },
    // eslint-disable-next-line
    [employee]
  )

  const handleClose = useCallback(() => {
    return history.goBack()
  }, [history])

  const handleSubmit = useCallback(
    (values, { setSubmitting }) => {
      setSubmitting(true)
      if (values._id) {
        employeeApi
          .putEmployee({ employee: values, id: values._id })
          .then(data => {
            alert(JSON.stringify(data))
            handleClose()
          })
          .catch(err => {
            alert(JSON.stringify(err))
          })
          .finally(_ => {
            setSubmitting(false)
          })
      } else {
        employeeApi
          .postEmployee({ employee: values })
          .then(data => {
            alert(JSON.stringify(data))
            handleClose()
          })
          .catch(err => {
            alert(JSON.stringify(err))
          })
          .finally(_ => {
            setSubmitting(false)
          })
      }
    },
    [handleClose]
  )

  return (
    <>
      <Drawer anchor="right" open={true} onClose={() => handleClose()}>
        {!isLoading && (
          <div className={classes.container}>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {isSubmitting && <LinearProgress />}
                  <Grid container direction="column">
                    <Box p={2}>
                      <Field fullWidth type="text" label="Name" name="name" component={TextField} />
                    </Box>
                    <Box p={2}>
                      <Field fullWidth type="text" label="Last name" name="lastname" component={TextField} />
                    </Box>
                    <Box p={2}>
                      <Field fullWidth type="email" label="E-mail" name="email" component={TextField} />
                    </Box>
                    <Box p={2}>
                      <Field fullWidth type="text" label="PIS" name="pis" component={TextField} />
                    </Box>
                    <Box p={2}>
                      <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        Submit
                      </Button>
                    </Box>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </Drawer>
    </>
  )
}

export default EmployeeForm
