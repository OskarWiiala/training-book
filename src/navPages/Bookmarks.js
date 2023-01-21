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
import DeleteDialog from '../components/DeleteDialog'

/**
 * @author Oskar Wiiala
 * This component is used as the Bookmarks page.
 * This component is used to display/view/delete bookmarks
 * Viewing bookmarks takes you to the Book component, switches to the correct page and scrolls down to the correct paragraph
 * @returns Bookmarks component
 */
const Bookmarks = () => {
  const allBookmarks = Object.entries(localStorage)
  const hasBookmarks = JSON.stringify(allBookmarks).includes('bookmark')
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [deleteDialogType, setDeleteDialogType] = useState('')
  const [bookmarkKey, setBookmarkKey] = useState('')

  const navigate = useNavigate()

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false)
  }

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
          pl: '15px',
          pr: '15px',
          width: {
            xs: '80vw',
            sm: '80vw',
            m: '70vw',
            l: '60vw',
            xl: '55vw'
          }
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
            Bookmark deletion failed
          </Alert>
        </Snackbar>
        {hasBookmarks &&
          allBookmarks.map((element) => {
            if (element[0].includes('bookmark')) {
              const object = JSON.parse(localStorage.getItem(element[0]))
              const page = object.page
              const paragraph = object.paragraph
              const preview = object.preview
              const note = object.note
              const key = element[0]
              return (
                <Card
                  key={key}
                  sx={{
                    width: '100%',
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
                      <Typography variant='h6'>page: {page}</Typography>
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: preview
                        }}
                      />
                      {note.length > 0 && (
                        <Typography sx={{ pt: '3px', fontStyle: 'italic' }}>
                          Note: {note}
                        </Typography>
                      )}
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
                          setBookmarkKey(key.toString())
                          setDialogTitle('Delete this bookmark?')
                          setDeleteDialogType('single')
                          setOpenDeleteDialog(true)
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
        {!hasBookmarks && (
          <Typography>
            You have no bookmarks. You can add bookmarks by double-clicking on
            any paragraph while reading.
          </Typography>
        )}
        <DeleteDialog
          title={dialogTitle}
          type={deleteDialogType}
          bookmarkKey={bookmarkKey}
          setOpenSuccess={setOpenSuccess}
          setOpenError={setOpenError}
          handleCloseDialog={handleCloseDialog}
          isOpenDialog={openDeleteDialog}
        />
      </Box>
      {hasBookmarks && (
        <Button
          variant='contained'
          onClick={() => {
            setDialogTitle('Delete all bookmarks?')
            setDeleteDialogType('all')
            setOpenDeleteDialog(true)
          }}
        >
          Delete all
        </Button>
      )}
    </Box>
  )
}

export default Bookmarks
