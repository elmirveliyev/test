const products = document.querySelector(".products");
const basketList = document.querySelector(".basket-list");

let basket = [];

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) =>
    data.map((mehsul) => {
      let product = document.createElement("div");
      product.classList.add(
        "product",
        "rounded-xl",
        "border",
        "border-gray-400",
        "overflow-hidden",
        "text-center"
      );

      let image = document.createElement("img");
      image.classList.add("w-full", "h-[240px]", "object-contain");
      image.setAttribute("src", mehsul.image);

      let title = document.createElement("a");
      title.href = "detail.html?id=" + mehsul.id;
      title.classList.add("text-lg", "font-bold", "text-gray-900");
      title.textContent = mehsul.title;

      let price = document.createElement("span");
      price.classList.add("text-gray-500", "block");
      price.textContent = mehsul.price;

      let button = document.createElement("button");
      button.classList.add(
        "bg-blue-500",
        "text-white",
        "px-4",
        "py-2",
        "rounded",
        "mt-4",
        "hover:bg-blue-600",
        "cursor-pointer"
      );
      button.textContent = "Səbətə at";

      button.addEventListener("click", () => {
        basketList.innerHTML = "";

        const varolanMehsul = basket.find((prod) => prod.id === mehsul.id);

        if (!varolanMehsul) {
          // spread operator
          basket.push({
            ...mehsul,
            say: 1,
          });
        } else {
          varolanMehsul.say += 1;
        }

        console.log(basket);

        new Notify({
          title: "Səbətə əlavə olundu",
          text: `${mehsul.title}`,
        });

        basket.map((prod) => {
          let div = document.createElement("div");
          div.classList.add("flex", "items-center", "justify-between");

          let img = document.createElement("img");
          img.classList.add("w-10", "h-10", "object-contain");
          img.setAttribute("src", prod.image);

          let div2 = document.createElement("div");
          let h2 = document.createElement("h2");
          h2.textContent = prod.title;
          let span = document.createElement("span");
          span.textContent = prod.price + "$";
          let count = document.createElement("span");
          count.textContent = "Say: " + prod.say;
          count.classList.add("text-blue-500", "block");

          let close = document.createElement("span");
          close.textContent = "X";
          close.classList.add("cursor-pointer", "text-2xl", "p-2");

          close.addEventListener("click", () => {
            basketList.removeChild(div);
          });

          div2.append(h2, span, count);

          div.append(img, div2, close);

          basketList.append(div);
        });
      });

      product.append(image, title, price, button);

      products.append(product);
    })
  );

const basketAside = document.querySelector(".basket-aside");
const openBtn = document.querySelector(".open-btn");
const closeBtn = document.querySelector(".close-btn");

openBtn.addEventListener("click", () => {
  basketAside.classList.add("!visible", "!opacity-100", "!left-0");
});
closeBtn.addEventListener("click", () => {
  basketAside.classList.remove("!visible", "!opacity-100", "!left-0");
});

console.log("Salam");
