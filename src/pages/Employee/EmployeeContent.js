import React from 'react'

import { useAsync } from 'react-async'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import * as employeeApi from '../../api/employee'

import Loading from '../../components/Loading'

const EmployeeContent = () => {
  const { data: dataEmployees = [], isPending } = useAsync(employeeApi.getEmployees)

  return (
    <Card>
      <CardContent>
        <Grid item>
          {isPending && <Loading />}
          {!isPending && dataEmployees.length !== 0 && (
            <List>
              {dataEmployees.map(employee => (
                <ListItem>
                  <ListItemText primary={`${employee.name} ${employee.lastname}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EmployeeContent
