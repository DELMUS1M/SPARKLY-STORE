import React from 'react';

const CryptoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 13.62c-1.07-.4-1.85-1.44-1.85-2.62 0-1.18.78-2.22 1.85-2.62l.23-.09.23-.09c.35-.14.74-.14 1.09 0l.23.09.23.09c1.07.4 1.85 1.44 1.85 2.62 0 1.18-.78 2.22-1.85 2.62l-.23.09-.23.09c-.35.14-.74.14-1.09 0l-.23-.09-.23-.09zm1.5-5.12V5.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v3h1zm0 3v3c0 .28.22.5.5.5s.5-.22.5-.5v-3h-1z"/>
    </svg>
);

export default CryptoIcon;
