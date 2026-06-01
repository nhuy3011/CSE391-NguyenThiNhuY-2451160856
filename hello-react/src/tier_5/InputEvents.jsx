import { useState } from "react";

function InputEvents() {
    // --- KHAI BÁO CÁC STATE ---
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false); // Trạng thái xem người dùng có đang gõ ô đó không

    // --- CÁC HÀM XỬ LÝ LOGIC ---
    
    // Thử nghiệm 1: Kiểm tra xem chuỗi nhập vào có phải là email hợp lệ không (chứa ký tự '@')
    const isEmailValid = text.includes("@");

    // Thử nghiệm 3: Thuật toán đếm số TỪ (Word Count)
    // .trim() để bỏ khoảng trắng thừa 2 đầu. Sau đó dùng .split() cắt chuỗi bằng khoảng trắng lọc các khoảng trắng thừa.
    const wordsArray = text.trim().split(/\s+/);
    // Nếu ô nhập trống rỗng thì số từ bằng 0, ngược lại bằng độ dài của mảng từ
    const wordCount = text.trim() === "" ? 0 : wordsArray.length;

    return (
        <div style={{ padding: "25px", maxWidth: "450px", margin: "20px auto", fontFamily: "Arial, sans-serif", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ textAlign: "center", color: "#2c3e50" }}>⌨️ Thực Hành Sự Kiện Đầu Vào</h2>
            <hr />

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Nhập địa chỉ Email của bạn:
                </label>
                
                {/* ÁP DỤNG ĐỒNG THỜI 3 SỰ KIỆN: onChange, onFocus, onBlur */}
                <input 
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)} // Cập nhật dữ liệu ngay khi gõ
                    onFocus={() => setIsFocused(true)}         // Bật trạng thái khi click vào ô
                    onBlur={() => setIsFocused(false)}         // Tắt trạng thái khi click ra ngoài
                    placeholder="Ví dụ: ntn.y@tlu.edu.vn..."
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "15px",
                        border: "2px solid",
                        // Đổi màu viền linh hoạt dựa vào việc người dùng đang focus hay check đúng/sai email
                        borderColor: isFocused ? "#3498db" : (text === "" ? "#ccc" : (isEmailValid ? "#28a745" : "#dc3545")),
                        borderRadius: "5px",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "all 0.2s"
                    }}
                />
            </div>

            {/* Hiển thị gợi ý nhắc nhở khi đang Focus gõ chữ */}
            {isFocused && (
                <p style={{ margin: "0 0 10px 0", fontSize: "13px", color: "#3498db", fontWeight: "bold" }}>
                    ✍️ Bạn đang nhập dữ liệu...
                </p>
            )}

            {/* Thử nghiệm 1: Ô cảnh báo xác thực Email */}
            {text !== "" && (
                <div style={{ 
                    padding: "8px 12px", 
                    borderRadius: "4px", 
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                    backgroundColor: isEmailValid ? "#e8f5e9" : "#ffebee",
                    color: isEmailValid ? "#28a745" : "#dc3545"
                }}>
                    {isEmailValid ? "✓ Định dạng Email hợp lệ" : "✕ Email không hợp lệ (Thiếu ký tự '@')"}
                </div>
            )}

            {/* Thử nghiệm 3: Thống kê số lượng Ký tự và số TỪ */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", background: "#f8f9fa", padding: "10px", borderRadius: "5px", border: "1px solid #eee" }}>
                <span>🔢 Ký tự: <strong>{text.length}</strong></span>
                <span>📝 Số từ: <strong style={{ color: "#8e44ad" }}>{wordCount}</strong> từ</span>
            </div>

            {/* ====================================================
                THỬ NGHIỆM 2: Bản xem trước Real-time (Preview)
                ==================================================== */}
            <h3 style={{ marginTop: "20px", color: "#333" }}>🔍 Bản xem trước giao diện:</h3>
            <div style={{ 
                padding: "15px", 
                background: text ? "#e8f4fd" : "#f9f9f9", 
                border: "1px dashed #3498db", 
                borderRadius: "6px", 
                minHeight: "50px",
                fontSize: "15px",
                color: text ? "#2c3e50" : "#999",
                fontStyle: text ? "normal" : "italic"
            }}>
                {text ? (
                    <span>Hệ thống nhận diện Email: <strong>{text}</strong></span>
                ) : (
                    "Nội dung bạn nhập ở ô phía trên sẽ hiển thị trực tiếp tại đây..."
                )}
            </div>

        </div>
    );
}

export default InputEvents;