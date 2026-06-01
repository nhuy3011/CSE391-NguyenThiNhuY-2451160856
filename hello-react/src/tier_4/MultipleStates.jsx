import { useState } from "react";

function MultipleStates() {
    // --- KHAI BÁO CÁC STATE ĐỘC LẬP ---
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState(""); // Thử nghiệm 1: Thêm trường Email
    const [isStudent, setIsStudent] = useState(false);
    const [submitted, setSubmitted] = useState(false); // State quyết định ẩn Form / Hiện kết quả

    // --- CÁC HÀM XỬ LÝ LOGIC SỰ KIỆN ---
    function handleSubmit() {
        // Kiểm tra trống dữ liệu cơ bản
        if (name.trim() === "" || age === "" || email.trim() === "") {
            alert("⚠️ Vui lòng nhập đầy đủ tất cả các thông tin!");
            return;
        }

        // Thử nghiệm 2: Xác thực tuổi phải > 0 và < 100
        const ageNumber = parseInt(age);
        if (ageNumber <= 0 || ageNumber >= 100) {
            alert("❌ Tuổi nhập vào không hợp lệ! (Tuổi phải lớn hơn 0 và nhỏ hơn 100)");
            return;
        }

        // Xác thực định dạng email đơn giản
        if (!email.includes("@")) {
            alert("❌ Định dạng Email không hợp lệ (Thiếu ký tự '@')");
            return;
        }

        // Nếu tất cả điều kiện thỏa mãn -> Chuyển trạng thái sang đã nộp thành công
        setSubmitted(true);
    }

    function handleReset() {
        // Khôi phục tất cả các hộp trạng thái về giá trị rỗng ban đầu
        setName("");
        setAge("");
        setEmail("");
        setIsStudent(false);
        setSubmitted(false);
    }

    return (
        <div style={{ padding: "25px", maxWidth: "450px", margin: "20px auto", fontFamily: "Arial, sans-serif", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}>
            
            {/* Thử nghiệm 3: Hiển thị lời chào động "Xin chào [tên]!" TRONG LÚC ĐANG NHẬP (Chỉ hiện khi name không trống) */}
            <div style={{ minHeight: "35px", marginBottom: "10px" }}>
                {name.trim() !== "" && (
                    <h3 style={{ color: "#3498db", margin: 0, animation: "fadeIn 0.3s" }}>
                        👋 Xin chào {name}!
                    </h3>
                )}
            </div>

            <h2 style={{ marginTop: 0, color: "#2c3e50" }}>📝 Biểu Mẫu Đăng Ký</h2>
            <hr style={{ marginBottom: "20px" }} />
            
            {/* Kỹ thuật Conditional Rendering (Toán tử 3 ngôi): Nếu CHƯA submit thì hiện Form nhập, NẾU RỒI thì hiện bảng kết quả */}
            {!submitted ? (
                <div>
                    {/* Ô NHẬP TÊN */}
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Họ và tên: </label>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ví dụ: Nguyễn Văn Minh"
                            style={inputStyle}
                        />
                    </div>
                    
                    {/* Ô NHẬP TUỔI */}
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Tuổi: </label>
                        <input 
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Nhập số tuổi..."
                            style={inputStyle}
                        />
                    </div>

                    {/* Ô NHẬP EMAIL (Thử nghiệm 1) */}
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Địa chỉ Email: </label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="abc@gmail.com hoặc sinhvien@tlu.edu.vn"
                            style={inputStyle}
                        />
                    </div>
                    
                    {/* CHECKBOX SINH VIÊN */}
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "bold" }}>
                            <input 
                                type="checkbox"
                                checked={isStudent}
                                // Lưu ý đối với thẻ input loại checkbox: Dữ liệu on/off nằm ở thuộc tính e.target.checked (trả về true/false)
                                onChange={(e) => setIsStudent(e.target.checked)}
                                style={{ width: "17px", height: "17px", cursor: "pointer" }}
                            />
                            Tôi là sinh viên trường Thủy Lợi (TLU)
                        </label>
                    </div>
                    
                    {/* NÚT ĐĂNG KÝ */}
                    <button onClick={handleSubmit} style={btnSubmitStyle}>
                        🚀 Gửi Thông Tin Đăng Ký
                    </button>
                </div>
            ) : (
                /* GIAO DIỆN HIỂN THỊ KHI ĐĂNG KÝ THÀNH CÔNG */
                <div style={{ background: "#d4edda", color: "#155724", padding: "20px", borderRadius: "6px", border: "1px solid #c3e6cb", lineHeight: "1.6" }}>
                    <h3 style={{ marginTop: 0 }}>🎉 Đăng Ký Thành Công!</h3>
                    <p><strong>👤 Họ và tên:</strong> {name}</p>
                    <p><strong>🎂 Tuổi:</strong> {age} tuổi</p>
                    <p><strong>✉️ Email:</strong> {email}</p>
                    <p><strong>🏫 Sinh viên TLU:</strong> {isStudent ? "✅ Đúng vậy" : "❌ Không phải"}</p>
                    
                    <button onClick={handleReset} style={btnResetStyle}>
                        🔄 Đăng ký lại (Nhập Form mới)
                    </button>
                </div>
            )}
        </div>
    );
}

// --- CÁC ĐỐI TƯỢNG STYLE DÙNG CHUNG ---
const inputGroupStyle = {
    marginBottom: "15px"
};

const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#34495e"
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    outline: "none"
};

const btnSubmitStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#2ecc71",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.2s"
};

const btnResetStyle = {
    marginTop: "15px",
    padding: "8px 15px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#155724",
    backgroundColor: "#fff",
    border: "1px solid #c3e6cb",
    borderRadius: "4px",
    cursor: "pointer"
};

export default MultipleStates;