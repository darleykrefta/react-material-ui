import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import ContainerBox from './ContainerBox'

const Loading = () => {
  return (
    <ContainerBox>
      <Grid container justify="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <CircularProgress />
      </Grid>
    </ContainerBox>
  )
}

export default Loading
