HTMLElement.prototype.clear = function () {
    while(this.firstChild) {
        this.removeChild(this.firstChild);
    }
    return this;
};

const buildCategoryList = function (data, entity) {
	let select = document.createElement('select');
	select.setAttribute('name', entity);
	data.forEach(element => {
		let option = document.createElement('option');
		option.setAttribute('value', element.id);
		option.setAttribute('id', element.id);
		option.textContent = element.name;
		select.appendChild(option);

	});
	return select;
};

const getList = function (type,entity) {
	fetch(`http://localhost:1337/api/${type}`)
      .then(response => response.json())
      .then(data => { 
        
        document
            .querySelector( '#' + entity)
            .clear()
            .appendChild(buildCategoryList(data, entity));
	});
};

getList('styles', 'style');
getList('ageGroups', 'ageGroup');
getList('levels', 'level');
getList('instructors', 'instructor');
getList('styles', 'styleUpdate');
getList('ageGroups', 'ageGroupUpdate');
getList('levels', 'levelUpdate');
getList('instructors', 'instructorUpdate');

	
