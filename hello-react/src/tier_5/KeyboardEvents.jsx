import { useState, useEffect } from "react";

function KeyboardEvents() {
    // --- STATE THỬ NGHIỆM 1: TRÒ CHƠI PHẢN XẠ PHÍM ---
    const targetKeys = ["A", "S", "D", "F", "W", "E", "R", "ENTER", "ESCAPE"];
    const [randomKey, setRandomKey] = useState("A");
    const [gameMessage, setGameMessage] = useState("🎯 Nhấn phím phía trên để thắng!");

    // --- STATE THỬ NGHIỆM 2: DI CHUYỂN Ô VUÔNG (Toạ độ X, Y) ---
    const [position, setPosition] = useState({ x: 150, y: 10 });

    // --- STATE THỬ NGHIỆM 3: PHÍM TẮT CTRL + D ĐỔI MÀU NỀN ---
    const [bgColor, setBgColor] = useState("#ffffff");

    // Hàm tạo phím ngẫu nhiên mới cho trò chơi
    function generateNewKey() {
        const randomIndex = Math.floor(Math.random() * targetKeys.length);
        setRandomKey(targetKeys[randomIndex]);
    }

    // --- HÀM XỬ LÝ LẮNG NGHE BÀN PHÍM TOÀN DIỆN ---
    function handleGlobalKeyDown(event) {
        // Lấy tên phím và chuyển thành chữ in hoa để dễ so sánh
        const pressedKey = event.key.toUpperCase();

        // ----------------------------------------------------
        // Thử nghiệm 3: Bắt tổ hợp phím tắt Ctrl + D
        // ----------------------------------------------------
        if (event.ctrlKey && pressedKey === "D") {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt (Thường Ctrl+D là Bookmark)
            const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            setBgColor(randomColor);
            return; // Thoát hàm sớm
        }

        // ----------------------------------------------------
        // Thử nghiệm 1: Logic Trò chơi khớp phím
        // ----------------------------------------------------
        if (pressedKey === randomKey) {
            setGameMessage("🎉 QUÁ CHUẨN! Bạn giành chiến thắng!");
            generateNewKey(); // Đổi sang phím khác
        } else {
            // Tránh bắt nhầm các phím điều hướng hệ thống khi đang chơi
            if (!["ARROWUP", "ARROWDOWN", "ARROWLEFT", "ARROWRIGHT", "CONTROL"].includes(pressedKey)) {
                setGameMessage(`❌ Hụt rồi! Bạn vừa bấm phím [${event.key}], hãy thử lại!`);
            }
        }

        // ----------------------------------------------------
        // Thử nghiệm 2: Di chuyển ô vuông bằng phím mũi tên (↑ ↓ ← →)
        // ----------------------------------------------------
        const step = 15; // Số pixel ô vuông di chuyển mỗi lần bấm
        if (pressedKey === "ARROWUP") {
            setPosition(prev => ({ ...prev, y: Math.max(0, prev.y - step) }));
        } else if (pressedKey === "ARROWDOWN") {
            setPosition(prev => ({ ...prev, y: Math.min(100, prev.y + step) }));
        } else if (pressedKey === "ARROWLEFT") {
            setPosition(prev => ({ ...prev, x: Math.max(0, prev.x - step) }));
        } else if (pressedKey === "ARROWRIGHT") {
            setPosition(prev => ({ ...prev, x: Math.min(300, prev.x + step) }));
        }
    }

    return (
        <div 
            onKeyDown={handleGlobalKeyDown}
            tabIndex={0} // BẮT BUỘC: Giúp thẻ div này có thể nhận tiêu điểm (Focus) để lắng nghe sự kiện bàn phím
            style={{ 
                padding: "25px", 
                maxWidth: "450px", 
                margin: "20px auto", 
                fontFamily: "Arial, sans-serif", 
                border: "1px solid #ddd", 
                borderRadius: "8px", 
                boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                backgroundColor: bgColor,
                outline: "none", // Tắt viền xanh mặc định của trình duyệt khi focus vào div
                transition: "background-color 0.4s ease"
            }}
        >
            <h2 style={{ textAlign: "center", color: "#2c3e50", marginTop: 0 }}>⌨️ Làm Chủ Sự Kiện Bàn Phím</h2>
            <p style={{ fontSize: "12px", color: "#e67e22", textAlign: "center", fontWeight: "bold" }}>
                ⚠️ MẸO: Hãy click chuột vào một vị trí bất kỳ trong hộp này trước khi bấm phím nhé!
            </p>
            <hr />

            {/* ====================================================
                THỬ NGHIỆM 1: TRÒ CHƠI PHẢN XẠ BẤM PHÍM
                ==================================================== */}
            <div style={sectionStyle}>
                <h3 style={{ marginTop: 0 }}>🎮 1. Trò chơi phản xạ bấm phím</h3>
                <p>Phím mục tiêu cần bấm:</p>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#e74c3c", background: "#fdf2e9", display: "inline-block", padding: "5px 20px", borderRadius: "5px", border: "1px solid #f5b041" }}>
                    {randomKey}
                </div>
                <p style={{ fontWeight: "500", color: gameMessage.includes("🎉") ? "#28a745" : "#333" }}>
                    {gameMessage}
                </p>
            </div>

            {/* ====================================================
                THỬ NGHIỆM 2: DI CHUYỂN Ô VUÔNG BẰNG PHÍM MŨI TÊN
                ==================================================== */}
            <div style={sectionStyle}>
                <h3>🕹️ 2. Di chuyển ô vuông (Phím ↑ ↓ ← →)</h3>
                <p style={{ fontSize: "13px", color: "#666" }}>Nhấn các phím mũi tên trên bàn phím của bạn để điều khiển ô vuông màu tím.</p>
                
                {/* Sân đấu mô phỏng */}
                <div style={{ width: "100%", height: "150px", background: "#f2f4f4", borderRadius: "6px", position: "relative", overflow: "hidden", border: "1px solid #bdc3c7" }}>
                    {/* Ô vuông di chuyển động dựa trên style left và top gắn từ State */}
                    <div style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#9b59b6",
                        borderRadius: "4px",
                        position: "absolute",
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        transition: "all 0.1s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "bold"
                    }}>
                        TLU
                    </div>
                </div>
            </div>

            {/* ====================================================
                THỬ NGHIỆM 3: PHÍM TẮT ĐỔI MÀU NỀN
                ==================================================== */}
            <div style={{ ...sectionStyle, marginBottom: 0 }}>
                <h3>⌨️ 3. Thử nghiệm Phím Tắt Hệ Thống</h3>
                <div style={{ background: "#ebf5fb", padding: "10px", borderRadius: "5px", border: "1px solid #aed6f1", color: "#2e86c1", fontWeight: "bold", textAlign: "center" }}>
                    Ấn tổ hợp phím [ Ctrl + D ] để đổi màu nền hộp này!
                </div>
            </div>

        </div>
    );
}

const sectionStyle = {
    background: "rgba(255, 255, 255, 0.8)",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px",
    border: "1px solid #eaeaea"
};

export default KeyboardEvents;