let button = document.getElementsByTagName("button")[0];
button.addEventListener("click", function() {
    let interval = setInterval(function() {
        if (count < 10) {
            replay();
            count += 1;
        } else {
            clearInterval(interval);
            count = 0;
        }
    }, 100);
});