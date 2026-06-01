# Cấp 1 — Hiểu hoạt động của React
## Bài 1.1 — Component render lần đầu (8 phút)
**Thử nghiệm**
1. Mở bảng điều khiển (F12)
<img width="1879" height="882" alt="Screenshot 2026-06-01 141111" src="https://github.com/user-attachments/assets/5941779d-39b4-4d4e-a27a-5cbcace82ee3" />
2. Làm mới trang
<img width="1860" height="897" alt="Screenshot 2026-06-01 141220" src="https://github.com/user-attachments/assets/696e5387-c7c8-4d6a-a5d0-1e03c2a88551" />
3. Khi nhìn vào tab Console, sẽ thấy dòng chữ ```1️⃣ Component được gọi!``` xuất hiện **2 LẦN** liên tiếp chứ không phải **1 lần!** Tại sao lại xuất hiện 2 lần? Có phải code bị lỗi không?

- Không hề lỗi! Đó là do trong file src/main.jsx của bạn đang bật chế độ <StrictMode> (Chế độ nghiêm ngặt của React). Chế độ này cố tình kích hoạt hàm của bạn 2 lần ở môi trường phát triển (Development) để giúp bạn kiểm tra xem code có bị rò rỉ dữ liệu hay không. Khi bạn đóng gói dự án để chạy thật, nó sẽ chỉ chạy đúng 1 lần duy nhất.

**Câu hỏi**
1. Tại sao thành phần chỉ render 1 lần?
- Bởi vì toàn bộ giao diện bên trong hàm LifecycleDemo đều là dữ liệu tĩnh (chữ viết chết, không thay đổi). Sau khi React thực hiện xong bước Mount (lắp ghép đống HTML này vào trình duyệt lần đầu tiên), nó thấy không có bất kỳ yếu tố hay dữ liệu nào thay đổi, nên nó sẽ "đứng im" để tiết kiệm hiệu năng cho máy tính.
2. Khi nào nó sẽ hiển thị lại?
- React chỉ chấp nhận mất công vẽ lại giao diện (Re-render) khi và chỉ khi rơi vào các trường hợp sau:
  + Trạng thái bên trong nó thay đổi (State thay đổi): Đây là lúc ta dùng đến useState (sẽ học ở Tier 4). Ví dụ: Khi bạn bấm nút tăng số lượng hàng trong giỏ, số thay đổi ➡️ giao diện phải vẽ lại số mới.
  + Dữ liệu từ bên ngoài truyền vào thay đổi (Props thay đổi): (Sẽ học ở các Tier sau).
  + Component cha của nó bị Re-render: Khi component cha (ở đây là App) bị ép phải vẽ lại giao diện, thì tất cả các con nằm bên trong nó (như LifecycleDemo) cũng sẽ bị gọi lại theo dây chuyền.
