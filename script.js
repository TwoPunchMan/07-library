// Library code - TOP

/* selectors */
// navbar
const add_book_btn = document.querySelector(".add-book");
const theme_toggle_btn = document.querySelector(".theme-toggle");

const container = document.querySelector(".container");

// book list
const book_list = document.querySelector(".books-list");

// form
const form = document.querySelector(".form");
const add_book_form = document.querySelector("#add-book-form");
const form_backdrop = document.querySelector(".form-backdrop");

const cancel_form_btn = document.querySelector("#cancel");
const add_book_form_btn = document.querySelector("#add");

// navbar element listeners
add_book_btn.addEventListener("click", (event) => {
	displayForm();
});

theme_toggle_btn.addEventListener("click", setTheme);

/* form element listeners */

// Cancel form and go back to main view
cancel_form_btn.addEventListener("click", (event) => {
	cancelForm();
});

// get form data from submit button
add_book_form_btn.addEventListener("click", (event) => {
	submitForm();
});

/* Boilerplate */
let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function() {
		return this.title + " by " + this.author + ", " + this.pages + " pages. Status: " + this.read + ".";
	}
}

function addBookToLibrary(book) {
	myLibrary.push(book);
	addBookCard(book);
}

/* Functions */

const printAllBooks = function() {
	for (let i = 0; i < myLibrary.length; i++) {
		let book_info = myLibrary[i].info();
		console.log(book_info);
	}
}

// show add book form when add book button clicked
const displayForm = function() {
	form.style.display = "flex";
	form_backdrop.style.display = "block";
}

// toggle light/dark theme
function setTheme() {
	const root = document.documentElement;
	const new_theme = root.className == "dark" ? "light" : "dark";
	root.className = new_theme;
}

// Get form data after clicking submit button
const turnFormDataIntoBook = function() {
	let form_data = add_book_form.elements;
	let title = form_data[0].value;
	let author = form_data[1].value;
	let pages = form_data[2].value;
	let read = form_data[3].value;
	
	return new Book(title, author, pages, read);
}

// add book to html page
const addBookCard = function(book) {
	let book_list_item = document.createElement("li");
	
	// add data to card
	const book_data = addBookDataToHtml(book);
	book_list_item.appendChild(book_data.title);
	book_list_item.appendChild(book_data.author);
	book_list_item.appendChild(book_data.pages);
	book_list_item.appendChild(book_data.read);
	book_list_item.appendChild(book_data.id);
	
	// add buttons to card
	let buttons_div = addBookButtons();
	book_list_item.appendChild(buttons_div);

	book_list_item.classList.add("book");
	book_list_item.setAttribute("id", myLibrary.length);
	
	// add book to html library page
	book_list.appendChild(book_list_item);

}

// Add book data to card html
const addBookDataToHtml = function(book) {
	let title_div = document.createElement("div");
	let author_div = document.createElement("div");
	let pages_div = document.createElement("div");
	let read_div = document.createElement("div");
	let id_div = document.createElement("div");

	// html manipulation of divs
	title_div.innerHTML = "Title:<br><span>" + book.title + "</span>";
	author_div.innerHTML = "Author:<br><span>" + book.author + "</span>";
	pages_div.innerHTML = "Pages:<br><span>" + book.pages + "</span>";

	let read_status = book.read.charAt(0).toUpperCase() + book.read.slice(1);
	read_div.innerHTML = "Read Status:<br><span>" + read_status + "</span>";
	
	id_div.innerHTML = "Id #:<br><span>" + myLibrary.length + "</span>";

	return {title: title_div, author: author_div, pages: pages_div, read: read_div, id: id_div};
}

// Add buttons to book card
const addBookButtons = function() {
	let buttons_div = document.createElement("div");
	let id_num = myLibrary.length;

	let toggle_read_btn = document.createElement("button");
	let remove_book_btn = document.createElement("button");
	
	buttons_div.classList.add("card-btn-container");

	toggle_read_btn.innerHTML = "Toggle read status";
	toggle_read_btn.classList.add("read-btn");
	toggle_read_btn.classList.add("card-btn");
	toggle_read_btn.addEventListener("click", (event) => {
		const book_id = document.getElementById(id_num);
		let current_read_status_html = book_id.childNodes[3].lastChild;
		toggleReadStatus(myLibrary[id_num - 1], current_read_status_html);
	});
	
	remove_book_btn.innerHTML = "Remove";
	remove_book_btn.classList.add("remove-btn");
	remove_book_btn.classList.add("card-btn");
	remove_book_btn.addEventListener("click", (event) => {
		removeBookFromLibrary(id_num);
	});

	buttons_div.appendChild(toggle_read_btn);
	buttons_div.appendChild(remove_book_btn);

	return buttons_div;
}

const toggleReadStatus = function(book, html) {
	if (book.read == "read") {
		book.read = "not read";
		html.innerHTML = "Not read";
	} else {
		book.read = "read";
		html.innerHTML = "Read";
	}
}

const removeBookFromLibrary = function(number) {
	delete myLibrary[number - 1];
	const book_list_item = document.getElementById(number);
	book_list.removeChild(book_list_item);
}

// Reset/Cancel form and go back to main view
const cancelForm = function() {
	form_backdrop.style.display = "none";
	form.style.display = "none";
}

// Get data from submit button click
const submitForm = function() {
	cancelForm();
	let book = turnFormDataIntoBook();
	addBookToLibrary(book);
	add_book_form.reset();
}
