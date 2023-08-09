export default function includeHtmlHelper() {
  document.querySelectorAll("body .includeHTML").forEach((elm, i) => {
    if (elm.hasAttribute("include-html")) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          elm.innerHTML = this.responseText;
        }
        if (this.status === 404) {
          elm.innerHTML = "Page not found.";
          elm.removeAttribute("include-html");
          includeHtmlHelper();
        }
      };
      xhttp.open("GET", elm.getAttribute("include-html"), true);
      xhttp.send();
      elm.addEventListener("ready", () => {});
      return;
    }
  });
}
