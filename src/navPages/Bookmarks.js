import { Box, Typography, Button, Card, CardContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import IconButton from '@mui/material/IconButton'

const Bookmarks = () => {
  const allBookmarks = Object.entries(localStorage)
  const [test, setTest] = useState(0)

  const deleteAllBookmarks = () => {
    if (confirm('are you sure you want to delete all bookmarks?') === true) {
      const objectKeys = Object.keys(localStorage)
      objectKeys.map((key) => {
        if (key.includes('bookmark')) localStorage.removeItem(key)
        return 0
      })
      setTest(1)
    }
  }

  const deleteBookmark = (key) => {
    if (confirm('are you sure you want to delete this bookmark?') === true) {
      localStorage.removeItem(key)
      setTest(2)
    }
  }

  useEffect(() => {
  }, [test])

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
                  <IconButton sx={{ mt: '3px', mb: '3px' }}>
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
