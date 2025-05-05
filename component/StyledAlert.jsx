'use client';

import {useEffect} from 'react';
import styled from 'styled-components';

const AlertContainer = styled.div`
    border-left: 4px solid;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.375rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;

    ${({type}) => {
        switch (type) {
            case 'success':
                return `
          background-color: #d1fae5;
          border-color: #34d399;
          color: #065f46;
        `;
            case 'error':
                return `
          background-color: #fee2e2;
          border-color: #f87171;
          color: #b91c1c;
        `;
            case 'warning':
                return `
          background-color: #fef3c7;
          border-color: #fbbf24;
          color: #92400e;
        `;
            default: // info
                return `
          background-color: #dbeafe;
          border-color: #60a5fa;
          color: #1e40af;
        `;
        }
    }}
`;

const CloseButton = styled.button`
    font-size: 1.25rem;
    font-weight: 600;
    opacity: 0.5;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 0.75;
    }
`;

export default function StyledAlert({
  message,
  type = 'info',
  onClose,
  duration = 5000,
}) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
      <AlertContainer type={type}>
        <span>{message}</span>
        <CloseButton onClick={onClose} aria-label="Close alert">
          &times;
        </CloseButton>
      </AlertContainer>
  );
}