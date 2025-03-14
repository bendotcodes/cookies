import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

interface CookieBannerProps {
  onAccept: () => void;
  onReject: () => void;
}

export default function CookieBanner({
  onAccept,
  onReject,
}: CookieBannerProps): React.ReactElement | null {
  const [cookies] = useCookies(['cookieConsent']);
  const [visible, setVisible] = useState(!cookies.cookieConsent);

  if (!visible) {
    return null;
  }

  const handleAccept = () => {
    onAccept();
    setVisible(false);
  };

  const handleReject = () => {
    onReject();
    setVisible(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f1f1f1',
        padding: '10px 20px',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div>
        <p style={{ margin: '0 0 10px 0' }}>
          This website uses cookies to enhance your browsing experience.
        </p>
      </div>
      <div>
        <button
          onClick={handleAccept}
          style={{
            marginRight: '10px',
            padding: '8px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          style={{
            padding: '8px 15px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
