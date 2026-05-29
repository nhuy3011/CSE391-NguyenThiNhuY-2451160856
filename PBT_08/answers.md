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
    + **Ví dụ minh họa TH1:** Chạy tốt với Function Declaration
  ```
      // Gọi hàm TRƯỚC KHI khai báo
console.log(tinhThueBaoHiemDeclaration(15000000)); 
// Kết quả: { thuong: 1500000, thuc_nhan: 13500000 }

function tinhThueBaoHiemDeclaration(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
} 
```
  + **Ví dụ minh họa TH2:** Lỗi ngay với Function Expression / Arrow Function
```
    // Gọi hàm TRƯỚC KHI khai báo
console.log(tinhThueBaoHiemExpression(15000000)); 
// ❌ LỖI: ReferenceError: Cannot access 'tinhThueBaoHiemExpression' before initialization

const tinhThueBaoHiemExpression = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
};
```
     
