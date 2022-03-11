const btn = document.querySelector(".j-btn-test");
const btn_icon1 = document.querySelector(".btn_icon1");
const btn_icon2 = document.querySelector(".btn_icon2");
btn_icon2.hidden = true;

btn.addEventListener("click", () => {
  if (btn_icon1.hidden == true) {
    btn_icon1.hidden = false;
    btn_icon2.hidden = true;
  } else {
    btn_icon1.hidden = true;
    btn_icon2.hidden = false;
  }
});
