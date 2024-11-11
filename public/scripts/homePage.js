(() => {
    /* function createGrid() {
        const DEVICE_WIDTH = window.innerWidth;
        const DEVICE_HEIGHT = window.innerHeight;

        const PARENT_CONTAINER = document.querySelector(".parent");
        const PARENT_CONTAINER_CHILDREN = PARENT_CONTAINER.children.length;
        const SCREEN_AREA = DEVICE_HEIGHT * DEVICE_WIDTH;
        const DIV_HEIGHT = 10;
        const DIV_WIDTH = 10;
        const DIV_GAP = 2;
        const TOTAL_NUM_OF_DIVS = SCREEN_AREA / (DIV_HEIGHT * DIV_WIDTH);
        for (let i = PARENT_CONTAINER_CHILDREN; i < 50; i++) {
            const DIV = document.createElement("div");
            PARENT_CONTAINER.appendChild(DIV);
            console.log(PARENT_CONTAINER.children.length);
        }
    }
    createGrid();*/

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
        CONTAINER.addEventListener("touchstart", event => {
           handleMovement(event.touches[0])
        });
        CONTAINER.addEventListener("mousemove", event => {
            handleMovement(event);
        });

        function handleMovement(event) {
            const LEFT_TOUCH = event.clientX;
            const LEFT_POSITION = LEFT_TOUCH - CONTAINER.offsetLeft;
            const TOP_TOUCH = event.clientY;
            const TOP_POSITION = TOP_TOUCH - CONTAINER.offsetTop;
            const BALL_WIDTH = BALL.offsetWidth;
            const BALL_HEIGHT = BALL.offsetHeight;
            BALL.style.transform = `translate(${
                LEFT_POSITION - BALL_WIDTH / 2
            }px, ${TOP_POSITION - BALL_HEIGHT / 2}px)`;
            if (event.target.tagName === "FOOTER") {
                document.querySelector("footer").style.color = "var(--color3)";
            } else {
                document.querySelector("footer").style.color = "var(--color2)";
            }
        }
    }
    addBackgroundText();
    moveBall();
})();
