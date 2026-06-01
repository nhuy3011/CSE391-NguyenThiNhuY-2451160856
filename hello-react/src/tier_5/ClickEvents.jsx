import { useState } from "react";

function ClickEvents() {
    // --- KHAI BÁO CÁC TRẠNG THÁI (STATE) ---
    const [bgColor, setBgColor] = useState("#34495e"); // State lưu màu sắc của div (Thử nghiệm 1)
    const [btn1Count, setBtn1Count] = useState(0);    // State đếm nút 1 (Thử nghiệm 2)
    const [btn2Count, setBtn2Count] = useState(0);    // State đếm nút 2 (Thử nghiệm 2)
    const [isLiked, setIsLiked] = useState(false);    // State thả tim (Thử nghiệm 3)

    // --- CÁC HÀM XỬ LÝ SỰ KIỆN (EVENT HANDLERS) ---
    
    // Thử nghiệm 1: Hàm tạo màu ngẫu nhiên HEX Color
    function handleRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        setBgColor(color); // Cập nhật màu mới để React render lại
    }

    // Thử nghiệm 2: Hàm đếm riêng biệt (Truyền tham số để phân biệt nút)
    function handleCountSeparate(buttonId) {
        if (buttonId === 1) {
            setBtn1Count(btn1Count + 1);
        } else if (buttonId === 2) {
            setBtn2Count(btn2Count + 1);
        }
    }

    return (
        <div style={{ padding: "25px", maxWidth: "450px", margin: "20px auto", fontFamily: "Arial, sans-serif", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ textAlign: "center", color: "#2c3e50" }}>🎯 Thực Hành Sự Kiện Click</h2>
            <hr />

            {/* ====================================================
                THỬ NGHIỆM 1: Hộp đổi màu ngẫu nhiên
                ==================================================== */}
            <div style={{ marginBottom: "25px" }}>
                <h3>🎨 Thử nghiệm 1: Đổi màu hộp ngẫu nhiên</h3>
                <div style={{ 
                    width: "100%", 
                    height: "80px", 
                    backgroundColor: bgColor, 
                    borderRadius: "6px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                    transition: "background-color 0.3s ease",
                    marginBottom: "10px"
                }}>
                    Mã màu: {bgColor}
                </div>
                {/* Gắn hàm handleRandomColor (không có dấu ngoặc tròn nhé bạn) */}
                <button onClick={handleRandomColor} style={btnStyle}>
                    🎲 Đổi Màu Ngẫu Nhiên
                </button>
            </div>

            {/* ====================================================
                THỬ NGHIỆM 2: Đếm số lần click riêng biệt
                ==================================================== */}
            <div style={{ marginBottom: "25px" }}>
                <h3>📊 Thử nghiệm 2: Đếm click từng nút biệt lập</h3>
                <div style={{ display: "flex", gap: "15px", justifyContent: "space-between" }}>
                    <div>
                        {/* Mẹo: Muốn truyền tham số vào hàm onClick, ta bắt buộc phải bọc nó qua một Arrow Function bọc ngoài */}
                        <button onClick={() => handleCountSeparate(1)} style={{ ...btnStyle, backgroundColor: "#3498db" }}>
                            Nút bên trái A
                        </button>
                        <p style={{ textAlign: "center", margin: "5px 0" }}>Đã bấm: <strong>{btn1Count}</strong> lần</p>
                    </div>

                    <div>
                        <button onClick={() => handleCountSeparate(2)} style={{ ...btnStyle, backgroundColor: "#9b59b6" }}>
                            Nút bên phải B
                        </button>
                        <p style={{ textAlign: "center", margin: "5px 0" }}>Đã bấm: <strong>{btn2Count}</strong> lần</p>
                    </div>
                </div>
            </div>

            {/* ====================================================
                THỬ NGHIỆM 3: Nút Thích chuyển đổi biểu tượng (Toggle Like)
                ==================================================== */}
            <div style={{ textAlign: "center", paddingTop: "10px", borderTop: "1px solid #eee" }}>
                <h3>❤️ Thử nghiệm 3: Tính năng Thả Tim (CampusSwap)</h3>
                <button 
                    onClick={() => setIsLiked(!isLiked)} 
                    style={{ 
                        ...btnStyle, 
                        backgroundColor: isLiked ? "#fff0f0" : "#f5f5f5",
                        color: isLiked ? "#e74c3c" : "#7f8c8d",
                        border: isLiked ? "2px solid #e74c3c" : "2px solid #bdc3c7",
                        fontSize: "18px",
                        padding: "8px 20px"
                    }}
                >
                    {isLiked ? "❤️ Đã thích mục này" : "🤍 Thích món đồ này"}
                </button>
            </div>

        </div>
    );
}

// Style cơ bản cho các nút bấm
const btnStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#2ecc71",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    outline: "none"
};

export default ClickEvents;