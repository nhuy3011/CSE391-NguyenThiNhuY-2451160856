# PHẦN A — ĐỌC HIỂU (20 điểm)
## Câu A1 (10đ) — Hệ thống lưới
**BẢNG PHÂN TÍCH BỐ CỤC**

| Kích thước màn hình	| < 768px (Mobile)	| 768px - 991px (Tablet / md)	| ≥ 992px (Desktop / lg) |
| :--- | :----: | ---: |---: |
| Số cột | 12 / 12 (mỗi box chiếm 100% chiều rộng)	| 6 / 12 (mỗi box chiếm 50% chiều rộng)	| 3 / 12 (mỗi box chiếm 25% chiều rộng) |
| Bố cục hộp | Xếp chồng thành 4 hàng(1 box mỗi hàng) | Chia thành 2 hàng(2 box mỗi hàng) | Nằm cùng 1 hàng(4 box trên một hàng) |

1. col-md-6 nghĩa là gì?
- col: Viết tắt của Column (Cột).
- md: Định vị breakpoint Medium (áp dụng cho các màn hình có độ rộng từ 768px trở lên)
- 6: Chiếm 6 phần trong tổng số 12 phần của hệ thống lưới (tương đương với 50% chiều rộng của hàng bọc nó).
- Ý nghĩa đầy đủ: Trên các thiết bị có màn hình từ kích thước Tablet trở lên (>=768px) phần tử này sẽ chiếm một nửa chiều rộng màn hình.
2. Tại sao không cần viết col-sm-12?
- Trong đoạn mã trên, việc viết thêm col-sm-12 là hoàn toàn dư thừa vì 2 lý do cốt lõi của Bootstrap:
  + Bản chất Mobile-First: Bootstrap được thiết kế ưu tiên cho di động trước. Class col-12 không gắn breakpoint sẽ áp dụng cho tất cả các màn hình từ nhỏ nhất trở lên (từ 0px đến vô cực).
  + Cơ chế ghi đè xuôi: col-12 đã đặt độ rộng 100% cho màn hình nhỏ. Khi màn hình tăng dần lên kích thước sm (576px - 767px), do không có class nào chặn lại, nó vẫn sẽ kế thừa độ rộng 100% từ col-12. Phải đến khi chạm mốc md (768px), class col-md-6 mới nhảy vào kích hoạt để ghi đè cấu trúc lên thành 50%.
Do đó, từ khoảng màn hình sm (576px đến 767px) phần tử đã tự động full-width rồi, không cần tốn công khai báo col-sm-12.

## Câu A2 (10đ) — Tiện ích & Linh kiện
**1. Lớp giải thích d-none d-md-block. Phần tử này hiển thị khi nào, ẩn khi nào?**
- Đây là sự kết hợp của hai lớp tiện ích về hiển thị (Display utilities) hoạt động theo nguyên lý Mobile-First (tác động từ màn hình nhỏ đến màn hình lớn).
- d-none: Ẩn phần tử này trên tất cả các kích thước màn hình (bắt đầu từ màn hình nhỏ nhất < 576px).
- d-md-block: Bắt đầu từ màn hình kích thước Trung bình (Medium $\ge$ 768px) trở lên, thuộc tính hiển thị của phần tử sẽ được ghi đè thành display: block.
- Kết luận:
    + Ẩn khi nào: Màn hình nhỏ hơn 768px (Bao gồm các thiết bị Mobile diện Extra Small < 576px và Small từ 576px - 776px).
    + Hiển thị khi nào: Màn hình từ 768px trở lên (Bao gồm các thiết bị từ Tablet, Desktop cho đến màn hình cực lớn).
**2. Liệt kê 5 tiện ích giãn cách (lề/padding) và giải thích. VĐ: mt-3, px-4,mb-auto**
Các tiện ích giãn cách trong Bootstrap tuân theo cú pháp: {thuộc tính}{hướng}-{kích thước}. Trong đó kích thước từ 0 đến 5 tương ứng với các mức độ tăng dần dựa trên chuẩn $spacer (mặc định 1rem = 16px).
- mt-3 (Margin Top 3):
  + Giải thích: Thêm khoảng cách lề bên trên của phần tử.
  + Mức độ: Mức 3 bằng chính xác với $spacer (tương đương 1rem hoặc 16px).
- px-4 (Padding X 4):
  + Giải thích: Thêm khoảng cách đệm bên trong cho cả 2 bên Trái (Left) và Phải (Right) theo trục hoành X.
  + Mức độ: Mức 4 bằng $spacer * 1.5 (tương đương 1.5rem hoặc 24px).
- mb-auto (Margin Bottom Auto):
  + Giải thích: Tự động căn khoảng cách lề bên dưới của phần tử.
  + Ứng dụng: Thường dùng trong Flexbox để đẩy các phần tử khác xuống dưới cùng hoặc đẩy chính nó lên trên cùng của thẻ bọc.
- py-2 (Padding Y 2):
  + Giải thích: Thêm khoảng cách đệm bên trong cho cả 2 hướng Trên (Top) và Dưới (Bottom) theo trục tung Y.
  + Mức độ: Mức 2 bằng $spacer * 0.5 (tương đương 0.5rem hoặc 8px).
- ms-5 (Margin Start 5):
  + Giải thích: Thêm khoảng cách lề bên trái (Trong Bootstrap 5, s - start thay thế cho l - left để hỗ trợ các ngôn ngữ đọc từ phải sang trái).
  + Mức độ: Mức 5 là mức lớn nhất bằng $spacer * 3 (tương đương 3rem hoặc 48px).

**3. Sự khác nhau giữa .container, .container-fluid, .container-md?**
| Tiêu chí so sánh	| .container (Cố định - Fixed)	| .container-fluid (Toàn màn hình - Fluid)	| .container-md (Breakpoints cố định)|
| :--- | :----: | ---: |---: |
| Bản chất	| Co giãn theo từng nấc kích thước màn hình cố định, tự động tạo lề trống hai bên khi màn hình lớn.	| Luôn luôn lấp đầy 100% chiều rộng của màn hình bất kể thiết bị lớn hay nhỏ.	| Hoạt động giống hệt như .container-fluid trên màn hình nhỏ, và chuyển thành .container trên màn hình lớn. |
| Độ rộng trên Mobile (<= 768px)	| Chiếm 100% chiều rộng màn hình.	| Chiếm 100% chiều rộng màn hình.	| Chiếm 100% chiều rộng màn hình.|
| Độ rộng trên Desktop (>=992px) | Bị giới hạn chiều rộng tối đa (max-width: 960px) và căn giữa. | Vẫn tiếp tục tràn ra 100% chiều rộng màn hình. | Bị giới hạn chiều rộng tối đa (max-width: 960px) và căn giữa y hệt .container. |
| Trường hợp áp dụng	| Làm khung bọc cho nội dung chính của website (như bài viết, danh sách sản phẩm) để nội dung không bị dạt ra quá sát mép màn hình lớn.	| Làm banner lớn đầu trang (Hero Section), thanh menu điều hướng (Navbar) hoặc chân trang (Footer) khi muốn màu nền hoặc nội dung trải dài hết màn hình.	| Thích hợp cho các layout muốn hiển thị tràn viền mềm mại trên các thiết bị di động/máy tính bảng nhỏ, nhưng cần gom gọn gàng lại khi xem trên máy tính để bàn |

# PHẦN C — PHÂN TÍCH (20 điểm)
## Câu C1 (10đ) — Bootstrap tùy biến
1. Quy trình đổi màu $primary từ mặc định sang màu đỏ #E63946
- Bootstrap 5 được viết bằng SASS (Syntactically Awesome Style Sheets). Để đổi màu chủ đạo hệ thống một cách triệt để, chúng ta không sửa file CSS đã biên dịch sẵn mà phải can thiệp trực tiếp vào mã nguồn SASS của Bootstrap thông qua các bước sau:
- Các công cụ cần thiết
  + Node.js & npm: Để cài đặt môi trường và các gói thư viện.
  + Trình biên dịch SASS: Phổ biến nhất là gói sass (Dart Sass) cài qua npm.
  + Trình soạn thảo mã nguồn: VS Code (khuyên dùng kèm extension Live Sass Compiler nếu không muốn gõ lệnh).
- Các tệp tin cần thiết và cách sửa đổi
  + Bước 1: Tạo tệp cấu hình riêng. Tạo một file SASS riêng của bạn, ví dụ tên là custom.scss nằm chung thư mục dự án. Tuyệt đối không sửa trực tiếp vào file trong thư mục node_modules/bootstrap vì khi cập nhật thư viện, mọi sửa đổi sẽ bị xóa sạch.
 + Bước 2: Viết mã nguồn ghi đè biến trong custom.scss. Mở file custom.scss vừa tạo và viết theo cấu trúc bắt buộc sau:

**SCSS**
1. Khai báo màu mới của bạn
$custom-danger-red: #E63946;
2. Ghi đè biến hệ thống của Bootstrap trước khi import lõi
$primary: $custom-danger-red;
3. Tiến hành Nhập (Import) toàn bộ mã nguồn SASS của Bootstrap vào
@import "../node_modules/bootstrap/scss/bootstrap";
Bước 3: Biên dịch file SASS thành CSS
Chạy lệnh biên dịch trong terminal để chuyển đổi file custom.scss thành file CSS thông thường mà trình duyệt có thể đọc được:
**Bash**
npx sass custom.scss assets/css/bootstrap.custom.css
Cuối cùng, chỉ cần nhúng file bootstrap.custom.css vừa tạo vào file HTML của mình thay cho file Bootstrap mặc định là xong.

2. Tại sao KHÔNG NÊN ghi đè trực tiếp .btn-primary { background: red; }?
- Việc viết đè CSS thủ công theo kiểu cũ (.btn-primary { background: red; }) tuy nhanh nhưng là một "bẫy tai hại" trong dự án thực tế vì các lý do cốt lõi sau:
  +  Làm phá vỡ tính đồng bộ và nhất quán hệ thống (Design System)
  +  Biến $primary trong Bootstrap không chỉ quản lý mỗi màu nền của nút bấm (.btn-primary). Nó là linh hồn kết nối hàng loạt thành phần khác nhau. Nếu bạn chỉ đè CSS cho .btn-primary, bạn sẽ phải tự tay đi đè tiếp hàng trăm class khác như:Màu chữ của các liên kết: .text-primaryMàu nền thông báo, huy hiệu: .bg-primary, .badge-primary. Các trạng thái tương tác: .btn-primary:hover, .btn-primary:active, .btn-primary:focusĐường viền, thanh điều hướng, các ô lựa chọn đang kích hoạt: .border-primary, .nav-pills .nav-link.active, .form-check-input:checked
 + SASS sở hữu cơ chế tự động tính toán thông minh (Color Functions). Khi bạn đổi màu $primary bằng SASS, Bootstrap sẽ sử dụng các hàm toán học nội bộ để tự động tính toán ra các dải màu phái sinh chính xác tuyệt đối:Tự động tính toán màu đậm hơn 10\% cho trạng thái Hover, đậm hơn 15\% cho trạng thái Active.Tự động tính toán màu sắc tương phản cho phần chữ (chuyển chữ thành màu trắng hoặc đen thông qua hàm color-contrast()) giúp nút bấm luôn đạt chuẩn dễ đọc, không bao giờ bị tình trạng nền đỏ chữ xanh lỗi font.Tóm lại: Dùng biến SASS giúp bạn "sửa 1 nơi, đổi 1000 chỗ", đảm bảo toàn bộ giao diện đổi màu đồng bộ một cách khoa học, sạch sẽ và chuyên nghiệp bậc nhất.
