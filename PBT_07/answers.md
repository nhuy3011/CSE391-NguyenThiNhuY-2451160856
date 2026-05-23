# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1 (5đ) — var / let / const
| Đoạn Kết quả | Dự đoán / Thực tế | Khái niệm core cần nhớ |
| :--- | :----: | ---: |
| 1 |	undefined	| Hoisting với var |
| 2 |	ReferenceError: Cannot access 'y' before initialization	| Temporal Dead Zone (TDZ) với let |
| 3	| TypeError: Assignment to constant variable.	| Tính chất không thể gán lại của const |
| 4	| [1, 2, 3, 4]	| Tính chất Mutable (có thể thay đổi) của Object/Array) |
| 5 | Trong block: 2; Ngoài block: 1 | Block Scope của let | 

**Giải thích**
- Đoạn 1: Hiện tượng Hoisting với var
```
console.log(x);
var x = 5;
```
  + Kết quả: undefined
  + Giải thích: Khi JavaScript Engine quét qua đoạn code, nó sẽ "kéo" (hoist) phần khai báo var x; lên trên cùng của scope, nhưng chừa phần gán giá trị = 5 ở lại chỗ cũ. Do đó, tại thời điểm dòng console.log(x) chạy, biến x đã tồn tại trong bộ nhớ nhưng chưa được gán giá trị, dẫn đến kết quả là undefined.
Code thực tế chạy như sau:
```
var x; // Hoisting khai báo
console.log(x); // undefined
x = 5; // Gán giá trị
```
- Đoạn 2: Vùng chết tạm thời — Temporal Dead Zone (TDZ)
```
console.log(y);
let y = 10;
```
  + Kết quả: Báo lỗi ReferenceError
  + Giải thích: Khác với var, các biến khai báo bằng let và const tuy cũng được hoisting nhưng chúng lại bị đưa vào một vùng gọi là Temporal Dead Zone (TDZ) cho đến khi dòng code khai báo thực sự được chạy tới. Trong vùng TDZ này, nếu cậu cố tình truy cập vào biến, JavaScript sẽ lập tức ném ra lỗi để bảo vệ code của cậu khỏi những hành vi không rõ ràng.
- Đoạn 3: Tính chất của Hằng số (const)
```
const z = 15;
z = 20;
console.log(z);
```
  + Kết quả: Báo lỗi TypeError
  + Giải thích: Từ khóa const dùng để khai báo một hằng số (constant). Một khi đã gán giá trị ban đầu cho const, cậu không bao giờ được phép dùng toán tử gán (=) để thay đổi giá trị của nó một lần nữa. Hành động z = 20 là vi phạm luật pháp của JS!
- Đoạn 4: Trầm trồ với Hằng số dạng Reference Type (Mảng/Object)
```
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```
  + Kết quả: [1, 2, 3, 4] (Không bị lỗi!)
  + Giải thích: Đây là chỗ rất nhiều bạn bị lừa. const bảo vệ địa chỉ ô nhớ (reference) mà biến đang trỏ tới, chứ không bảo vệ nội dung bên trong ô nhớ đó. Khi cậu arr.push(4), địa chỉ của mảng arr trong bộ nhớ không hề thay đổi, cậu chỉ đang sửa đổi phần tử bên trong cái mảng đó mà thôi (Mutable).
-Đoạn 5: Block Scope (Phạm vi khối mã)
```
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```
  + Kết quả: Trong block: 2 ; Ngoài block: 1
  + Giải thích: let và const có tính chất Block Scope (chỉ có giá trị bên trong cặp ngoặc nhọn {} chứa nó). Biến let a = 2 nằm bên trong {} là một biến hoàn toàn cô lập, độc lập với biến a = 1 bên ngoài.

