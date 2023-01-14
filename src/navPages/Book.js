import React, { useState, useEffect } from 'react'
import { Box, Pagination, Typography } from '@mui/material'
import pages1to10 from '../pages/pages1to10.json'
import pages11to20 from '../pages/pages11to20.json'

const Book = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageInfo, setPageInfo] = useState([])

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  function inRange (x, min, max) {
    return (x - min) * (x - max) <= 0
  }

  useEffect(() => {
    console.log('page:', currentPage)
    let loadData = JSON.parse(JSON.stringify(pages1to10))

    // is there a better way of doing this?
    switch (true) {
      case inRange(currentPage, 1, 10):
        loadData = JSON.parse(JSON.stringify(pages1to10))
        break
      case inRange(currentPage, 11, 20):
        loadData = JSON.parse(JSON.stringify(pages11to20))
        break
      default:
        console.log('defaulted')
        loadData = JSON.parse(JSON.stringify(pages1to10))
        break
    }
    console.log('loadData', loadData)
    setPageInfo(loadData)
    console.log('pageInfo', pageInfo)
  }, [currentPage])

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
      <Box
        sx={{
          overflowY: 'auto',
          pt: '15px',
          pb: '15px',
          width: '90vw',
          textAlign: 'center'
        }}
      >
        {pageInfo.map((page) => {
          return (
            page.page === currentPage &&
            page.paragraphs.map((paragraph) => (
              <Typography key={paragraph}>{paragraph}</Typography>
            ))
          )
        })}
      </Box>

      <Pagination
        count={20}
        color='primary'
        page={currentPage}
        onChange={handlePageChange}
        sx={{ position: 'absolute', bottom: '30px' }}
      />
    </Box>
  )
}

export default Book
