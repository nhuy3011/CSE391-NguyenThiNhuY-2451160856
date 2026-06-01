import { useState } from "react";

function UpdateItem() {
    // 1. Mảng State gốc chứa danh sách vật phẩm trao đổi (CampusSwap)
    const [items, setItems] = useState([
        { id: 1, name: "Giáo trình Triết học", price: 15 },
        { id: 2, name: "Áo đồng phục TLU size L", price: 50 },
        { id: 3, name: "Tai nghe có dây Sony", price: 90 }
    ]);
    
    // Các State trung gian phục vụ việc chỉnh sửa
    const [editingId, setEditingId] = useState(null); // Lưu ID của dòng đang được chọn để sửa
    const [editName, setEditName] = useState("");      // Lưu tên mới trong quá trình gõ
    const [editPrice, setEditPrice] = useState("");    // Lưu giá/điểm quy đổi mới trong quá trình gõ

    // State thông báo trạng thái "Đã lưu!" (Thử nghiệm 3)
    const [savedId, setSavedId] = useState(null); 
    
    // Hàm kích hoạt chế độ sửa dòng
    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditPrice(item.price.toString());
        setSavedId(null); // Ẩn thông báo đã lưu của dòng trước đó nếu có
    }
    
    // Hàm lưu lại kết quả sau khi sửa xong
    function saveEdit() {
        // Thử nghiệm 2: Xác thực nghiêm ngặt, không cho phép lưu nếu để trống tên hoặc giá
        if (editName.trim() === "" || editPrice.trim() === "") {
            alert("⚠️ Không được để trống tên vật phẩm hoặc mức giá!");
            return;
        }

        const priceNumber = parseInt(editPrice);
        if (isNaN(priceNumber) || priceNumber < 0) {
            alert("❌ Mức giá nhập vào phải là một số dương hợp lệ!");
            return;
        }
        
        // THỰC HIỆN CẬP NHẬT MẢNG BẰNG .MAP()
        setItems(items.map(item => 
            item.id === editingId 
                ? { ...item, name: editName.trim(), price: priceNumber } // Trả về vật thể mới đã sửa
                : item // Giữ nguyên các vật thể khác
        ));
        
        // Thử nghiệm 3: Đánh dấu dòng vừa lưu thành công để hiện chữ "Đã lưu!"
        setSavedId(editingId);
        setEditingId(null); // Thoát khỏi chế độ chỉnh sửa, quay về chế độ xem

        // Tự động ẩn chữ "Đã lưu!" sau 3 giây
        setTimeout(() => {
            setSavedId(null);
        }, 3000);
    }
    
    function cancelEdit() {
        setEditingId(null); // Huỷ bỏ, quay về chế độ xem ban đầu
    }
    
    // Lắng nghe sự kiện bàn phím tiện ích cho người dùng
    function handleKeyDown(event) {
        if (event.key === "Enter") saveEdit();
        if (event.key === "Escape") cancelEdit();
    }
    
    return (
        <div style={{ padding: "25px", maxWidth: "500px", margin: "20px auto", fontFamily: "Arial, sans-serif", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}>
            <h2 style={{ color: "#2c3e50", marginTop: 0, textAlign: "center" }}>✏️ Cập Nhật Thông Tin Tin Đăng</h2>
            <hr style={{ marginBottom: "20px" }} />
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {items.map(item => (
                    <div 
                        key={item.id} 
                        style={{ 
                            padding: "12px 15px", 
                            borderRadius: "6px",
                            // Thử nghiệm 1: Đổi màu viền và nền sang xanh dương nhạt để đánh dấu dòng đang được chỉnh sửa
                            background: editingId === item.id ? "#ebf5fb" : "#f8f9fa",
                            border: editingId === item.id ? "2px solid #3498db" : "1px solid #eef2f3",
                            transition: "all 0.2s ease"
                        }}
                    >
                        {editingId === item.id ? (
                            // ====================================================
                            // GIAO DIỆN CHẾ ĐỘ SỬA (EDIT MODE)
                            // ====================================================
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <input 
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    autoFocus // Tự động nhảy con trỏ chuột vào đây khi vừa bật sửa
                                    style={{ padding: "8px", flex: 2, border: "1px solid #3498db", borderRadius: "4px", outline: "none" }}
                                    placeholder="Tên vật phẩm..."
                                />
                                <input 
                                    type="number"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    style={{ padding: "8px", flex: 1, width: "70px", border: "1px solid #3498db", borderRadius: "4px", outline: "none" }}
                                    placeholder="Giá (K)..."
                                />
                                <button onClick={saveEdit} style={{ background: "#2ecc71", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
                                    ✓ Lưu
                                </button>
                                <button onClick={cancelEdit} style={{ background: "#95a5a6", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
                                    ✕ Hủy
                                </button>
                            </div>
                        ) : (
                            // ====================================================
                            // GIAO DIỆN CHẾ ĐỘ XEM (VIEW MODE)
                            // ====================================================
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span style={{ fontWeight: "500", color: "#2c3e50" }}>{item.name}</span>
                                    <span style={{ fontSize: "13px", background: "#e1f5fe", color: "#0288d1", padding: "2px 8px", borderRadius: "12px", fontWeight: "bold" }}>
                                        {item.price}k xu
                                    </span>
                                    
                                    {/* Thử nghiệm 3: Hiển thị nhãn "Đã lưu!" nhấp nháy xanh lá cây sau khi bấm Lưu */}
                                    {savedId === item.id && (
                                        <span style={{ color: "#27ae60", fontSize: "13px", fontWeight: "bold", animation: "fadeIn 0.3s" }}>
                                            ✨ Đã lưu thành công!
                                        </span>
                                    )}
                                </div>
                                <button 
                                    onClick={() => startEdit(item)} 
                                    style={{ background: "#3498db", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", transition: "background 0.2s" }}
                                    onMouseEnter={(e) => e.target.style.background = "#2980b9"}
                                    onMouseLeave={(e) => e.target.style.background = "#3498db"}
                                >
                                    ✏️ Chỉnh sửa
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UpdateItem;