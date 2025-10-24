document.addEventListener("DOMContentLoaded", function () {
    const title = document.querySelector("title").textContent;
    const childElements = document.querySelectorAll(".md-typeset figure");
    
    if (title === "Deep Space Imaging - Xuewen Liu") {
      // 根据标题设置某个子元素的样式
      childElements.forEach(function (figure) {
        figure.style.display = "inline-block";
        figure.style.marginLeft = "10px";
        figure.style.marginRight = "10px";
      });
    }else if (title === "Planetary Imaging - Xuewen Liu") {
    // Set display and margin for all figure elements with class "figure"
    childElements.forEach(function (figure) {
        figure.style.display = "inline-block";
        figure.style.marginLeft = "10px";
        figure.style.marginRight = "10px";
    });
    }
    
  });
  console.log("a lot of effort to do this...")

 