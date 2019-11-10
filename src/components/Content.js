import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'

const EmployeeContent = ({ children }) => {
  return (
    <Card>
      <CardContent>
        <Grid item>{children}</Grid>
      </CardContent>
    </Card>
  )
}

export default EmployeeContent
