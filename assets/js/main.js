const counter = document.querySelector("#counter");
const progress = document.querySelector(".loader-progress");
const loader = document.querySelector(".loader");
const loaderCenter = document.querySelector(".loader-center");
const loaderTop = document.querySelector(".loader-top");
const loaderBottom = document.querySelector(".loader-bottom");
const greeting = document.querySelector(".greeting");
const greetingLine = document.querySelector(".greeting-line");

let value = 0;

const duration = 2600;
const start = performance.now();

function loading(now) {
    const elapsed = now - start;
    const progressValue = Math.min(elapsed / duration, 1);

    /*
        easeOut
    */
    const eased = 1 - Math.pow(1 - progressValue, 3);

    value = Math.floor(eased * 100);

    counter.textContent = value;
    progress.style.width = `${value}%`;

    if (progressValue < 1) {
        requestAnimationFrame(loading);
    } else {
        finishLoading();
    }
}

function finishLoading() {
    document.body.style.overflow = "hidden";

    loaderCenter.animate(
        [
            {
                opacity: 1,
                transform: "translate(-50%, -50%) scale(1)",
            },
            {
                opacity: 0,
                transform: "translate(-50%, -50%) scale(.92)",
            },
        ],
        {
            duration: 600,
            easing: "cubic-bezier(.76,0,.24,1)",
            fill: "forwards",
        },
    );

    loaderTop.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 400,
        fill: "forwards",
    });

    loaderBottom.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 400,
        fill: "forwards",
    });

    setTimeout(() => {
        greeting.animate(
            [
                {
                    opacity: 0,
                    transform: "scale(1.08)",
                },
                {
                    opacity: 1,
                    transform: "scale(1)",
                },
            ],
            {
                duration: 900,
                easing: "cubic-bezier(.16,1,.3,1)",
                fill: "forwards",
            },
        );

        greetingLine.animate([{ width: "0%" }, { width: "80px" }], {
            duration: 700,
            delay: 300,
            easing: "cubic-bezier(.16,1,.3,1)",
            fill: "forwards",
        });
    }, 500);

    /*
        Greeting stays for a moment,
        then reveal the actual page.
    */

    setTimeout(() => {
        loader.animate(
            [
                {
                    clipPath: "inset(0 0 0 0)",
                },
                {
                    clipPath: "inset(0 0 100% 0)",
                },
            ],
            {
                duration: 1000,
                easing: "cubic-bezier(.76,0,.24,1)",
                fill: "forwards",
            },
        );
    }, 2200);

    setTimeout(() => {
        loader.remove();
        document.body.style.overflow = "auto";
    }, 3300);
}

requestAnimationFrame(loading);
