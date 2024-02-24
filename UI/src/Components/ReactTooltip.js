import React from 'react';
import Tooltip from '@mui/material/Tooltip';
// import '../Styles/Tooltip.css';

function ReactTooltip({ text, maxLength = 15 }) {

  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <>
    {truncatedText.includes('...') ? (
      <Tooltip title={text}>
        {truncatedText}
      </Tooltip>
    ) 
    : (
      <div>{text}</div>
    )}
    </>
  );
}

export default ReactTooltip;