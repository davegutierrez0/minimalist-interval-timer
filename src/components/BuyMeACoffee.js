// BuyMeACoffee.js
import React, { useEffect } from 'react';

function BuyMeACoffee() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute('data-name', 'BMC-Widget');
    script.setAttribute('data-id', 'YOUR-USERNAME');
    script.setAttribute('data-description', 'Support me on Buy me a coffee!');
    script.setAttribute('data-message', 'Thanks for your support!');
    script.setAttribute('data-color', '#FF813F');
    script.setAttribute('data-position', 'Right');
    script.setAttribute('data-x_margin', '18');
    script.setAttribute('data-y_margin', '18');
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div className="bmc-container">
      {/* This link will be visible and clickable */}
      <a href="https://www.buymeacoffee.com/dv1tam1n" target="_blank" rel="noopener noreferrer">
        Buy me a coffee
      </a>
    </div>
  );
}

export default BuyMeACoffee;