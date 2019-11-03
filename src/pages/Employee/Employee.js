import React from 'react'

import ContainerBox from '../../components/ContainerBox'
import EmployeeHeader from './EmployeeHeader'
import EmployeeContent from './EmployeeContent'
import Box from '@material-ui/core/Box'

const Employee = () => {
  return (
    <ContainerBox maxWidth="md">
      <Box mt={2}>
        <EmployeeHeader handleAdd={() => console.log('add employee')} />
        <EmployeeContent />
      </Box>
    </ContainerBox>
  )
}

export default Employee
