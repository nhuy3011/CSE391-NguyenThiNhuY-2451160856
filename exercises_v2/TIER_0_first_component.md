# Cấp 0 — Thành phần đầu tiên (Làm quen với cú pháp React)
## Bài 0.1 — Chạy React đầu tiên (5 phút)
1. Tệp .jsx khác tệp nào .js?
- Tệp .js: Chỉ hiểu cú pháp JavaScript thuần túy. Nếu bạn viết code HTML (như ```<h1>...</h1>```) vào giữa file .js, trình biên dịch sẽ báo lỗi cú pháp ngay lập tức.
- Tệp .jsx: Là tệp JavaScript mở rộng. Bản chất nó cho phép bạn trộn lẫn HTML vào trong JavaScript một cách hợp lệ. Trình đóng gói (Vite) sẽ tự động biến các thẻ HTML đó thành code JS thực sự ở "hậu trường".

2. Tại sao phải export default App?
- Trong một dự án React, chúng ta chia giao diện thành hàng trăm file nhỏ (Components) cho dễ quản lý.
- Lệnh export default App giống như việc bạn thông báo: "File này có hàm App là sản phẩm chính, ai muốn dùng thì cứ vào đây mà lấy". Nhờ dòng này, file src/main.jsx mới có thể gọi lệnh import App from './App' để đưa giao diện của bạn lên màn hình trình duyệt.

3. Thử xóa export default→ chuyện gì xảy ra?
- **Hiện tượng:** Dự án sẽ sập ngay lập tức (Bị lỗi màn hình trắng hoặc Terminal báo lỗi: "The requested module '/src/App.jsx' does not provide an export named 'default'").
- **Lý do:** File main.jsx (cổng vào chính của ứng dụng) đi tìm hàm App để render nhưng tìm không thấy vì bạn đã "giấu" nó đi (không export).
