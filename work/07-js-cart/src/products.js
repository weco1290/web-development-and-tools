import render from "./render";
import state from "./state";

const appEl = document.querySelector("#app");

const cartEl = document.querySelector(".cart");

appEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("product")) {
    const index = e.target.dataset.index;

    render(state);
    return;
  }
  if (e.target.classList.contains("add")) {
    const index = e.target.dataset.index;
    if (!state.cart[index]) {
      state.cart[index] = 1;
    } else {
      state.cart[index] += 1;
    }

    render(state);
    return;
  }
  if (e.target.classList.contains("page")) {
    state.pages = e.target.dataset.target;
    render(state);
    return;
  }
});

cartEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("page")) {
    state.pages = e.target.dataset.target;
    render(state);
    return;
  }
  if (e.target.classList.contains("add")) {
    const index = e.target.dataset.index;
    if (!state.cart[index]) {
      state.cart[index] = 1;
    } else {
      state.cart[index] += 1;
    }

    render(state);
    return;
  }
  if (e.target.classList.contains("delete")) {
    const index = e.target.dataset.index;
    if (!state.cart[index]) {
      state.cart[index] = 0;
    } else {
      state.cart[index] -= 1;
    }

    render(state);
    return;
  }
  if (e.target.classList.contains("checkout")) {
    state.pages = e.target.dataset.target;
    state.cart = {};
    render(state);
    return;
  }
});

render(state);
