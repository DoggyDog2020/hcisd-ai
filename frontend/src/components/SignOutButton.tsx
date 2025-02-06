import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { signOut } from '../services/firebase/auth';

export const SignOutButton = () => {
  return (
    <Button
      variant="outlined"
      color="inherit"
      onClick={signOut}
      startIcon={<Logout />}
      sx={{ mt: 2 }}
      fullWidth
    >
      Sign Out
    </Button>
  );
};
