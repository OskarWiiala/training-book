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

  const inRange = (x, min, max) => {
    return (x - min) * (x - max) <= 0
  }

  useEffect(() => {
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
        loadData = JSON.parse(JSON.stringify(pages1to10))
        break
    }
    setPageInfo(loadData)
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
          overflowWrap: 'break-word',
          pt: '15px',
          pb: '15px',
          pl: '15px',
          pr: '15px',
          width: { xs: '90vw', sm: '75%', md: '67%', lg: '60%' },
          textAlign: 'left'
        }}
      >
        {pageInfo.map((page) => {
          const objectKeys = Object.keys(page)
          const objectValues = Object.values(page)
          let counter = 0

          return (
            page.page === currentPage &&
            objectKeys.map((key) => {
              counter++
              if (key.includes('paragraph')) {
                return (
                  <Typography key={key} sx={{ pt: '5px', pb: '5px' }}>
                    {objectValues[counter - 1]}
                  </Typography>
                )
              } else if (key.includes('title')) {
                return (
                  <Typography
                    key={key}
                    variant='h2'
                    sx={{ pt: '5px', pb: '5px' }}
                  >
                    {objectValues[counter - 1]}
                  </Typography>
                )
              } else if (key.includes('graph')) {
                return (
                  <Typography key={key} sx={{ pt: '5px', pb: '5px' }}>
                    Insert graph here
                  </Typography>
                )
              } else if (key.includes('image')) {
                return (
                  <Box key={key}
                    component='img'
                    sx={{
                      pt: '5px',
                      pb: '5px'
                    }}
                    alt='The house from the offer.'
                    src={objectValues[counter - 1]}
                  />
                )
              } else return <></>
            })
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
