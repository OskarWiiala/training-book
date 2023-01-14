import React from 'react'
import { Typography, Box, Pagination } from '@mui/material'

const Book = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        pt: '10vh',
        pb: '25px',
        height: '95vh'
      }}
    >
      <Box sx={{ overflowY: 'auto', pt: '15px', pb: '15px', width: '90vw', textAlign: 'center' }}>
        <Typography>Title</Typography>
        <Typography>Para1</Typography>
        <Typography>Para2</Typography>
        <Typography>Para3</Typography>
        <Typography>Para4</Typography>
        <Typography>Para5</Typography>
        <Typography>Title</Typography>
        <Typography>Para1</Typography>
        <Typography>Para2</Typography>
        <Typography>Para3</Typography>
        <Typography>Para4</Typography>
        <Typography>Para5</Typography>
        <Typography>Title</Typography>
        <Typography>Para1</Typography>
        <Typography>Para2</Typography>
        <Typography>Para3</Typography>
        <Typography>Para4</Typography>
        <Typography>Para5</Typography>
        <Typography>Title</Typography>
        <Typography>Para1</Typography>
        <Typography>Para2</Typography>
        <Typography>Para3</Typography>
        <Typography>Para4</Typography>
        <Typography>Para5</Typography>
        <Typography>Title</Typography>
        <Typography>Para1</Typography>
        <Typography>Para2</Typography>
        <Typography>Para3</Typography>
        <Typography>Para4</Typography>
        <Typography>Para5</Typography>
      </Box>

      <Pagination
        count={20}
        color='primary'
        sx={{ position: 'absolute', bottom: '30px' }}
      />
    </Box>
  )
}

export default Book
