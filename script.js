document.addEventListener("DOMContentLoaded", function () {
  var archiveList = document.querySelector("ul");
  var closeOverlayButton = document.getElementById("closeOverlayButton");
  var controller = new ScrollMagic.Controller();
  var fadeElements = document.querySelectorAll('.fade-element');
  var featureVideo = document.querySelector(".feature video");
  var fullscreenOverlay = document.getElementById("fullscreenOverlay");
  var mainContainer = document.getElementById("mainContentContainer");
  var openOverlayButton = document.getElementById("openOverlayButton");
  var overlay = document.getElementById("overlay"); // Added this line
  var videos = document.querySelectorAll(".grid video");
  var fullScreenButton = document.getElementById("fullScreenButton"); // Added this line

  openOverlayButton.addEventListener("click", function () {
      toggleOverlay(true);
  });

  closeOverlayButton.addEventListener("click", function () {
      toggleOverlay(false);
      scrollToBottom();
  });

  function toggleOverlay(showOverlay) {
      mainContainer.style.display = showOverlay ? "none" : "block";
      overlay.style.display = showOverlay ? "block" : "none";
  }

  fullScreenButton.addEventListener("click", function (event) {
      event.preventDefault();
      handleVideoClick(featureVideo);
  });

  function handleVideoClick(video) {
      video.classList.toggle("enlarged");
      video.controls = !video.controls;

      if (video.classList.contains("enlarged")) {
          openFullscreen();
      } else {
          closeFullscreen();
      }
  }

  function openFullscreen() {
      var requestFullScreen =
          featureVideo.requestFullscreen ||
          featureVideo.mozRequestFullScreen ||
          featureVideo.webkitRequestFullscreen ||
          featureVideo.msRequestFullscreen;

      if (requestFullScreen) {
          requestFullScreen.apply(featureVideo);
      }
  }

  function closeFullscreen() {
      var exitFullScreen =
          document.exitFullscreen ||
          document.mozCancelFullScreen ||
          document.webkitExitFullscreen ||
          document.msExitFullscreen;

      if (exitFullScreen) {
          exitFullScreen.apply(document);
      }
  }

  function scrollToBottom() {
      var lastVideo = document.querySelector(".grid video.enlarged");
      if (lastVideo) {
          lastVideo.scrollIntoView({ behavior: "smooth", block: "end" });
      }
  }

  videos.forEach(function (video) {
      video.addEventListener("click", function () {
          handleVideoClick(video);
      });
  });

  var clearButtons = document.querySelectorAll(".clear-button");
  clearButtons.forEach(function (button) {
      button.addEventListener("click", function () {
          var video = button.closest(".grid").querySelector("video");
          handleClearButtonClick(video);
      });
  });

  function handleClearButtonClick(video) {
      video.classList.remove("enlarged");
      video.controls = false;
      closeFullscreen();
      scrollToBottom();
  }

  fadeElements.forEach(function (element) {
      new ScrollMagic.Scene({
          triggerElement: element,
          triggerHook: 0.6,
          reverse: true,
      })
          .setTween(gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1.4 }))
          .addTo(controller);
  });

  // Archive List functionality
  var archiveVideos = document.querySelectorAll(".archive-video");
  var toggleButtons = document.querySelectorAll(".toggle-button");

  toggleButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
          // Toggle the active class for the clicked button
          button.classList.toggle("active");

          // Toggle the display of the corresponding video
          archiveVideos[index].classList.toggle("active");

          // Close other open videos
          archiveVideos.forEach(function (video, i) {
              if (i !== index && video.classList.contains("active")) {
                  video.classList.remove("active");
                  toggleButtons[i].classList.remove("active");
              }
          });
      });
  });
});
