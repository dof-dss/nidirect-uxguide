// Copy code functionality for code snippets
(function() {
  'use strict';
  
  // Function to decode HTML entities
  function decodeHTMLEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }
  
  // Function to extract and clean code from the code block
  function extractCode(codeElement) {
    // Get all the text content
    let codeText = '';
    
    // Get all span elements with nidirect-codeLine class (these are the actual code lines)
    const lines = codeElement.querySelectorAll('.nidirect-codeLine');
    
    if (lines.length > 0) {
      // If we have structured lines, extract them
      lines.forEach(line => {
        // Get the parent element that contains this line and all its content
        let lineParent = line.parentElement;
        // Get all content until the next .nidirect-codeLine
        let content = '';
        let currentNode = line.nextSibling;
        
        while (currentNode && !currentNode.classList?.contains('nidirect-codeLine')) {
          if (currentNode.nodeType === Node.TEXT_NODE) {
            content += currentNode.textContent;
          } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
            content += currentNode.textContent;
          }
          currentNode = currentNode.nextSibling;
        }
        
        if (content.trim()) {
          codeText += content + '\n';
        }
      });
    } else {
      // Fallback: just get all text content
      codeText = codeElement.textContent;
    }
    
    // Decode HTML entities
    codeText = decodeHTMLEntities(codeText);
    
    // Clean up extra whitespace
    codeText = codeText.trim();
    
    return codeText;
  }
  
  // Function to copy text to clipboard
  function copyToClipboard(text, button) {
    if (navigator.clipboard && window.isSecureContext) {
      // Use the Clipboard API
      navigator.clipboard.writeText(text).then(function() {
        showCopySuccess(button);
      }).catch(function(err) {
        console.error('Failed to copy text: ', err);
        fallbackCopy(text, button);
      });
    } else {
      // Fallback for older browsers
      fallbackCopy(text, button);
    }
  }
  
  // Fallback copy method for older browsers
  function fallbackCopy(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showCopySuccess(button);
      }
    } catch (err) {
      console.error('Fallback copy failed: ', err);
    }
    
    document.body.removeChild(textarea);
  }
  
  // Show success message
  function showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(function() {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }
  
  // Initialize copy buttons
  function initCopyButtons() {
    // Find all code blocks within details elements
    const codeBlocks = document.querySelectorAll('.govuk-details__text pre code');
    
    codeBlocks.forEach(function(codeBlock) {
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'govuk-button govuk-button--inverse';
      copyButton.textContent = 'Copy code';
      copyButton.setAttribute('type', 'button');
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');
      
      // Add click event
      copyButton.addEventListener('click', function(e) {
        e.preventDefault();
        const code = extractCode(codeBlock);
        copyToClipboard(code, copyButton);
      });
      
      // Insert button inside the pre element
      const preElement = codeBlock.parentElement;
      
      // Check if button already exists
      if (!preElement.querySelector('.govuk-button')) {
        // Add relative positioning class to pre element if needed
        if (!preElement.classList.contains('code-block-container')) {
          preElement.classList.add('code-block-container');
        }
        preElement.insertBefore(copyButton, preElement.firstChild);
      }
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
  } else {
    initCopyButtons();
  }
})();
