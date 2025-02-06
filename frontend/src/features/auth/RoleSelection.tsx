import { Button, Grid } from '@mui/material';

const roles = ['Teacher', 'Student', 'Parent', 'Administrator'];

export const RoleSelection = ({ onSelect }: { onSelect: (role: string) => void }) => {
  return (
    <div className="role-selection">
      <h2>Select Your Role</h2>
      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid item xs={6} key={role}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => onSelect(role)}
              sx={{ height: 100, fontSize: '1.2rem' }}
            >
              {role}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};