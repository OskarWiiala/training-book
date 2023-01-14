import { React, useState, useContext } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  Box,
  Divider,
  IconButton
} from '@mui/material'
import { RiMenu2Line } from 'react-icons/ri'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import { Link } from 'react-router-dom'
import NavItem from './NavItem'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ColorModeContext } from '../context/ColorModeContext'
import useMediaQuery from '@mui/material/useMediaQuery'

/**
 * @returns Component for navigating between pages of the app
 */

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const { mode, toggleColorMode } = useContext(ColorModeContext)

  const galaxyFold = useMediaQuery('(max-width:340px)')

  const drawerNavStyles = {
    display: { xs: 'block', md: 'none ' },
    '& .MuiDrawer-paper':
    {
      boxSizing: 'border-box',
      width: { xs: '75%', sm: '50%' }
    }
  }

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <>
      <AppBar elevation={2}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: 'space-between' },
            mx: { xs: 0, md: 5 }
          }}
        >
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <RiMenu2Line/>
          </IconButton>
          <Typography
            color="primary"
            fontWeight='bold'
            variant='subtitle2'
            sx={{ textDecoration: 'none', ml: 1, fontSize: '1.25rem' }}
            style={ galaxyFold ? { display: 'none' } : { display: 'flex' }}
            component={Link}
            to='/'
          >
            Training Book
          </Typography>
          <List sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto' }}>
            <NavItem
              text={'Home'}
              icon={<HomeIcon />}
              component={Link}
              to='/'
            />
            <NavItem
              text={'Book'}
              icon={<AutoStoriesIcon />}
              component={Link}
              to='/book'
            />
          </List>
          <IconButton sx={{ ml: { xs: 0.5, md: 1 } }} onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      { /* On small screen sizes, navigation links are displayed in a drawer */}
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        variant='temporary'
        sx={drawerNavStyles}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', flex: 1, p: 1, pt: 1 }}>
            <Typography
            color="primary"
            fontWeight='bold'
            variant='h6'
            sx={{ flex: 1, alignSelf: 'center', pl: 2, textDecoration: 'none' }}
            component={Link}
            to='/'
            onClick={handleDrawerToggle}
          >
            Training Book
          </Typography>
            <IconButton
              color='inherit'
              aria-label='close drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, alignSelf: 'flex-start' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ flex: 5 }}>
          <List sx={{ '& a': { borderRadius: 0 } }}>
            <NavItem
              text={'Home'}
              icon={<HomeIcon />}
              component={Link}
              to='/'
              onClick={() => setOpenDrawer(false)}
            />
            <NavItem
              text={'Book'}
              icon={<AutoStoriesIcon />}
              component={Link}
              to='/book'
              onClick={() => setOpenDrawer(false)}
            />
          </List>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
export default Navbar
