var currentIndex;
var easingSpeed;


$(document).ready(function () {

    $("#play_pause_key").text("play_arrow");

    currentIndex = 1;
    easingSpeed = '100';

    $("#video")
        .on(
            "timeupdate"
            , function (event) {
                onTrackedVideoFrame(this.currentTime, this.duration);
            }
        );

    $("#video")
        .on(
            "loadedmetadata"
            , function (event) {
                $("#passedtimetext").text(getFormat(this.currentTime));
                $("#fulllengthtext").text(getFormat(this.duration));
            }
        );

});

function onTrackedVideoFrame(currentTime, length) {

    $("#passedtimetext").text(getFormat(currentTime));
    var percent = 100 * currentTime / length + "%";
    $("#passedtime")
        .animate({
            width: percent

        }, {
            duration: 100
            , easing: 'swing'
        });
}

function getFormat(time) {
    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    var stringR = "";
    while (time >= 3600) {
        hours++;
        time -= 3600;
    }
    while (time >= 60) {
        minutes++;
        time -= 60;
    }
    while (time >= 1) {
        seconds++;
        time -= 1;
    }
    if (time >= .5) {
        seconds++;
    }
    if (hours > 0) {
        stringR += hours + ":"
    }
    stringR += minutes + ":";
    if (seconds >= 10) {
        stringR += seconds;
    } else {
        stringR += "0" + seconds;
    }
    return stringR;
}


$(function () {
    $(document).keydown(function (event) {
        testing(event.keyCode);
    });
});

function testing(a) {
    if (a == 37) {
        goLeft();
        easeIn();
    } else if (a == 39) {
        goRight();
        easeIn();

    } else if (a == 13) {
        onEnter();
    }
}

function animateControls(text) {
    $("#command-overlay").text(text)
    $("#command-overlay")
        .animate({
            opacity: "1"

        }, {
            duration: 500

        })

    .animate({
        opacity: "0"
    }, {
        duration: 1000
    });

}

function easeIn() {
    $(".video-overlay")
        .animate({
            opacity: 1
        })
}

function goLeft() {
    if (currentIndex > 0) {
        $("#Kreis")
            .animate({
                left: "-=20%"

            }, {
                duration: easingSpeed
                , easing: 'swing'
            });
        currentIndex--;;
    }

}

function goRight() {

    if (currentIndex < 2) {
        $("#Kreis")
            .animate({
                left: "+=20%"
            }, {
                duration: easingSpeed
                , easing: 'swing'
            });
        currentIndex++;
    }



}

function easeCircle(percent) {

}

function onEnter() {
    if (currentIndex == 0) {
        animateControls("replay_5");
        skip(-5);
    } else if (currentIndex == 1) {
        var video = document.getElementById("video");
        if (video.paused) {
            play();
        } else {
            pause();
        }
    } else if (currentIndex == 2) {
        animateControls("forward_5");
        skip(5);
    }

}

function play() {
    $("#play_pause_key").text("pause");
    var video = document.getElementById("video");
    video.play();
    $(".video-overlay")
        .animate({
            opacity: 0
        })
}

function pause() {
    $("#play_pause_key").text("play_arrow");
    var video = document.getElementById("video");
    video.pause();
    $(".video-overlay")
        .animate({
            opacity: 1
        })
}

function skip(value) {
    var video = document.getElementById("video");
    video.currentTime += value;
}