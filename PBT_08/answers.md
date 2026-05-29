# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 (5đ) — Function Declaration vs Expression vs Arrow
- **Cách 1:** Function Declaration (Khai báo hàm)
```
  function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong: thue, // Giữ nguyên key 'thuong' theo yêu cầu đề bài
        thuc_nhan: luong - thue
    };
}
```
- **Cách 2:** Function Expression (Biểu thức hàm)
```
  const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};
```
- **Cách 3:** Arrow Function (Hàm mũi tên)
```
  const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};
```
- Ba cách này **CÓ** khác nhau về cơ chế Hoisting. Khác biệt cốt lõi:
    + **Function Declaration:** Được hoisting hoàn toàn (cả tên và phần thân hàm). Bạn có thể gọi hàm trước khi khai báo nó.
    + **Function Expression & Arrow Function:** Phụ thuộc vào từ khóa khai báo biến (var, let, const). Ở đây chúng ta dùng const, chúng sẽ rơi vào vùng chết tạm thời (Temporal Dead Zone - TDZ). Bạn không thể gọi hàm trước khi khai báo, nếu cố tình gọi sẽ bị lỗi ReferenceError.
- **Ví dụ minh họa TH1:** Chạy tốt với Function Declaration
```
console.log(tinhThueBaoHiemDeclaration(15000000)); 
function tinhThueBaoHiemDeclaration(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
} 
```
- **Ví dụ minh họa TH2:** Lỗi ngay với Function Expression / Arrow Function
```
console.log(tinhThueBaoHiemExpression(15000000)); 
const tinhThueBaoHiemExpression = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
};
```


## Câu A2 (5đ) — Scope & Closure
- Dự đoán output:
```
//Đoạn 1
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
```
- Đoạn 2: 
var: 3

var: 3

var: 3

let: 0

let: 1

let: 2

**Giải thích:** Sự khác biệt cốt lõi nằm ở Scope (Phạm vi) của hai từ khóa này kết hợp với cơ chế bất đồng bộ của setTimeout.
1. Với vòng lặp var (Function/Global Scope)
  - Biến var i không có phạm vi khối (block scope), nên nó được đưa ra làm biến toàn cục (hoặc phạm vi hàm bao ngoài).
  - Trong suốt vòng lặp, chỉ có duy nhất một biến i được tạo ra và bị ghi đè giá trị sau mỗi block for (i tăng từ 0 -> 1 -> 2, và dừng lại khi i = 3).
setTimeout là một hàm bất đồng bộ. Nó xếp hàng các callback trong Web APIs và đợi vòng lặp chạy xong xuôi (Call Stack trống) rồi mới thực thi.
  - Sau 100ms, khi các callback của var bắt đầu chạy, vòng lặp đã kết thúc từ lâu và biến i lúc này đã bằng 3. Do đó, cả 3 callback đều nhìn vào biến i chung này và in ra var: 3.
2. Với vòng lặp let (Block Scope)
  - Biến let j có Block Scope (phạm vi khối).
  - Cơ chế của JavaScript đối với let trong vòng lặp for là: Mỗi một lượt lặp (iteration), JavaScript lại tạo ra một biến j hoàn toàn mới và "chụp" (capture) lại giá trị của j tại thời điểm đó.
  - Chúng ta có 3 lượt lặp tương ứng với 3 biến j riêng biệt nằm ở 3 phạm vi khối khác nhau: j_lượt_1 = 0, j_lượt_2 = 1, j_lượt_3 = 2.
  - Nhờ vào Closure, mỗi callback của setTimeout sẽ "nhớ" chính xác biến j riêng của lượt lặp mà nó được tạo ra. Khi hết 200ms và các callback được gọi, chúng in ra đúng giá trị được "chụp" lại ban đầu: 0, 1, 2.
