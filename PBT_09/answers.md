# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
## Câu A1 (5đ) — DOM Tree
- DOM tree (sơ đồ cây)
```
                        Document
                           |
                        div#app
                       /       \
                  header        main
                 /      \      /    \
               h1       nav  form#todoForm   ul#todoList
                         |     /       \         /      \
                         a     input  button    li      li
                         a                     (.todo-item) (.todo-item.completed)
                         a

```

- querySelector cho:
    + Chọn thẻ ```<h1>```:  ```document.querySelector('h1');```
    + Chọn input trong form: ```document.querySelector('#todoForm input');```
    + Chọn tất cả .todo-item:```document.querySelectorAll('.todo-item');```
    + Chọn link đang active:```document.querySelector('nav a.active');```
    + Chọn ```<li>``` đầu tiên trong #todoList:```document.querySelector('#todoList li');```
    + Chọn tất cả ```<a>``` bên trong ```<nav>```: ```document.querySelectorAll('nav a');```

# Câu A2 (5đ) — innerHTML vs textContent
1. Sự khác nhau giữa innerHTML và textContent

| Tiêu chí	| innerHTML	| textContent |
|--:|--:|--:|
| Bản chất |	Lấy hoặc thay đổi nội dung HTML (bao gồm cả các thẻ tag) bên trong phần tử.	| Lấy hoặc thay đổi văn bản thuần túy (gốc) bên trong phần tử, loại bỏ tất cả thẻ HTML. |
| Hiệu năng	| Chậm hơn vì trình duyệt phải biên dịch (parse) chuỗi thành các phần tử DOM.	| Nhanh hơn vì trình duyệt chỉ xử lý nó như một chuỗi văn bản thuần túy. |
| Độ an toàn | Kém an toàn, dễ bị tấn công Cross-Site Scripting (XSS) nếu chèn dữ liệu chưa kiểm duyệt từ user. | An toàn tuyệt đối trước XSS vì mọi ký tự nguy hiểm (như <, >) đều được biến thành text an toàn. |

- Khi nào nên dùng?
  + Dùng innerHTML khi: Bạn chủ động muốn chèn một đoạn mã cấu trúc HTML mới vào trang (ví dụ: tạo một danh sách <li> từ một mảng dữ liệu có sẵn của hệ thống).
  + Dùng textContent khi: Bạn chỉ muốn cập nhật chữ (text) như tên người dùng, số lượng, tiêu đề bài viết, hoặc hiển thị chính xác những gì người dùng nhập vào.

2. Tại sao innerHTML có thể gây lỗ hổng XSS?
- Lỗ hổng XSS (Cross-Site Scripting) xảy ra khi kẻ tấn công lừa trình duyệt thực thi các đoạn mã JavaScript độc hại trên máy của người dùng khác.
- Khi bạn dùng innerHTML, trình duyệt sẽ đọc chuỗi truyền vào và cố gắng chuyển đổi nó thành các node DOM. Nếu chuỗi đó chứa mã độc, trình duyệt vẫn sẽ biên dịch và chạy nó.
- Phân tích ví dụ minh họa:
```
// Giả sử user cố tình nhập chuỗi này vào ô tìm kiếm:
// <img src=x onerror="alert('Hacked!')">

const userInput = document.querySelector("#search").value;

// Trình duyệt biên dịch chuỗi này thành một thẻ <img>
document.querySelector("#result").innerHTML = userInput;
```
- Cơ chế kích hoạt mã độc:
  + Trình duyệt cố gắng tải ảnh từ nguồn src="x" (đây là một nguồn sai/không tồn tại).
  + Vì tải ảnh thất bại, sự kiện lỗi onerror được kích hoạt ngay lập tức.
  + Đoạn mã nằm trong onerror (ở đây là alert('Hacked!'), hoặc nguy hiểm hơn là lấy cắp Token/Cookie document.cookie) sẽ bị thực thi.
3. Cách sửa để đảm bảo an toàn
Có 2 cách chính để khắc phục tùy thuộc vào mục đích hiển thị của bạn:
- **Cách 1:** Thay bằng textContent (Khuyến khích nhất)
Nếu bạn chỉ muốn hiển thị chuỗi tìm kiếm của user ra màn hình dưới dạng văn bản thuần túy, hãy đổi sang textContent. Trình duyệt sẽ tự động mã hóa các ký tự đặc biệt, biến thẻ <img> thành một chuỗi chữ vô hại.
```
const userInput = document.querySelector("#search").value;
// AN TOÀN: Thẻ <img> của user sẽ hiển thị ra màn hình dưới dạng chữ chứ không chạy mã độc
document.querySelector("#result").textContent = userInput;
```
- **Cách 2:** Sử dụng các thư viện "Làm sạch" (Sanitize) HTML
Trong trường hợp bạn bắt buộc phải cho phép người dùng nhập HTML (ví dụ: trình soạn thảo văn bản phong phú - Rich Text Editor) nhưng cần loại bỏ mã độc, hãy sử dụng các thư viện chuyên dụng như DOMPurify trước khi gán vào innerHTML.
```
// Cần nhúng thư viện DOMPurify trước khi dùng
const userInput = document.querySelector("#search").value;

// Làm sạch chuỗi đầu vào, loại bỏ các thuộc tính nguy hiểm như onerror, onload, <script>
const cleanInput = DOMPurify.sanitize(userInput);

// Bây giờ gán vào innerHTML đã an toàn
document.querySelector("#result").innerHTML = cleanInput;

```
## Câu A3 (5đ) — Event Bubbling
1. Khi CLICK vào BUTTON (Mặc định - Chưa bỏ comment e.stopPropagation()).
- Kết quả Output:
```
BUTTON
INNER
OUTER
```
- Giải thích cơ chế:Theo mặc định trong JavaScript, các sự kiện (event) hoạt động theo cơ chế Event Bubbling. Khi bạn click vào một phần tử nằm trong cùng (ở đây là #btn), sự kiện click sẽ kích hoạt hàm xử lý của chính nó trước, sau đó nó sẽ "nổi bọt" ngược lên các phần tử cha bao ngoài nó theo thứ tự từ trong ra ngoài:
    + Đầu tiên, kích hoạt hàm của #btn -> In ra BUTTON.
    + Sự kiện nổi bọt lên phần tử cha trực tiếp là #inner -> In ra INNER.
    + Sự kiện tiếp tục nổi bọt lên phần tử cha ngoài cùng là #outer -> In ra OUTER.2.
2. Nếu BỎ COMMENT e.stopPropagation()
- Kết quả Output:
```
BUTTON
```
- Giải thích cơ chế:Hàm e.stopPropagation() có nhiệm vụ ngăn chặn sự kiện tiếp tục nổi bọt lên các phần tử cha phía trên nó.Khi bạn click vào nút bấm:
    + Trình duyệt chạy hàm xử lý của #btn -> In ra BUTTON.
    + Ngay sau đó, dòng lệnh e.stopPropagation() được thực thi. Nó giống như một bức tường chặn đứng sự kiện click lại tại đây.
    + Sự kiện bị triệt tiêu hoàn toàn và không thể lan truyền lên #inner hay #outer được nữa. Do đó, các hàm xử lý của hai thẻ div cha sẽ không bao giờ được chạy.
