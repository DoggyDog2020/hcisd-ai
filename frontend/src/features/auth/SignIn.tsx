import { useState } from 'react';
import { Button, TextField, Box, Typography, Container, Alert, CircularProgress } from '@mui/material';
import { signInWithEmail } from '../../services/firebase/auth';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    if (!email.endsWith('@hcisd.org')) {
      setError('Only HCISD email addresses are allowed');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await signInWithEmail(email, password);
    } catch (err) {
      console.error('Sign-in error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Banner Section (Background image as banner) */}
      <Box
        sx={{
          width: '100%',
          height: { xs: '250px', sm: '350px', md: '450px' },
          backgroundImage: 'url("https://core-docs.s3.us-east-1.amazonaws.com/documents/asset/uploaded_file/4681/district/4052394/HCISD_Background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Heading Section (separated from the banner) */}
      <Box sx={{ py: 4, textAlign: 'center', backgroundColor: 'white' }}>
        <Typography variant="h3" sx={{ color: 'var(--hcisd-primary)', mb: 1 }}>
          Welcome to HCISD&apos;s Customized AI
        </Typography>
      </Box>

      {/* Sign In Form Section */}
      <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography component="h1" variant="h4" gutterBottom>
            Please Sign In
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="HCISD Email Address"
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              error={!!error}
              helperText="Must end with @hcisd.org"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              error={!!error}
              helperText="Test password: 'test'"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: 'var(--hcisd-primary)' }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Features Section for Various Roles */}
      <Box sx={{ mt: 8, p: 4, backgroundColor: 'var(--sidebar-blue)', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Explore Our Features
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
          {[
            {
              title: 'Teachers',
              description: 'Access personalized lesson plans and AI chat support.',
            },
            {
              title: 'Students',
              description: 'Get help with homework and study guides from AI tutors.',
            },
            {
              title: 'Parents',
              description: 'Stay informed about your child’s progress and school updates.',
            },
            {
              title: 'Administrators',
              description: 'Manage school-wide communications and AI features.',
            },
          ].map((item) => (
            <Box
              key={item.title}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 22%' },
                backgroundColor: 'white',
                p: 3,
                borderRadius: '8px',
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2">{item.description}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer Section with Lamp Logo */}
      <Box
        sx={{
          mt: 8,
          p: 2,
          backgroundColor: 'var(--hcisd-primary)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="https://core-docs.s3.us-east-1.amazonaws.com/documents/asset/uploaded_file/4681/district/4052377/lamp_white.png"
          alt="HCISD Lamp Logo"
          sx={{ maxWidth: { xs: '100px', sm: '150px', md: '200px' } }}
        />
      </Box>
    </Box>
  );
};
