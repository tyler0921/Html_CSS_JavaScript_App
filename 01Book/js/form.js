// 입력 데이터 검증 함수
function validateBook(book) {
    if (!book.title || book.title.trim() === "") {
        alert("제목을 입력하세요.");
        return false;
    }
    if (!book.author || book.author.trim() === "") {
        alert("저자를 입력하세요.");
        return false;
    }
    if (!book.isbn || book.isbn.trim() === "") {
        alert("ISBN을 입력하세요.");
        return false;
    }
    if (!book.price || isNaN(book.price) || book.price <= 0) {
        alert("올바른 가격을 입력하세요.");
        return false;
    }
    if (!book.publishDate) {
        alert("출판일을 선택하세요.");
        return false;
    }
    return true;
}

// 도서 목록 가져오기
async function loadBooks() {
    try {
        const response = await fetch("http://localhost:8080/api/books"); // REST API 호출
        if (!response.ok) {
            throw new Error("서버 오류: " + response.status);
        }
        const books = await response.json();
        renderBookTable(books);
    } catch (error) {
        console.error("도서 목록 불러오기 실패:", error);
    }
}

// 도서 테이블 렌더링
function renderBookTable(books) {
    const tbody = document.getElementById("bookTableBody");
    tbody.innerHTML = ""; // 기존 내용 비우기

    books.forEach(book => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${book.price}</td>
            <td>${book.publishDate}</td>
        `;
        tbody.appendChild(row);
    });
}

// 폼 제출 이벤트 등록
document.getElementById("bookForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const book = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        isbn: document.getElementById("isbn").value,
        price: parseInt(document.getElementById("price").value),
        publishDate: document.getElementById("publishDate").value
    };

    if (!validateBook(book)) return;

    try {
        const response = await fetch("http://localhost:8080/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book)
        });

        if (!response.ok) {
            throw new Error("등록 실패: " + response.status);
        }

        alert("도서가 등록되었습니다.");
        document.getElementById("bookForm").reset();
        loadBooks(); // 등록 후 목록 새로고침
    } catch (error) {
        console.error("도서 등록 실패:", error);
    }
});

// 페이지 로드 시 도서 목록 불러오기
window.onload = loadBooks;
