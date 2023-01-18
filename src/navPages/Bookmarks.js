import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  Snackbar
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import IconButton from '@mui/material/IconButton'

/**
 * @author Oskar Wiiala
 * This component is used as the Bookmarks page.
 * This component is used to display/view/delete bookmarks
 * Viewing bookmarks takes you to the Book component, switches to the correct page and scrolls down to the correct paragraph
 * @returns Bookmarks component
 */
const Bookmarks = () => {
  const allBookmarks = Object.entries(localStorage)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState(false)
  const navigate = useNavigate()

  // handles closing of success/error alerts
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccess(false)
    setOpenError(false)
  }

  /**
   * Stores page and paragraph data in localStorage and navigates to book page
   * The data in localStorage is used by Book component to choose correct page and scroll down to correct paragraph
   * @param {object} data should only contain page and paragraph key values
   */
  const viewBookmark = (data) => {
    const stringifiedData = JSON.stringify(data)
    localStorage.setItem('currentBookmark', stringifiedData)
    navigate('/book')
  }

  const deleteAllBookmarks = () => {
    if (confirm('are you sure you want to delete all bookmarks?') === true) {
      try {
        const objectKeys = Object.keys(localStorage)
        objectKeys.map((key) => {
          if (key.includes('bookmark') || key.includes('currentBookmark')) {
            localStorage.removeItem(key)
          }
          return 0
        })
        setOpenSuccess(true)
      } catch (e) {
        setOpenError(true)
      }
    }
  }

  const deleteBookmark = (key) => {
    if (confirm('are you sure you want to delete this bookmark?') === true) {
      try {
        localStorage.removeItem(key)
        setOpenSuccess(true)
      } catch (e) {
        setOpenError(true)
      }
    }
  }

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
          Bookmark deletion successful
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={4500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity='error'
          variant='filled'
          sx={{ width: '100%' }}
        >
          Bookmark deletion failed
        </Alert>
      </Snackbar>
      {allBookmarks.map((element) => {
        if (element[0].includes('bookmark')) {
          const object = JSON.parse(localStorage.getItem(element[0]))
          const page = object.page
          const paragraph = object.paragraph
          return (
            <Card
              key={element[0]}
              sx={{
                width: {
                  xs: '80vw',
                  sm: '80vw',
                  m: '70vw',
                  l: '60vw',
                  xl: '55vw'
                },
                mt: '5px',
                mb: '5px'
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  <Typography>{element[0]}</Typography>
                  <Typography>page: {page}</Typography>
                  <Typography>{paragraph}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <IconButton
                    sx={{ mt: '3px', mb: '3px' }}
                    onClick={() => viewBookmark({ page, paragraph })}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    sx={{ mt: '3px', mb: '3px' }}
                    onClick={() => {
                      deleteBookmark(element[0])
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          )
        } else return <Box key={element[0]}></Box>
      })}
      <Button variant='contained' onClick={deleteAllBookmarks}>
        Delete all
      </Button>
    </Box>
  )
}

export default Bookmarks
