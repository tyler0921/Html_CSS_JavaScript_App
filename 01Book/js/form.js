// 현재 수정 중인 도서 ID
let editingBookId = null;

// 버튼 요소 가져오기
const submitButton = document.querySelector("#submitButton");
const cancelButton = document.querySelector("#cancelButton");

const bookForm = document.getElementById("bookForm");
const bookTableBody = document.getElementById("bookTableBody");

// 임시 데이터 저장 (실제는 서버 연동해야 함)
let books = [];
let bookIdCounter = 1;

// 도서 등록
function createBook(bookData) {
    const newBook = { id: bookIdCounter++, ...bookData };
    books.push(newBook);
    renderBookTable();
}

// 도서 삭제
function deleteBook(bookId) {
    books = books.filter(book => book.id !== bookId);
    renderBookTable();
}

// 수정하기 전 데이터 불러오기
function editBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("isbn").value = book.isbn;
    document.getElementById("price").value = book.price;
    document.getElementById("publishDate").value = book.publishDate;

    editingBookId = bookId;
    submitButton.textContent = "수정";
    cancelButton.style.display = "inline-block";
}

// 수정 처리
function updateBook(bookId, bookData) {
    const index = books.findIndex(b => b.id === bookId);
    if (index !== -1) {
        books[index] = { id: bookId, ...bookData };
    }
    renderBookTable();
}

// 테이블 렌더링
function renderBookTable() {
    bookTableBody.innerHTML = "";

    books.forEach(book => {
        const row = `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>${book.price}</td>
                <td>${book.publishDate}</td>
                <td>
                    <button onclick="editBook(${book.id})">수정</button>
                    <button onclick="deleteBook(${book.id})">삭제</button>
                </td>
            </tr>
        `;
        bookTableBody.insertAdjacentHTML("beforeend", row);
    });

    // 폼 초기화
    bookForm.reset();
    submitButton.textContent = "등록";
    cancelButton.style.display = "none";
    editingBookId = null;
}

// 폼 submit 이벤트
bookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const bookData = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        isbn: document.getElementById("isbn").value,
        price: document.getElementById("price").value,
        publishDate: document.getElementById("publishDate").value,
    };

    if (editingBookId) {
        updateBook(editingBookId, bookData);
    } else {
        createBook(bookData);
    }
});

// 취소 버튼 이벤트
cancelButton.addEventListener("click", function () {
    bookForm.reset();
    submitButton.textContent = "등록";
    cancelButton.style.display = "none";
    editingBookId = null;
});
