# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
## Câu A1 (5đ) — Sync vs Async
- Dự đoán kết quả thứ tự Output
```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
5 - Timeout 100ms
7 - Nested timeout
```
**Giải thích Event Loop, Microtask Queue, Macrotask Queue.**
- Để hiểu tại sao có thứ tự trên, chúng ta cần nắm rõ cách phối hợp giữa Call Stack, Microtask Queue và Macrotask Queue trong JavaScript Engine.
- Các khái niệm cốt lõi:
  + Call Stack (Ngăn xếp tiếng gọi): Nơi chứa các hàm đang được thực thi tuần tự (LIFO - Last In, First Out). JavaScript là đơn luồng (single-threaded), nên tại một thời điểm chỉ có một tác vụ được xử lý ở Call Stack.
  + Microtask Queue (Hàng đợi vi tác vụ): Chứa các tác vụ có độ ưu tiên cao, chủ yếu là các callback của Promise.then(), async/await, hoặc MutationObserver.
  + Macrotask Queue / Callback Queue (Hàng đợi đại tác vụ): Chứa các tác vụ có độ ưu tiên thấp hơn, như setTimeout, setInterval, setImmediate, hoặc các sự kiện I/O (click, scroll...).
⚠️ Quy tắc vàng của Event Loop: 
1. Thực thi toàn bộ code đồng bộ (Synchronous) trong Call Stack cho đến khi trống rỗng.
2. Kiểm tra và thực thi TẤT CẢ các tác vụ có trong Microtask Queue cho đến khi queue này sạch bóng.
3. Lấy MỘT (chỉ 1) tác vụ từ Macrotask Queue bỏ vào Call Stack để thực thi.
4. Lặp lại bước 2 (Kiểm tra lại Microtask Queue trước khi qua Macrotask tiếp theo).
**Phân tích từng bước thực thi (Step-by-Step)**
- Bước 1: Thực thi Code đồng bộ (Synchronous)
  + ```console.log("1 - Start")```: Chạy ngay lập tức -> In ra: 1 - Start.
  + ```setTimeout(..., 0)``` (Timeout 0ms): Được đẩy sang Web APIs xử lý. Vì thời gian chờ là 0ms, callback của nó (2 - Timeout 0ms) lập tức được đẩy vào Macrotask Queue.
  + ```Promise.resolve().then(...)``` (Promise 1): Callback của nó (3 - Promise) được đưa vào Microtask Queue.
  + ```console.log("4 - End")```: Chạy ngay lập tức -> In ra: 4 - End.
  + ```setTimeout(..., 100)``` (Timeout 100ms): Đẩy sang Web APIs. Sau 100ms, callback (5 - Timeout 100ms) mới được xếp vào Macrotask Queue.Promise.
  + ```resolve().then(...)``` (Promise 2): Callback của nó được đưa vào Microtask Queue.
  + **Trạng thái hiện tại sau khi chạy xong code đồng bộ:**
    + Màn hình đã in: 1 - Start, 4 - End
    + Microtask Queue: [Callback Promise 1, Callback Promise 2]
    + Macrotask Queue: [Callback Timeout 0ms] (Còn Timeout 100ms đang đợi Web APIs đếm giờ).
- Bước 2: Quét sạch Microtask QueueTheo quy tắc, Event Loop sẽ ưu tiên xử lý hết Microtask trước.
  + Lấy Callback Promise 1 ra thực thi -> In ra: 3 - Promise.
  + Lấy Callback Promise 2 ra thực thi:
    + In ra: 6 - Promise 2.
    + Bên trong có một setTimeout(..., 0) (Nested timeout). Callback này lập tức được đẩy vào cuối Macrotask Queue.
  + Trạng thái hiện tại:
    + Màn hình đã in: 1 - Start, 4 - End, 3 - Promise, 6 - Promise 2
    + Microtask Queue: [] (Trống rỗng)
    + Macrotask Queue: [Callback Timeout 0ms, Callback Nested timeout]
Bước 3: Xử lý Macrotask Queue (Từng cái một)
Khi Microtask Queue đã trống, Event Loop chuyển sang Macrotask Queue.
  + Lấy Macrotask đầu tiên (Callback Timeout 0ms) -> In ra: 2 - Timeout 0ms.
  + Event Loop kiểm tra lại xem có Microtask mới không? Không có.
  + Lấy Macrotask tiếp theo (Callback Nested timeout) -> In ra: 7 - Nested timeout.
  + Sau cùng, khi đủ 100ms trôi qua, Callback Timeout 100ms được đẩy vào Macrotask Queue và được thực thi cuối cùng -> In ra: 5 - Timeout 100ms.
