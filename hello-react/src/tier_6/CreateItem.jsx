import { useState, useRef } from "react";

function CreateItem() {
    // 1. State lưu trữ mảng danh sách môn học
    const [items, setItems] = useState([
        { id: 1, name: "Lập trình C++" },
        { id: 2, name: "Cấu trúc dữ liệu & Giải thuật" },
        { id: 3, name: "Toán rời rạc (TLU)" }
    ]);
    
    // 2. State lưu chữ đang gõ trong ô Input
    const [newName, setNewName] = useState("");

    // 3. State điều khiển thông báo "Đã thêm thành công!" (Thử nghiệm 2)
    const [showSuccess, setShowSuccess] = useState(false);

    // 4. Khai báo một mỏ neo dùng để định vị ô Input (Thử nghiệm 3)
    const inputRef = useRef(null);

    function handleAdd() {
        // Thử nghiệm 1: Xác thực nếu chuỗi rỗng hoặc chỉ toàn khoảng trắng thì chặn luôn
        if (newName.trim() === "") {
            alert("⚠️ Tên môn học không được để trống!");
            return;
        }

        // Tạo ra vật thể (Object) phần tử mới tinh
        const newItem = {
            id: Date.now(), // Sử dụng timestamp làm ID đảm bảo không bao giờ trùng nhau
            name: newName.trim()
        };

        // CẬP NHẬT MẢNG BẰNG TOÁN TỬ SPREAD: Thêm phần tử mới lên ĐẦU danh sách cho dễ nhìn
        setItems([newItem, ...items]);

        // Xóa sạch chữ trong ô input về rỗng
        setNewName("");

        // Thử nghiệm 2: Bật thông báo thành công trong thời gian ngắn
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false); // Tự động ẩn thông báo sau 2.5 giây
        }, 2500);

        // Thử nghiệm 3: Dùng mỏ neo gọi lệnh ép con trỏ chuột focus lại vào ô nhập liệu ngay lập tức
        inputRef.current.focus();
    }

    // Lắng nghe sự kiện gõ bàn phím Enter để thêm nhanh
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleAdd();
        }
    }

    return (
        <div style={{ padding: "25px", maxWidth: "450px", margin: "20px auto", fontFamily: "Arial, sans-serif", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}>
            <h2 style={{ color: "#2c3e50", marginTop: 0 }}>📚 Quản Lý Danh Sách Môn Học</h2>
            <hr style={{ marginBottom: "20px" }} />
            
            {/* THÀNH PHẦN Ô NHẬP LIỆU */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <input 
                    ref={inputRef} // Gắn mỏ neo định vị vào đây!
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={handleKeyDown} // Thay cho onKeyPress (bị khai tử trong React mới)
                    placeholder="Nhập tên môn học cần thêm..."
                    style={{
                        flex: 1,
                        padding: "10px",
                        fontSize: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        outline: "none"
                    }}
                />
                <button onClick={handleAdd} style={{ padding: "10px 20px", fontSize: "15px", fontWeight: "bold", color: "white", backgroundColor: "#3498db", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    ➕ Thêm Mới
                </button>
            </div>

            {/* Thử nghiệm 2: Dòng chữ thông báo trạng thái "Đã thêm thành công!" */}
            <div style={{ minHeight: "25px", marginBottom: "15px" }}>
                {showSuccess && (
                    <span style={{ color: "#27ae60", fontSize: "14px", fontWeight: "bold", display: "block", animation: "fadeIn 0.2s" }}>
                        ✅ Đã thêm môn học thành công vào hệ thống!
                    </span>
                )}
            </div>
            
            {/* GIAO DIỆN HIỂN THỊ DANH SÁCH MẢNG */}
            <h3 style={{ color: "#34495e", marginBottom: "10px" }}>
                📋 Danh sách hiện tại ({items.length} môn):
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {items.map((item, index) => (
                    <div 
                        key={item.id} 
                        style={{ 
                            padding: "12px", 
                            background: "#f8f9fa",
                            border: "1px solid #eef2f3",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <span style={{ color: "#bdc3c7", marginRight: "12px", fontWeight: "bold" }}>
                            {items.length - index}.
                        </span>
                        <span style={{ color: "#2c3e50", fontWeight: "500" }}>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreateItem;