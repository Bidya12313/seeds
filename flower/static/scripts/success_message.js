document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const action = form.getAttribute("action");
    const formType = action === "/reviews" ? "Відгук" : "Заявка";
    const formData = new FormData(form);

    fetch(action, {
      method: "POST",
      body: formData
    })
      .then(response => {
        if (response.ok) {
          showToast(`${formType} надіслано успішно!`);
          form.reset();
        } else {
          alert("Помилка при надсиланні");
        }
      })
      .catch(() => alert("Технічна помилка. Спробуйте пізніше."));
  });
});

function showToast(message) {
  const toast = document.getElementById("success-toast");
  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}