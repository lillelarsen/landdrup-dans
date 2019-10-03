function openForm() {
    event.preventDefault()
    document.querySelector("#addTo").style.display = "block";
  }
  
  function closeForm() {
    event.preventDefault()
    document.querySelector("#addTo").style.display = "none";
  }

  function openUpdateForm(id) {
    event.preventDefault()
    document.querySelector('.updateID').value = id;
    document.querySelector("#updateTo").style.display = "block";
  }
  
  function closeUpdateForm() {
    event.preventDefault()
    document.querySelector("#updateTo").style.display = "none";
  }

