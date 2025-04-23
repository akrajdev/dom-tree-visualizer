(function () {
  if (document.getElementById("dom-visualizer-wrapper")) return;

  function buildTree(node) {
    const li = document.createElement("li");
    const tag = node.tagName.toLowerCase();
    const attrs = [...node.attributes].map(attr => `${attr.name}="${attr.value}"`).join(" ");
    li.innerHTML = `<span class="dom-node" style="cursor:pointer;color:#0074D9;">&lt;${tag}${attrs ? " " + attrs : ""}&gt;</span>`;

    const children = [...node.children];
    if (children.length > 0) {
      const ul = document.createElement("ul");
      ul.style.display = "none";
      children.forEach(child => ul.appendChild(buildTree(child)));
      li.appendChild(ul);

      li.querySelector(".dom-node").addEventListener("click", e => {
        e.stopPropagation();
        ul.style.display = ul.style.display === "none" ? "block" : "none";
      });
    }

    return li;
  }

  const style = document.createElement("style");
  style.textContent = `
    #dom-visualizer-wrapper {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 999999;
      max-height: 90vh;
      overflow: auto;
      font-family: monospace;
      font-size: 12px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    #dom-visualizer-wrapper ul {
      list-style: none;
      padding-left: 1em;
      border-left: 1px solid #ddd;
      margin: 5px 0;
    }
    #dom-visualizer-wrapper li {
      margin: 4px 0;
    }
    #dom-visualizer-close {
      background: none;
      border: none;
      color: #aaa;
      font-size: 16px;
      float: right;
      cursor: pointer;
    }
    #dom-visualizer-close:hover {
      color: #000;
    }
  `;
  document.head.appendChild(style);

  const wrapper = document.createElement("div");
  wrapper.id = "dom-visualizer-wrapper";

  const closeBtn = document.createElement("button");
  closeBtn.id = "dom-visualizer-close";
  closeBtn.innerHTML = "✖";
  closeBtn.onclick = () => wrapper.remove();

  const title = document.createElement("div");
  title.innerHTML = "<strong>DOM Tree</strong>";

  const container = document.createElement("ul");
  container.appendChild(buildTree(document.body));

  wrapper.appendChild(closeBtn);
  wrapper.appendChild(title);
  wrapper.appendChild(container);
  document.body.appendChild(wrapper);
})();