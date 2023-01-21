import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material'

const DeleteDialog = ({ title, type, setOpenSuccess, setOpenError, handleCloseDialog, isOpenDialog, bookmarkKey }) => {
  const handleBookmarkDeletion = () => {
    if (type === 'single') {
      try {
        localStorage.removeItem(bookmarkKey)
        setOpenSuccess(true)
        handleCloseDialog()
      } catch (e) {
        setOpenError(true)
        handleCloseDialog()
      }
    } else if (type === 'all') {
      try {
        const objectKeys = Object.keys(localStorage)
        objectKeys.map((key) => {
          if (key.includes('bookmark') || key.includes('currentBookmark')) {
            localStorage.removeItem(key)
          }
          return 0
        })
        setOpenSuccess(true)
        handleCloseDialog()
      } catch (e) {
        setOpenError(true)
        handleCloseDialog()
      }
    }
  }

  return (
    <Box>
      <Dialog
        open={isOpenDialog}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {title}
        </DialogTitle>
        <DialogActions>
          <Button variant='contained' onClick={handleBookmarkDeletion}>
            Accept
          </Button>
          <Button variant='outlined' onClick={handleCloseDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

DeleteDialog.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  setOpenSuccess: PropTypes.func,
  setOpenError: PropTypes.func,
  handleCloseDialog: PropTypes.func,
  isOpenDialog: PropTypes.bool,
  bookmarkKey: PropTypes.string
}

export default DeleteDialog
