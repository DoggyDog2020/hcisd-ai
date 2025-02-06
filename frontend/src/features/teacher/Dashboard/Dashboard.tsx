// frontend/src/features/teacher/Dashboard/Dashboard.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';

export type DashboardView = 'chat' | 'lessons' | 'progress' | 'settings';

export const TeacherDashboard: React.FC = () => {
  const [view, setView] = useState<DashboardView>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(true); // start open by default
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Dimensions
  const headerHeight = 80;
  const footerHeight = 60;
  const drawerWidth = 300;

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (view) {
      case 'chat':
        return <ChatInterface />;
      case 'lessons':
        return <Typography variant="h6">Lesson Plans - Coming Soon</Typography>;
      case 'progress':
        return <Typography variant="h6">Student Progress - Coming Soon</Typography>;
      case 'settings':
        return <Typography variant="h6">Settings - Coming Soon</Typography>;
      default:
        return <Typography variant="h6">Select a feature from the menu</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar
        view={view}
        onChangeView={(newView) => {
          setView(newView);
          if (isMobile) setSidebarOpen(false);
        }}
        isMobile={isMobile}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        drawerWidth={drawerWidth}
      />

      {/* Main Section (Header + Content + Footer) */}
      <Box
        sx={{
          flexGrow: 1,
          // If sidebar is open on desktop, push content to the right
          ml: !isMobile && sidebarOpen ? `${drawerWidth}px` : 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden', // we only want the chat to scroll, not the entire page
        }}
      >
        {/* HEADER (fixed) */}
        <Box
          sx={{
            position: 'relative',
            height: `${headerHeight}px`,
            minHeight: `${headerHeight}px`,
            backgroundColor: 'var(--hcisd-primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '3px solid var(--hcisd-accent)',
            px: 2,
          }}
        >
          {/* Sidebar toggle button (desktop + mobile) */}
          <IconButton
            sx={{ color: 'white', mr: 2 }}
            onClick={handleToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <MenuIcon />
          </IconButton>

          {/* Banner image (desktop) */}
          {!isMobile && (
            <Box sx={{ mr: 2 }}>
              <img
                src="https://core-docs.s3.us-east-1.amazonaws.com/documents/asset/uploaded_file/4681/district/4052380/logoandwordmark_white.png"
                alt="HCISD Banner"
                style={{ height: '60px', objectFit: 'contain' }}
              />
            </Box>
          )}

          {/* Title */}
          <Typography variant="h5" sx={{ textAlign: 'center', flexGrow: 1 }}>
            HCISD Teacher Chat AI
          </Typography>
        </Box>

        {/* MAIN CHAT AREA (fills space between header & footer) */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'hidden', // the ChatInterface will have its own scroll
            backgroundColor: 'var(--light-gray)',
          }}
        >
          {renderContent()}
        </Box>

        {/* FOOTER (fixed) */}
        <Box
          sx={{
            height: `${footerHeight}px`,
            backgroundColor: 'var(--hcisd-secondary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '3px solid var(--hcisd-accent)',
          }}
        >
          <Typography variant="body2">
            "Empowering every student through innovation, excellence, and integrity."
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
