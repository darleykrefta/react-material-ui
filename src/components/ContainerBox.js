import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

const ContainerBox = ({ children, ...props }) => {
  return (
    <>
      <CssBaseline />
      <Container {...props}>{children}</Container>
    </>
  )
}

export default ContainerBox
