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
      <Card sx={{ width: { xs: '90%', sm: '65%', md: '50%', lg: '40%' }, mt: '50px' }}>
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
          <Typography>I am a fourth year student at Metropolia University. I specialize in Mobile Solutions, so I know my way around mobile based applications. I am most experienced with Android development and website development with React. I know Kotlin and JavaScript best, but can also do C++, C# and Swift. <br/><br/>I have also worked with back end systems, such as Rest API, GraphQL, SQL and NoSQL. I also know some cloud technologies, such as AWS and a bit of Azure.<br/><br/>I have completed many projects during my studies, including two projects made for actual customers like Nokia and ClimbStation. All projects have been done using agile development methods, such as Google Sprint and Trello. I am fluent in Finnish and English, and have mostly worked in mutlicultural teams.<br/><br/>If you wish to learn more about my projects, you can click on the Projects-tab on the top right.</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Home
