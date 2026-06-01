import { useState } from "react";

function NumberState() {
    // Khai báo một trạng thái kiểu Số, giá trị khởi tạo ban đầu là 0
    const [count, setCount] = useState(0);

    // Thử nghiệm 3: Logic xử lý màu sắc chữ dựa vào giá trị của count
    let textColor = "black"; // Mặc định khi count = 0
    if (count > 0) {
        textColor = "#28a745"; // Màu xanh lá khi số dương
    } else if (count < 0) {
        textColor = "#dc3545"; // Màu đỏ khi số âm
    }

    return (
        <div style={{ textAlign: "center", padding: "30px", fontFamily: "Arial, sans-serif" }}>
            <h1>Học useState với Kiểu Số</h1>
            <hr style={{ maxWidth: "400px", margin: "20px auto" }} />
            
            {/* Thử nghiệm 3: Ép màu chữ thay đổi động thông qua biến textColor */}
            <h2 style={{ fontSize: "40px", color: textColor, margin: "10px 0" }}>
                Bộ đếm: {count}
            </h2>

            {/* Thử nghiệm 2: Hiển thị trạng thái Số âm / Số dương / Số không */}
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                Trạng thái: {count > 0 ? "🟢 Số dương" : (count < 0 ? "🔴 Số âm" : "⚫ Số không")}
            </p>

            {/* Khu vực các nút bấm điều khiển trạng thái */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", maxWidth: "450px", margin: "20px auto" }}>
                <button onClick={() => setCount(count + 1)} style={btnStyle}>
                    Tăng (+1)
                </button>
                
                {/* Thử nghiệm 1: Thêm nút Tăng 5 */}
                <button onClick={() => setCount(count + 5)} style={{ ...btnStyle, backgroundColor: "#28a745" }}>
                    Tăng (+5)
                </button>

                <button onClick={() => setCount(count - 1)} style={btnStyle}>
                    Giảm (-1)
                </button>
                
                <button onClick={() => setCount(count * 2)} style={{ ...btnStyle, backgroundColor: "#9b59b6" }}>
                    Nhân đôi (x2)
                </button>

                <button onClick={() => setCount(0)} style={{ ...btnStyle, backgroundColor: "#7f8c8d" }}>
                    Reset
                </button>
            </div>
        </div>
    );
}

// Object chứa style cơ bản cho nút bấm nhìn cho đẹp mắt
const btnStyle = {
    padding: "10px 15px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#3498db",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
};

export default NumberState;