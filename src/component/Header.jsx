import { NavigateBefore } from '@mui/icons-material';
import { Box, Icon, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <Box sx={{ bgcolor: 'yellow', p: 2, display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Icon>
        <Link to='/'>
          <NavigateBefore />
        </Link>
      </Icon>
      <Typography
        variant='h6'
        sx={{ fontWeight: '600' }}>
        {props.value}
      </Typography>
    </Box>
  )
}

export default Header;