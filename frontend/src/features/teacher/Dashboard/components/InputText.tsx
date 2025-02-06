// frontend/src/features/teacher/Dashboard/components/InputText.tsx
import React from 'react';
import { Box, TextField, IconButton, CircularProgress } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import './InputText.css';

interface InputTextProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSend: () => void;
  disabled: boolean;
  loading: boolean;
}

export const InputText: React.FC<InputTextProps> = ({
  value,
  onChange,
  onKeyDown,
  onSend,
  disabled,
  loading,
}) => {
  return (
    <div className="input-container">
      <Box className="input-box">
        <TextField
          className="input-text-field"
          fullWidth
          multiline
          maxRows={4}
          variant="outlined"
          placeholder="Type your message..."
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
        <IconButton
          className="send-button"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
        >
          {loading ? <CircularProgress size={24} /> : <SendIcon />}
        </IconButton>
      </Box>
    </div>
  );
};
