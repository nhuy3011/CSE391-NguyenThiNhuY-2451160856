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

# Câu A2 (5đ) — Các kiểu dữ liệu và ép kiểu
```console.log(typeof null);	``` => "object"

```console.log(typeof undefined);```	=> "undefined" 

```console.log(typeof NaN);	```=> "number"

```console.log("5" + 3);	```=> "53"

```console.log("5" - 3);	```=> 2

```console.log("5" * "3");	```=> 15

```console.log(true + true);	```=> 2

```console.log([] + []);	```=> "" (Chuỗi rỗng)

```console.log([] + {});	```=> "[object Object]"

```console.log({} + []);	```=> 0 hoặc "[object Object]"

**Tại sao "5" + 3 và "5" - 3 cho kết quả khác nhau.**
1. Đối với phép toán "5" + 3
  + Kết quả: "53"
  + Toán tử + trong JavaScript có 2 nhiệm vụ: Phép cộng số học toán học **VÀ** Phép nối chuỗi ký tự.
  + Quy tắc ngầm: Nếu ít nhất một trong hai vế là String, JavaScript sẽ ưu tiên tuyệt đối cho nhiệm vụ Nối chuỗi.Vì vậy, nó tự động chuyển số 3 thành chuỗi "3" thông qua cơ chế Type Coercion và dán chúng lại với nhau thành "53".
2. Đối với phép toán "5" - 3 
+ Kết quả: 2
+ Toán tử - (và các toán tử khác như *, /) chỉ có duy nhất 1 nhiệm vụ: Phép toán số học. Nó không hề có khái niệm "trừ chuỗi".
+ Quy tắc ngầm: JavaScript bắt buộc phải tìm cách đưa cả hai vế về kiểu dữ liệu Number để tính toán.Nó thấy chuỗi "5" có thể chuyển thành số 5 hợp lệ, nên nó âm thầm thực hiện phép tính 5 - 3 = 2. Nếu cậu thay bằng "hello" - 3, kết quả sẽ là NaN vì chữ "hello" không thể biến thành số được.

