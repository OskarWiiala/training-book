import React from 'react'
import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField
} from '@mui/material'
import PropTypes from 'prop-types'

const BookmarkDialog = ({
  isOpenDialog,
  handleAlert,
  data,
  handleCloseDialog
}) => {
  let noteText = ''

  const handleTextFieldChange = (event) => {
    noteText = event.target.value
  }
  /**
   * Handles bookmarking operations such as a confirm popup, setting bookmark to localStorage and opening success/error alert
   * @param {object} data includes page, paragraph and preview
   */
  const handleBookmarking = () => {
    const newData = {
      ...data,
      note: noteText
    }
    handleCloseDialog()
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
        JSON.stringify(newData)
      )
      handleAlert(true, false)
    } catch (e) {
      handleAlert(false, true)
      console.log('bookmarking failed:', e)
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
          Bookmark this paragraph?
        </DialogTitle>
        <TextField
          sx={{ ml: '10px', mr: '10px' }}
          margin='normal'
          id='note'
          label='Note'
          placeholder='Add note (optional)'
          type='text'
          variant='standard'
          onChange={handleTextFieldChange}
        />
        <DialogActions>
          <Button variant='contained' onClick={handleBookmarking}>Ok</Button>
          <Button variant='outlined' onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

BookmarkDialog.propTypes = {
  isOpenDialog: PropTypes.bool,
  handleAlert: PropTypes.func,
  data: PropTypes.object,
  handleCloseDialog: PropTypes.func
}

export default BookmarkDialog
