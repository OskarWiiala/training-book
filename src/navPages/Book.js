import React, { useState, useEffect } from 'react'
import { Box, Pagination, Typography, Alert, Snackbar } from '@mui/material'
import pages1to10 from '../pages/pages1to10.json'
import pages11to20 from '../pages/pages11to20.json'
import Graph from '../components/Graph'

/**
 * @author Oskar Wiiala
 * This component is used as the page where the book is placed. You can read, change pages and bookmark paragraphs
 * @returns Book component
 */
const Book = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageInfo, setPageInfo] = useState([])

  // Used for opening/closing success and error alerts
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState(false)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    // scrolls to current bookmark. Is only supposed to occur when navigating here from Bookmarks.js
    // has timeout due to elements needing to be initialized before calling the scrollIntoView() function.
    setTimeout(() => {
      const id = localStorage.getItem('currentBookmark')
      if (id) {
        const element = document.getElementById(id)
        const executeScroll = () => element.scrollIntoView()
        executeScroll()
      }
    }, 300)

    // current bookmark is removed to prevent scrolling back to bookmark when refreshing page.
    setTimeout(() => {
      localStorage.removeItem('currentBookmark')
    }, 1000)
  }, [])

  /**
   * Handles bookmarking operations such as a confirm popup, setting bookmark to localStorage and opening success/error alert
   * @param {object} data includes page and paragraph
   */
  const handleBookmarking = (data) => {
    console.log(data)
    if (confirm('Bookmark this paragraph?') === true) {
      try {
        const localStorage1 = Object.keys(localStorage)
        let localStorageLength = 0
        localStorage1.map((element) => {
          if (element.includes('bookmark')) {
            localStorageLength++
          }
          return element
        })
        localStorage.setItem(
          `bookmark${localStorageLength + 1}`,
          JSON.stringify(data)
        )
        setOpenSuccess(true)
      } catch (e) {
        setOpenError(true)
        console.log('bookmarking failed:', e)
      }
    }
  }

  // handles closing of success/error alerts
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccess(false)
    setOpenError(false)
  }

  // Checks the range of a number. Is used in determining if the current page is in a range of numbers.
  const inRange = (x, min, max) => {
    return (x - min) * (x - max) <= 0
  }

  // determines what page it is and loads the correct JSON file based on the result
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
        <Snackbar
          open={openSuccess}
          autoHideDuration={4500}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity='success'
            variant='filled'
            sx={{ width: '100%' }}
          >
            Bookmark was successful
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={4500}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity='error'
            variant='filled'
            sx={{ width: '100%' }}
          >
            Bookmark failed
          </Alert>
        </Snackbar>
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
                  <Typography
                    id={key}
                    key={key}
                    onDoubleClick={() => {
                      handleBookmarking({
                        page: currentPage,
                        paragraph: key
                      })
                    }}
                    sx={{ pt: '5px', pb: '5px' }}
                    variant='body1'
                    dangerouslySetInnerHTML={{
                      __html: objectValues[counter - 1]
                    }}
                  />
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
                const data = []
                let myCounter = 0
                objectValues[counter - 1].forEach((element) => {
                  data.push({
                    value: objectValues[counter - 1][myCounter],
                    session: myCounter
                  })
                  myCounter++
                })
                return <Graph key={key} data={data} />
              } else if (key.includes('image')) {
                return (
                  <Box
                    key={key}
                    component='img'
                    sx={{
                      pt: '5px',
                      pb: '5px',
                      width: objectValues[counter - 1].width,
                      height: objectValues[counter - 1].height
                    }}
                    alt={objectValues[counter - 1].alt}
                    src={objectValues[counter - 1].src}
                  />
                )
              } else return <Box key={key} />
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
