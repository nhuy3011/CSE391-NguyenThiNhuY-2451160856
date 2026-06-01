import { useState } from "react";

function ListBasics() {
    // State chứa danh sách trái cây (Mảng thô sơ)
    const [fruits] = useState(["Táo Mỹ", "Chuối Tiêu", "Cam Sành", "Nho Ninh Thuận"]);
    
    // State chứa danh sách sinh viên (Mảng Object chuẩn thực tế)
    const [students] = useState([
        { id: 101, name: "Nguyễn Văn Minh", age: 20 },
        { id: 102, name: "Trần Thị An", age: 21 },
        { id: 103, name: "Lê Hoàng Linh", age: 19 },
        { id: 104, name: "Phạm Đức Thắng", age: 22 },
        { id: 105, name: "Vũ Hải Yến", age: 18 }
    ]);

    // Thử nghiệm 3: Thuật toán tính tuổi trung bình của danh sách sinh viên
    // Dùng hàm .reduce() để cộng tổng số tuổi, sau đó chia cho độ dài mảng
    const totalAge = students.reduce((sum, student) => sum + student.age, 0);
    const averageAge = totalAge / students.length;

    return (
        <div style={{ padding: "25px", maxWidth: "500px", margin: "20px auto", fontFamily: "Arial, sans-serif", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}>
            <h2 style={{ color: "#2c3e50", marginTop: 0 }}>🍇 1. Danh sách trái cây</h2>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                {fruits.map((fruit, index) => (
                    // Sử dụng index làm key tạm thời cho các mảng tĩnh không có ID độc nhất
                    <li key={index} style={{ color: "#555", fontWeight: "500" }}>{fruit}</li>
                ))}
            </ul>
            
            <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #eee" }} />

            <h2 style={{ color: "#2c3e50" }}>🎓 2. Danh sách sinh viên</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {students.map((student, index) => {
                    // Thử nghiệm 2: Nếu tuổi >= 20 thì dùng màu xanh lá xịn, ngược lại dùng màu xám đen mặc định
                    const isSenior = student.age >= 20;
                    const cardColor = isSenior ? "#2e7d32" : "#333";
                    const cardBg = isSenior ? "#e8f5e9" : "#f9f9f9";
                    const cardBorder = isSenior ? "1px solid #c8e6c9" : "1px solid #eee";

                    return (
                        <div 
                            key={student.id} // Bắt buộc truyền ID độc nhất để React tối ưu Render
                            style={{ 
                                padding: "12px", 
                                borderRadius: "6px",
                                background: cardBg,
                                border: cardBorder,
                                color: cardColor,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontWeight: isSenior ? "bold" : "normal",
                                transition: "all 0.2s"
                            }}
                        >
                            <span>
                                {/* Thử nghiệm 1: Hiển thị STT dựa vào biến index của vòng lặp map (index bắt đầu từ 0 nên phải + 1) */}
                                <span style={{ marginRight: "10px", color: "#999", fontStyle: "italic" }}>
                                    #{index + 1}
                                </span>
                                {student.name}
                            </span>
                            <span>{student.age} tuổi {isSenior ? "⭐" : ""}</span>
                        </div>
                    );
                })}
            </div>

            {/* ====================================================
                THỬ NGHIỆM 3: KHU VỰC HIỂN THỊ THỐNG KÊ
                ==================================================== */}
            <div style={{ marginTop: "25px", padding: "15px", background: "#f0f4f8", borderLeft: "5px solid #3498db", borderRadius: "0 6px 6px 0" }}>
                <h3 style={{ margin: "0 0 5px 0", color: "#2980b9", fontSize: "16px" }}>📊 Thống kê lớp học:</h3>
                <p style={{ margin: 0, fontSize: "15px", color: "#34495e" }}>
                    • Tổng số sinh viên: <strong>{students.length}</strong> bạn
                </p>
                <p style={{ margin: "5px 0 0 0", fontSize: "15px", color: "#34495e" }}>
                    • Tuổi trung bình của lớp: <strong style={{ color: "#e67e22" }}>{averageAge.toFixed(1)}</strong> tuổi
                </p>
            </div>
        </div>
    );
}

export default ListBasics;