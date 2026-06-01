import { useState } from "react";

function StringState() {
    // 1. Khai báo các trạng thái (State) cho từng ô nhập liệu
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Trạng thái Boolean để ẩn/hiện mật khẩu (Bổ trợ cho Thử nghiệm 3)
    const [showPassword, setShowPassword] = useState(false);

    // Thử nghiệm 2: Logic kiểm tra email hợp lệ đơn giản (có chứa ký tự '@')
    const isEmailValid = email.includes("@");

    return (
        <div style={{ padding: "20px", maxWidth: "450px", margin: "20px auto", fontFamily: "Arial, sans-serif", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.05)" }}>
            <h2>📋 Form Đăng Ký Tài Khoản</h2>
            <hr />
            
            {/* --- Ô NHẬP TÊN (Thử nghiệm 1: Đếm ký tự) --- */}
            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Họ và tên:</label>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên..."
                    maxLength={100} // Giới hạn tối đa 100 ký tự
                    style={inputStyle}
                />
                {/* Thử nghiệm 1: Hiển thị độ dài chuỗi ký tự X/100 */}
                <div style={{ textAlign: "right", fontSize: "12px", color: name.length >= 90 ? "red" : "#666", marginTop: "4px" }}>
                    {name.length}/100 ký tự
                </div>
            </div>
            
            {/* --- Ô NHẬP EMAIL (Thử nghiệm 2: Validate Email) --- */}
            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Địa chỉ Email:</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email..."
                    style={{ 
                        ...inputStyle, 
                        // Nếu đã nhập chữ nhưng chưa hợp lệ thì viền đỏ, hợp lệ thì viền xanh
                        borderColor: email === "" ? "#ddd" : (isEmailValid ? "#28a745" : "#dc3545") 
                    }}
                />
                {/* Thử nghiệm 2: Hiển thị dòng trạng thái nhắc nhở hợp lệ */}
                {email !== "" && (
                    <div style={{ fontSize: "13px", marginTop: "4px", color: isEmailValid ? "#28a745" : "#dc3545", fontWeight: "500" }}>
                        {isEmailValid ? "✓ Email hợp lệ" : "✕ Email phải chứa ký tự '@' (Ví dụ: abc@gmail.com)"}
                    </div>
                )}
            </div>

            {/* --- Ô NHẬP MẬT KHẨU (Thử nghiệm 3: Ẩn/hiện mật khẩu) --- */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Mật khẩu:</label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input 
                        // Thử nghiệm 3: Thay đổi type giữa "password" và "text" dựa vào state boolean showPassword
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..."
                        style={{ ...inputStyle, paddingRight: "70px" }} // Chừa khoảng trống bên phải để đặt nút bấm
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} // Đảo ngược trạng thái true <-> false
                        style={{ position: "absolute", right: "5px", padding: "5px 8px", fontSize: "12px", cursor: "pointer", border: "1px solid #ccc", borderRadius: "4px", background: "#f9f9f9" }}
                    >
                        {showPassword ? "👀 Ẩn" : "👁️ Hiện"}
                    </button>
                </div>
            </div>

            {/* --- KHU VỰC PREVIEW XEM THỜI GIAN THỰC --- */}
            <h3 style={{ marginTop: "25px", color: "#333" }}>🔍 Preview dữ liệu Real-time:</h3>
            <div style={{ background: "#f9f9f9", padding: "12px", borderRadius: "6px", fontSize: "14px", lineHeight: "1.6" }}>
                <p style={{ margin: "5px 0" }}><strong>Tên:</strong> {name || <span style={{ color: "#aaa" }}>(chưa nhập)</span>}</p>
                <p style={{ margin: "5px 0" }}><strong>Email:</strong> {email || <span style={{ color: "#aaa" }}>(chưa nhập)</span>}</p>
                <p style={{ margin: "5px 0" }}><strong>Mật khẩu bảo mật:</strong> {password ? "•".repeat(password.length) : <span style={{ color: "#aaa" }}>(chưa nhập)</span>}</p>
            </div>
        </div>
    );
}

// Style cơ bản cho các ô input
const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxSizing: "border-box",
    outline: "none"
};

export default StringState;