import { useState } from "react";

function BooleanState() {
    // --- KHAI BÁO CÁC TRẠNG THÁI BOOLEAN ---
    const [showPassword, setShowPassword] = useState(false); // Thử nghiệm 1
    const [isOpenAccordion, setIsOpenAccordion] = useState(false); // Thử nghiệm 2
    const [isLightOn, setIsLightOn] = useState(false); // Thử nghiệm 3

    // Biến phụ trợ lưu text cho ô mật khẩu
    const [passwordText, setPasswordText] = useState("tlu_information_technology_2026");

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
            <h2>💡 Thực Hành useState với Kiểu Boolean</h2>
            <hr />

            {/* ====================================================
                THỬ NGHIỆM 1: Ẩn / Hiện mật khẩu nhanh
                ==================================================== */}
            <div style={boxStyle}>
                <h3>🔑 Thử nghiệm 1: Ẩn/Hiện mật khẩu</h3>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <input 
                        type={showPassword ? "text" : "password"} // Thay đổi type dựa trên boolean
                        value={passwordText}
                        onChange={(e) => setPasswordText(e.target.value)}
                        style={{ padding: "8px", width: "70%", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                    <button 
                        onClick={() => setShowPassword(!showPassword)} // Đảo trạng thái true <-> false
                        style={btnStyle}
                    >
                        {showPassword ? "🙈 Ẩn bớt" : "👀 Hiện ra"}
                    </button>
                </div>
            </div>

            {/* ====================================================
                THỬ NGHIỆM 2: Khối Accordion (Menu thu gọn / Thường dùng cho trang FAQ)
                ==================================================== */}
            <div style={boxStyle}>
                <h3>📐 Thử nghiệm 2: Khối Accordion (Hỏi & Đáp)</h3>
                
                {/* Thanh tiêu đề bấm vào để Đóng / Mở */}
                <div 
                    onClick={() => setIsOpenAccordion(!isOpenAccordion)} 
                    style={{ 
                        background: "#3498db", 
                        color: "white", 
                        padding: "12px", 
                        borderRadius: "6px", 
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "bold"
                    }}
                >
                    <span>Nền tảng CampusSwap là gì?</span>
                    <span>{isOpenAccordion ? "🔼" : "🔽"}</span>
                </div>

                {/* Phần nội dung ẩn hiện dựa theo toán tử && */}
                {isOpenAccordion && (
                    <div style={{ padding: "12px", border: "1px solid #3498db", borderTop: "none", borderRadius: "0 0 6px 6px", background: "#f9f9f9", lineHeight: "1.5" }}>
                        Là ứng dụng số giúp sinh viên Thủy Lợi dễ dàng trao đổi, nhượng lại hoặc tặng các món đồ cũ như giáo trình, đồ điện tử, đồ gia dụng ngay trong khuôn viên ký túc xá và giảng đường!
                    </div>
                )}
            </div>

            {/* ====================================================
                THỬ NGHIỆM 3: Công tắc Bật/Tắt bóng đèn siêu trực quan
                ==================================================== */}
            <div style={{ ...boxStyle, textAlign: "center", backgroundColor: isLightOn ? "#fef9e7" : "#f4f6f7" }}>
                <h3>💡 Thử nghiệm 3: Công tắc bóng đèn</h3>
                
                {/* Hiển thị biểu tượng bóng đèn động dựa vào trạng thái */}
                <div style={{ fontSize: "70px", margin: "10px 0" }}>
                    {isLightOn ? "💡" : "🔌"}
                </div>

                <p style={{ fontWeight: "bold", color: isLightOn ? "#f39c12" : "#7f8c8d" }}>
                    Trạng thái: {isLightOn ? "PHÒNG ĐANG SÁNG" : "PHÒNG TỐI OM"}
                </p>

                <button 
                    onClick={() => setIsLightOn(!isLightOn)} 
                    style={{ 
                        ...btnStyle, 
                        backgroundColor: isLightOn ? "#e67e22" : "#2c3e50" 
                    }}
                >
                    {isLightOn ? "🔴 TẮT ĐÈN" : "🟢 BẬT ĐÈN"}
                </button>
            </div>

        </div>
    );
}

// Cấu trúc style dùng chung cho các khối bài tập
const boxStyle = {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
};

const btnStyle = {
    padding: "8px 12px",
    cursor: "pointer",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold"
};

export default BooleanState;