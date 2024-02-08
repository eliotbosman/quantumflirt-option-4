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
    var title = document.getElementById("title"); // Added this line

    // Define an array of colors
    var colors = ["#344b33", "#b78d6a", "#c5ae96", "#7f886e", "#fef8e6"];

    title.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default behavior of anchor tags
        changeBackgroundColor();
    });

    function changeBackgroundColor() {
        // Generate a random index to select a color from the array
        var randomIndex = Math.floor(Math.random() * colors.length);
        
        // Get the randomly selected color
        var randomColor = colors[randomIndex];
        
        // Apply the random color as the background color of the document body
        document.body.style.backgroundColor = randomColor;
    }

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
        if (!video.classList.contains("enlarged")) {
            openFullscreen(video);
            video.classList.add("enlarged");
            video.controls = true;
        } else {
            closeFullscreen();
            video.classList.remove("enlarged");
            video.controls = false;
        }
    }

    function openFullscreen(video) {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { /* Firefox */
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE/Edge */
            video.msRequestFullscreen();
        }
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
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
