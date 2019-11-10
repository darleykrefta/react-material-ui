import React, { useCallback, useEffect } from 'react'

import { useHistory, useLocation } from 'react-router-dom'
import { useAsync } from 'react-async'

import Box from '@material-ui/core/Box'

import Content from '../../components/Content'
import ContainerBox from '../../components/ContainerBox'
import Header from '../../components/Header'

import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import Loading from '../../components/Loading'

import * as employeeApi from '../../api/employee'

const Employee = () => {
  const history = useHistory()

  const location = useLocation()

  const onFetchEmployees = () => {
    return employeeApi.getEmployees()
  }

  const { data: dataEmployees = [], isPending, run: fetchEmployees } = useAsync({
    deferFn: onFetchEmployees
  })

  useEffect(
    () => {
      fetchEmployees()
    },
    // eslint-disable-next-line
    [location]
  )

  const handleAdd = useCallback(() => {
    history.push(`/employee/create`)
  }, [history])

  const handleEdit = useCallback(
    id => {
      history.push(`/employee/edit/${id}`)
    },
    [history]
  )

  const handleDelete = useCallback(
    id => {
      employeeApi
        .deleteEmployee({ id })
        .then(data => {
          fetchEmployees()
        })
        .catch(err => {
          console.log('erro ao deletar')
        })
    },
    [fetchEmployees]
  )

  return (
    <ContainerBox maxWidth="md">
      <Box mt={2}>
        <Header onAction={handleAdd} textAction="add" title="Employees" />
        <Content>
          {isPending && <Loading />}
          {!isPending && dataEmployees.length !== 0 && (
            <List>
              {dataEmployees.map((employee, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${employee.name} ${employee.lastname}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(employee._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(employee._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </Content>
      </Box>
    </ContainerBox>
  )
}

export default Employee
