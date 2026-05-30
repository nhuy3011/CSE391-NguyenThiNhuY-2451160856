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

## Câu A2 (5đ) — Fetch API
**Giải thích chi tiếp từng dòng code:**
- ```async function getData() {``` : Định nghĩa một hàm bất đồng bộ (asynchronous function) tên là getData. Từ khóa async cho phép chúng ta sử dụng từ khóa await bên trong thân hàm và tự động biến hàm này luôn trả về một Promise.
- ```try {``` : Bắt đầu một khối lệnh try...catch để giám sát và xử lý bất kỳ lỗi (exception) nào có thể xảy ra trong quá trình thực thi các dòng code bên trong.
- ```const response = await fetch("https://api.example.com/data");``` : Gọi hàm fetch() để gửi một yêu cầu HTTP GET đến URL được chỉ định. Từ khóa await sẽ tạm dừng hàm getData cho đến khi Promise của fetch được giải quyết (resolved), sau đó gán đối tượng Response nhận được vào biến response.
- ```if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        ```
Kiểm tra xem phản hồi từ server có thành công hay không (HTTP status nằm trong khoảng 200-299). Nếu không thành công (!response.ok), hàm sẽ chủ động "ném" (throw) ra một lỗi mới kèm theo mã trạng thái HTTP, lập tức nhảy xuống khối catch.
- ```const data = await response.json();``` : Đọc luồng dữ liệu từ thân (body) của phản hồi và chuyển đổi (parse) nó từ định dạng chuỗi JSON thành một đối tượng JavaScript. Vì quá trình đọc và parse này là bất đồng bộ, chúng ta cần await để đợi nó hoàn thành trước khi gán kết quả vào biến data.
- ```return data;``` : Nếu mọi thứ trơn tru, hàm sẽ trả về dữ liệu đã được parse thành công. (Promise của hàm getData lúc này sẽ ở trạng thái fulfilled với giá trị là data).
- ```} catch (error) {``` : Khối lệnh này sẽ được kích hoạt nếu có bất kỳ lỗi nào xảy ra ở các dòng code nằm trong khối try phía trên. Biến error sẽ chứa thông tin về lỗi đó.
- ```console.error("Failed:", error.message);``` : Ghi log thông báo lỗi ra màn hình console để lập trình viên dễ dàng debug.
- ```return null;``` : Trả về null trong trường hợp xảy ra lỗi, giúp hàm không bị crash dữ dội mà vẫn trả về một giá trị an toàn để các hàm gọi nó phía sau xử lý tiếp.
**Giải thích:**
1. await fetch(...) — Fetch trả về gì? Tại sao cần await?
- fetch() trả về gì? Hàm fetch() ngay lập tức trả về một Promise, mà khi được giải quyết (resolved) sẽ trả ra một đối tượng Response (đây mới chỉ là phần headers và thông tin cấu hình của phản hồi, chưa bao gồm dữ liệu body hoàn chỉnh).
- Tại sao cần await? Vì việc gửi yêu cầu qua mạng Internet mất thời gian (bất đồng bộ). await được dùng để tạm dừng việc thực thi hàm, đợi cho đến khi server phản hồi xong và Promise chuyển sang trạng thái thành công, giúp ta lấy được đối tượng Response để xử lý tiếp theo kiểu tuần tự (giống code đồng bộ).
2. response.ok — Khi nào false? Liệt kê 3 status codes tương ứng.
- Khi nào false? Thuộc tính response.ok sẽ trả về false khi mã trạng thái HTTP (HTTP status code) trả về từ server nằm ngoài khoảng 200–299. Điều này có nghĩa là server đã nhận được request nhưng phản hồi rằng có lỗi xảy ra phía client hoặc server.
- 3 status codes tương ứng:
  + 404 (Not Found - Không tìm thấy trang/API).
  + 500 (Internal Server Error - Lỗi hệ thống phía server).
  + 403 (Forbidden - Bị từ chối truy cập / Không có quyền).
3. response.json() — Tại sao cần await lần nữa?
- Tại sao cần await? Đối tượng Response nhận từ fetch ban đầu mới chỉ là các thông tin Metadata (Headers, Status...). Phần thân dữ liệu (Body) thực tế vẫn đang được truyền về dưới dạng một luồng dữ liệu (Stream).
- Hàm .json() đảm nhận nhiệm vụ đọc toàn bộ luồng dữ liệu này và parse nó thành object. Quá trình đọc stream qua mạng này tốn thời gian (bất đồng bộ), nên bản thân .json() cũng trả về một Promise. Vì vậy ta bắt buộc phải sử dụng await lần thứ hai để đợi quá trình parse này hoàn tất.
4. try...catch — Catch những lỗi gì?
- Khối catch trong đoạn code trên sẽ "bắt" được các loại lỗi sau:
- Network Error (Lỗi mạng): Có lỗi kết nối vật lý như mất mạng Internet, DNS bị lỗi, Server bị sập hoàn toàn không thể phản hồi, hoặc bị chặn bởi chính sách CORS. (Lúc này fetch sẽ tự động reject).
- Lỗi do lập trình viên tự ném ra (throw new Error): Chính là đoạn code if (!response.ok) { throw new Error(...) }. Khi gặp các lỗi HTTP như 404 hay 500, bản thân fetch không tự coi là lỗi (nó vẫn kết nối thành công tới server), nên ta phải tự throw để catch có thể bắt được.
- JSON Parse Error (Lỗi cú pháp JSON): Nếu server phản hồi thành công (ví dụ 200 OK) nhưng dữ liệu trả về lại là một chuỗi HTML lỗi hoặc text thông thường chứ không phải format JSON hợp lệ, hàm response.json() sẽ bị lỗi và khối catch sẽ bắt được lỗi này.

## Câu A3 (5đ) — Promise States
- Sơ đồ 3 trạng thái của Promise:
```
+-------------------+
                  |      PENDING      |  (Đang chờ xử lý,
                  |                   |   chưa có kết quả)
                  +-------------------+
                    /               \
          resolve() /                 \ reject()
                   /                   \
                  v                     v
        +-------------------+     +-------------------+
        |     FULFILLED     |     |     REJECTED      |
        |  (Thành công,     |     |  (Thất bại,       |
        |   có dữ liệu)     |     |   có lỗi/error)   |
        +-------------------+     +-------------------+
```
- Callback Hell là gì?
  + Callback Hell (hay còn gọi là Pyramid of Doom - Kim tự tháp hủy diệt) là hiện tượng các hàm bất đồng bộ lồng nhau quá nhiều tầng thông qua các hàm gọi lại (callback).
  + Khi một tác vụ bất đồng bộ phụ thuộc vào kết quả của một tác vụ bất đồng bộ trước đó, lập trình viên buộc phải viết mã lồng vào trong. Khi số lượng tác vụ tăng lên, mã nguồn sẽ phát triển theo chiều ngang (bị thụt đầu dòng quá sâu), dẫn đến cấu trúc code có dạng hình tam giác/kim tự tháp.
  + Hậu quả của Callback Hell:
    + Cực kỳ khó đọc và bảo trì: Rất khó để tracking luồng chạy của dữ liệu.
    + Trầm cảm khi debug: Việc bắt lỗi (try...catch hoặc xử lý tham số err) ở từng tầng trở nên rối rắm.
    + Khó tái sử dụng: Các hàm bị bó chặt và phụ thuộc khăng khít vào nhau.
- Ví dụ: Ví dụ 4 cấp callback hell → Refactor thành async/await.
**Bài toán giả định:** Quy trình mua hàng online gồm 4 bước liên tiếp: Đăng nhập (login) -> 2. Lấy giỏ hàng (getCart) -> 3. Thanh toán (checkout) -> 4. Gửi email xác nhận (sendEmail).
  
❌ Phiên bản "Callback Hell" (4 cấp lồng nhau)JavaScript// Giả định các hàm nhận vào callback cuối cùng
```
function login(username, callback) {
    setTimeout(() => callback(null, { userId: 1, name: username }), 500);
}
function getCart(userId, callback) {
    setTimeout(() => callback(null, { cartId: 101, items: ['Laptop'] }), 500);
}
function checkout(cartId, callback) {
    setTimeout(() => callback(null, { orderId: 999, total: 1500 }), 500);
}
function sendEmail(orderId, callback) {
    setTimeout(() => callback(null, `Email sent for order ${orderId}`), 500);
}

// Thực thi bóc tách dữ liệu theo kiểu Callback Hell
login("john_doe", (err, user) => {
    if (err) return console.error(err);
    console.log("Logged in:", user.name);

    getCart(user.userId, (err, cart) => {
        if (err) return console.error(err);
        console.log("Cart fetched:", cart.items);

        checkout(cart.cartId, (err, order) => {
            if (err) return console.error(err);
            console.log("Checkout success:", order.orderId);

            sendEmail(order.orderId, (err, result) => {
                if (err) return console.error(err);
                console.log(result); // Cấp lồng thứ 4
                // Hết phim! Code bị thụt lề thành hình kim tự tháp.
            });
        });
    });
});
```
**Phiên bản nâng cấp sạch đẹp với Async/Await.** Để dùng được async/await, trước hết ta chuyển đổi các hàm callback truyền thống thành các hàm trả về Promise (đây gọi là quá trình Promisify).
```
const login = (username) => new Promise(resolve => setTimeout(() => resolve({ userId: 1, name: username }), 500));
const getCart = (userId) => new Promise(resolve => setTimeout(() => resolve({ cartId: 101, items: ['Laptop'] }), 500));
const checkout = (cartId) => new Promise(resolve => setTimeout(() => resolve({ orderId: 999, total: 1500 }), 500));
const sendEmail = (orderId) => new Promise(resolve => setTimeout(() => resolve(`Email sent for order ${orderId}`), 500));

// Tiến hành Refactor quy trình xử lý chính
async function runOrderProcess() {
    try {
        const user = await login("john_doe");
        console.log("Logged in:", user.name);

        const cart = await getCart(user.userId);
        console.log("Cart fetched:", cart.items);

        const order = await checkout(cart.cartId);
        console.log("Checkout success:", order.orderId);

        const result = await sendEmail(order.orderId);
        console.log(result);
        
    } catch (error) {
        console.error("Quy trình bị lỗi tại bước nào đó:", error);
    }
}

// Chạy hàm quy trình
runOrderProcess();
```

