// frontend/src/features/teacher/Dashboard/components/Sidebar.tsx
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Book as BookIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { SignOutButton } from '../../../../components/SignOutButton';
import './Sidebar.css';

export type DashboardView = 'chat' | 'lessons' | 'progress' | 'settings';

interface SidebarProps {
  view: DashboardView;
  onChangeView: (view: DashboardView) => void;
  isMobile: boolean;
  open: boolean;
  onClose: () => void;
  drawerWidth: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  view,
  onChangeView,
  isMobile,
  open,
  onClose,
  drawerWidth,
}) => {
  const menuItems = [
    { text: 'AI Chat', icon: <ChatIcon />, value: 'chat' },
    { text: 'Lesson Plans', icon: <BookIcon />, value: 'lessons' },
    { text: 'Student Progress', icon: <AssessmentIcon />, value: 'progress' },
    { text: 'Settings', icon: <SettingsIcon />, value: 'settings' },
  ];

  const drawerContent = (
    <Box className="sidebar-container">
      <Typography variant="h5" className="sidebar-title">
        Resources
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.value}
            selected={view === item.value}
            onClick={() => onChangeView(item.value as DashboardView)}
            className="sidebar-menu-item"
          >
            <ListItemIcon className="sidebar-menu-icon">{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} className="sidebar-menu-text" />
          </ListItemButton>
        ))}
      </List>
      <Box className="sidebar-signout">
        <SignOutButton />
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: 'var(--sidebar-blue)',
          padding: '16px',
          boxSizing: 'border-box',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};
