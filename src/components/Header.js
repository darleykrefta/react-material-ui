import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const Header = ({ onAction, textAction, title }) => {
  const classes = useStyles()

  return (
    <Card>
      <CardContent>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Button variant="contained" color="primary" className={classes.button} onClick={() => onAction()}>
            <AddIcon />
            {textAction}
          </Button>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Header
