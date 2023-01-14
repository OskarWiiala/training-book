import React from 'react'
import { Box, Card, CardContent, CardMedia, CardHeader, Typography } from '@mui/material'
import icon from '../images/self_portrait.jpg'

/**
 * Page displaying data about this website
 */

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
        overflow: 'auto',
        paddingBottom: '10px'
      }}
    >
      <Card sx={{ width: { xs: '90%', sm: '65%', md: '50%', lg: '40%' }, mt: '100px' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardMedia
            component='img'
            image={icon}
            alt={'profile picture'}
            sx={{ width: '100px', height: '100px', borderRadius: 400 / 2 }}
          />
          <CardHeader sx={{ justifyContent: 'center' }} title={'Oskar Wiiala'}/>
        </CardContent>
        <CardContent>
          <Typography>This book is going to be about developing strength and hypertrophy. After reading this book you should understand training best practices, what makes a program good and nunances of training. It will <b>also</b> help motivate you into long-term lifting.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Home
