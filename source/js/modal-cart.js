let cartButtons = document.querySelectorAll(".add-to-cart");
let cartModal = document.querySelector(".modal-cart");


for (let i = 0; i < cartButtons.length; i++) {
  cartButtons[i].addEventListener("click", function (e) {
    e.preventDefault();
    document.body.style.overflow = "hidden";
    cartModal.classList.add("modal-cart--show");
  });
};

cartModal.addEventListener("click", function (e) {
  if (e.target == cartModal) {
    document.body.style.overflow = "initial";
    cartModal.classList.remove("modal-cart--show");
  };
});
