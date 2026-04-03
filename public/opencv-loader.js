// OpenCV.js loader script
(function() {
  window.opencvReady = false;
  
  function onOpenCvReady() {
    window.opencvReady = true;
    window.dispatchEvent(new Event('opencv-ready'));
    console.log('OpenCV.js is ready');
  }
  
  // Set the callback
  window.Module = {
    onRuntimeInitialized: onOpenCvReady
  };
})();
