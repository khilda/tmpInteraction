window.addEventListener("DOMContentLoaded", (e) => {
  setTimeout(() => {
    document.body.classList.add("reveal");
  }, 10);
  pageTransition(document.querySelectorAll("a"));
});

function isSameAsLocation(uriString) {
  const uri = new URL(uriString);

  return (
    uri.origin === window.location.origin &&
    uri.pathname === window.location.pathname
  );
}

function pageTransition(nodeList) {
  nodeList.forEach((node) => {
    if (!(node instanceof HTMLAnchorElement)) return;

    const { href } = node;

    if (!href || node.target === "_blank" || isSameAsLocation(href)) return;

    node.addEventListener("click", (event) => {
      event.preventDefault();
      node.classList.add("is-active");

      document.body.addEventListener(
        "animationend",
        () => {
          console.log("animationend");
          document.body.classList.add("hidden");
        },
        { passive: true, once: true }
      );
      document.body.addEventListener(
        "transitionend",
        () => {
          console.log("transitionend");
          window.location.href = href;
        },
        { passive: true, once: true }
      );
    });
  });
}
