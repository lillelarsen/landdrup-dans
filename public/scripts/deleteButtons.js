const deleteButtons = document.querySelectorAll('.fa-trash-alt');
deleteButtons.forEach(btn => {
    btn.addEventListener('click', event => {
        const id = event.target.dataset.id;
        const category = event.target.dataset.category;
        fetch(`/admin/${category}/${id}`, {
            'method': 'DELETE'
        })
        .then(response => {
            if (response.status === 200) {
                window.location.reload();
            }
        });
    })
})