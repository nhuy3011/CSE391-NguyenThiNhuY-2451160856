import { useState } from "react";

function FormEvents() {
    // Chỉ dùng duy nhất 1 Object State để quản lý toàn bộ form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "" // Thử nghiệm 2: Thêm ô xác nhận mật khẩu
    });

    // State lưu trữ thông báo lỗi thời gian thực (Thử nghiệm 3)
    const [errors, setErrors] = useState({
        email: "",
        confirmPassword: ""
    });

    const [submitted, setSubmitted] = useState(false);

    // Hàm xử lý thay đổi dữ liệu dùng chung cực kỳ thông minh
    function handleChange(event) {
        const { name, value } = event.target;
        
        // 1. Cập nhật dữ liệu vào Object State chính
        const updatedData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedData);

        // 2. Thử nghiệm 3: Kiểm tra và hiển thị lỗi THỜI GIAN THỰC (Real-time Validation)
        let currentErrors = { ...errors };

        if (name === "email") {
            // Thử nghiệm 1: Xác thực email phải chứa ký tự @
            if (value !== "" && !value.includes("@")) {
                currentErrors.email = "✕ Email không hợp lệ (Phải chứa ký tự '@')";
            } else {
                currentErrors.email = "";
            }
        }

        if (name === "confirmPassword" || name === "password") {
            // Thử nghiệm 2: Kiểm tra mật khẩu khớp nhau hay không
            const pwd = name === "password" ? value : updatedData.password;
            const confirmPwd = name === "confirmPassword" ? value : updatedData.confirmPassword;

            if (confirmPwd !== "" && pwd !== confirmPwd) {
                currentErrors.confirmPassword = "✕ Mật khẩu xác nhận không khớp!";
            } else {
                currentErrors.confirmPassword = "";
            }
        }

        setErrors(currentErrors);
    }

    // Hàm xử lý khi người dùng ấn nút Submit gửi Form
    function handleSubmit(event) {
        event.preventDefault(); // CHẶN TUYỆT ĐỐI hiện tượng reload lại trang web

        // Kiểm tra cuối trước khi cho phép gửi dữ liệu
        if (formData.name === "" || formData.email === "" || formData.password === "" || formData.confirmPassword === "") {
            alert("Vui lòng điền đầy đủ toàn bộ thông tin!");
            return;
        }

        // Nếu vẫn còn tồn tại thông báo lỗi -> Chặn lại không cho submit
        if (errors.email || errors.confirmPassword) {
            alert("Vui lòng sửa các lỗi nhập liệu trước khi gửi form!");
            return;
        }

        setSubmitted(true);
    }

    function handleReset() {
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setErrors({ email: "", confirmPassword: "" });
        setSubmitted(false);
    }

    return (
        <div style={{ padding: "25px", maxWidth: "450px", margin: "20px auto", fontFamily: "Arial, sans-serif", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}>
            <h2 style={{ textAlign: "center", color: "#2c3e50", marginTop: 0 }}>🔐 Form Đăng Ký Thành Viên</h2>
            <hr style={{ marginBottom: "20px" }} />
            
            {!submitted ? (
                // Lắng nghe sự kiện onSubmit ở thẻ form (Không dùng onClick ở nút Button nhé!)
                <form onSubmit={handleSubmit}>
                    
                    {/* Ô NHẬP TÊN */}
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Họ và tên: </label>
                        <input 
                            name="name" // Thuộc tính name trùng khớp chính xác với Key trong Object State
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nhập họ tên của bạn..."
                            style={inputStyle}
                        />
                    </div>
                    
                    {/* Ô NHẬP EMAIL */}
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Địa chỉ Email: </label>
                        <input 
                            name="email"
                            type="text"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email (ví dụ: abc@gmail.com)..."
                            style={{ ...inputStyle, borderColor: errors.email ? "#dc3545" : "#ccc" }}
                        />
                        {/* Thử nghiệm 3: Hiển thị lỗi Real-time của Email */}
                        {errors.email && <div style={errorTextStyle}>{errors.email}</div>}
                    </div>

                    {/* Ô NHẬP MẬT KHẨU */}
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Mật khẩu: </label>
                        <input 
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Tạo mật khẩu bảo mật..."
                            style={inputStyle}
                        />
                    </div>

                    {/* Ô XÁC NHẬN MẬT KHẨU (Thử nghiệm 2) */}
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Xác nhận mật khẩu: </label>
                        <input 
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Nhập lại mật khẩu phía trên..."
                            style={{ ...inputStyle, borderColor: errors.confirmPassword ? "#dc3545" : "#ccc" }}
                        />
                        {/* Thử nghiệm 3: Hiển thị lỗi Real-time của Mật khẩu */}
                        {errors.confirmPassword && <div style={errorTextStyle}>{errors.confirmPassword}</div>}
                    </div>
                    
                    {/* KHU VỰC NÚT ĐIỀU KHIỂN */}
                    <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
                        <button type="submit" style={{ ...btnStyle, backgroundColor: "#3498db" }}>
                            🚀 Đăng Ký Ngay
                        </button>
                        <button type="button" onClick={handleReset} style={{ ...btnStyle, backgroundColor: "#e74c3c" }}>
                            🧹 Xóa Sạch
                        </button>
                    </div>
                </form>
            ) : (
                /* GIAO DIỆN HIỂN THỊ KHI SUBMIT THÀNH CÔNG */
                <div style={{ background: "#e8f5e9", color: "#2e7d32", padding: "20px", borderRadius: "6px", border: "1px solid #c8e6c9", lineHeight: "1.6" }}>
                    <h3 style={{ marginTop: 0 }}>🎉 Đăng Ký Tài Khoản Thành Công!</h3>
                    <p><strong>👤 Họ tên:</strong> {formData.name}</p>
                    <p><strong>✉️ Email:</strong> {formData.email}</p>
                    <p><strong>🔑 Mật khẩu:</strong> {"•".repeat(formData.password.length)} (Đã mã hóa bảo mật)</p>
                    
                    <button onClick={handleReset} style={{ marginTop: "15px", padding: "8px 15px", cursor: "pointer", border: "1px solid #a5d6a7", borderRadius: "4px", background: "#fff", color: "#2e7d32", fontWeight: "bold" }}>
                        🔄 Đăng ký tài khoản khác
                    </button>
                </div>
            )}
        </div>
    );
}

// --- ĐỐI TƯỢNG STYLE ---
const inputGroupStyle = { marginBottom: "15px" };
const labelStyle = { display: "block", marginBottom: "5px", fontWeight: "bold", color: "#2c3e50", fontSize: "14px" };
const inputStyle = { width: "100%", padding: "10px", fontSize: "15px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box", outline: "none", transition: "border-color 0.2s" };
const errorTextStyle = { color: "#dc3545", fontSize: "12px", marginTop: "4px", fontWeight: "500" };
const btnStyle = { flex: 1, padding: "12px", fontSize: "15px", fontWeight: "bold", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" };

export default FormEvents;