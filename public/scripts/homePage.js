(() => {
    document
        .querySelector("body")
        .style.setProperty("--deviceHeight", window.innerHeight + "px");

    function addBackgroundText() {
        const BG_TEXT_HOLDER = document.querySelector(".bgText");
        const TEXT = "to reach you ";
        let bulkText = "";
        const HEIGHT = document.querySelector(".main").clientHeight;
        for (let i = 1000; i > 0; i--) {
            bulkText += TEXT;
        }
        BG_TEXT_HOLDER.innerText += bulkText;
        BG_TEXT_HOLDER.style.height = HEIGHT + "px";
        console.log(BG_TEXT_HOLDER.style.height);
    }

    function moveBall() {
        const BALL = document.querySelector(".ball");
        const CONTAINER = document.querySelector(".main");
        const ELEMENTS_TO_BLEND_WITH = document.querySelectorAll(".blend");
        const DIMENSIONS = [];

        ELEMENTS_TO_BLEND_WITH.forEach(element => {
            DIMENSIONS.push({
                leftEdge: element.getBoundingClientRect().x,
                rightEdge:
                    element.getBoundingClientRect().x + element.offsetWidth,
                topEdge: element.getBoundingClientRect().y,
                bottomEdge:
                    element.getBoundingClientRect().y + element.offsetHeight
            });
        });
        function isMouseOnBlendElement(
            mousePositionX,
            mousePositionY,
            collection
        ) {
            return (
                mousePositionX >= collection.leftEdge &&
                mousePositionX <= collection.rightEdge &&
                mousePositionY >= collection.topEdge &&
                mousePositionY <= collection.bottomEdge
            );
        }

        CONTAINER.addEventListener("touchmove", event => {
            handleMovement(event.touches[0]);
        });
        CONTAINER.addEventListener("mousemove", event => {
            handleMovement(event);
        });

        function handleMovement(event) {
            const LEFT_TOUCH = event.clientX;
            const LEFT_POSITION = LEFT_TOUCH - CONTAINER.offsetLeft;
            const TOP_TOUCH = event.clientY;
            const TOP_POSITION =
                TOP_TOUCH + window.scrollY - CONTAINER.offsetTop;
            const BALL_WIDTH = BALL.offsetWidth;
            const BALL_HEIGHT = BALL.offsetHeight;
            console.log(
                `Left pos: ${LEFT_POSITION} and top pos: ${TOP_POSITION} and container off top: ${window.scrollY}`
            );
            let touchIndex = 0;
            DIMENSIONS.forEach((eachDimension, index) => {
                if (
                    isMouseOnBlendElement(LEFT_TOUCH, TOP_TOUCH, eachDimension)
                ) {
                    touchIndex++;
                }
            });
            if (touchIndex) {
                BALL.classList.add("ball-blend");
                touchIndex = 0;
            } else {
                BALL.className = "ball";
            }

            BALL.style.transform = `translate(${
                LEFT_POSITION - BALL_WIDTH / 2
            }px, ${TOP_POSITION - BALL_HEIGHT / 2}px)`;
        }
    }

    (function toggleCategories() {
        const FILTER_BUTTON = document.querySelector(".filter");
        const CATEGORIES = document.querySelector(".categories");
        CATEGORIES.style.display = "none";
        let IsCategoriesVisible = false;
        FILTER_BUTTON.addEventListener("click", () => {
            if (IsCategoriesVisible) {
                requestAnimationFrame(hide);

                IsCategoriesVisible = false;
            } else {
                CATEGORIES.style.display = "flex";
                addBackgroundText();
                moveBall();

                requestAnimationFrame(show);
                IsCategoriesVisible = true;
            }

            function show() {
                CATEGORIES.style.opacity = 1;
            }

            function hide() {
                CATEGORIES.style.opacity = 0;
                setTimeout(function () {
                    CATEGORIES.style.display = "none";
                }, 500);
            }
        });
    })();
    addBackgroundText();
    moveBall();
})();
