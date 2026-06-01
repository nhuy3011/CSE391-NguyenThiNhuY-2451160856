import { useState } from "react";

function DeleteItem() {
    // 1. Mảng State chứa danh sách tin đăng sản phẩm (CampusSwap)
    const [items, setItems] = useState([
        { id: 1, name: "Giáo trình Toán rời rạc TLU" },
        { id: 2, name: "Chuột máy tính Logitech cũ" },
        { id: 3, name: "Đèn học để bàn chống cận" },
        { id: 4, name: "Bình giữ nhiệt inox 500ml" }
    ]);
    
    // State lưu tin đăng vừa bị xóa phục vụ cho tính năng Hoàn tác (Thử nghiệm 2)
    const [lastDeletedItem, setLastDeletedItem] = useState(null);
    // State lưu thông báo log vừa xóa
    const [deleteMessage, setDeleteMessage] = useState("");

    // Hàm xử lý xóa từng phần tử dựa vào ID độc nhất
    function handleDelete(id) {
        // Tìm ra phần tử chuẩn bị xóa
        const itemToDelete = items.find(item => item.id === id);
        if (!itemToDelete) return;

        // Thử nghiệm 3: Hiện hộp thoại yêu cầu xác nhận trước khi cho phép xóa tin đăng
        const isConfirmed = window.confirm(`❓ Bạn có chắc chắn muốn xóa tin đăng: "${itemToDelete.name}" không?`);
        if (!isConfirmed) return; // Nếu người dùng chọn Cancel -> Dừng hàm, không xóa nữa

        // Sao lưu lại toàn bộ mảng hiện tại và phần tử bị xóa để chuẩn bị cho nút Hoàn tác (Thử nghiệm 2)
        setLastDeletedItem({
            item: itemToDelete,
            fullListSnapshot: items // Lưu lại trạng thái mảng ngay trước lúc xóa
        });

        // THỰC HIỆN LỆNH XÓA: Lọc ra mảng mới KHÔNG chứa phần tử có ID này
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);

        // Thử nghiệm 1: Hiển thị thông báo "Đã xóa [tên]"
        setDeleteMessage(`🗑️ Đã xóa thành công: "${itemToDelete.name}"`);

        // Tự động dọn dẹp bộ nhớ tạm và ẩn thông báo hoàn tác sau 5 giây
        setTimeout(() => {
            setDeleteMessage("");
            setLastDeletedItem(null);
        }, 5000);
    }

    // Thử nghiệm 2: Hàm xử lý Hoàn tác phục hồi dữ liệu (Undo)
    function handleUndo() {
        if (lastDeletedItem) {
            // Khôi phục lại mảng nguyên vẹn ban đầu từ Snapshot đã lưu
            setItems(lastDeletedItem.fullListSnapshot);
            setDeleteMessage("🔄 Đã khôi phục tin đăng thành công!");
            setLastDeletedItem(null); // Xóa bộ nhớ tạm
        }
    }

    // Hàm xóa sạch bách danh sách
    function handleDeleteAll() {
        if (window.confirm("🚨 CẢNH BÁO: Bạn có chắc chắn muốn xóa TOÀN BỘ tin đăng sản phẩm không?")) {
            setItems([]);
            setDeleteMessage("🗑️ Đã xóa sạch toàn bộ danh sách sản phẩm.");
            setLastDeletedItem(null);
        }
    }

    return (
        <div style={{ padding: "25px", maxWidth: "480px", margin: "20px auto", fontFamily: "Arial, sans-serif", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}>
            <h2 style={{ color: "#2c3e50", marginTop: 0 }}>📦 Quản Lý Tin Đăng CampusSwap</h2>
            <hr style={{ marginBottom: "20px" }} />
            
            {/* THANH THÔNG BÁO LOG XÓA & NÚT HOÀN TÁC (Chỉ hiện khi deleteMessage có chữ) */}
            <div style={{ minHeight: "50px", marginBottom: "15px" }}>
                {deleteMessage && (
                    <div style={{ 
                        padding: "10px 15px", 
                        background: "#333", 
                        color: "#fff", 
                        borderRadius: "5px", 
                        fontSize: "14px",
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        animation: "fadeIn 0.2s" 
                    }}>
                        <span>{deleteMessage}</span>
                        {/* Thử nghiệm 2: Nút bấm Hoàn tác xuất hiện trong 5 giây */}
                        {lastDeletedItem && (
                            <button 
                                onClick={handleUndo} 
                                style={{ 
                                    background: "#f1c40f", 
                                    color: "#2c3e50", 
                                    border: "none", 
                                    padding: "4px 10px", 
                                    borderRadius: "3px", 
                                    fontWeight: "bold", 
                                    cursor: "pointer" 
                                }}
                            >
                                ↩️ Hoàn tác (5s)
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* NÚT XÓA TẤT CẢ DANH SÁCH */}
            {items.length > 0 && (
                <button onClick={handleDeleteAll} style={{ marginBottom: "15px", background: "#e74c3c", color: "white", padding: "8px 14px", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>
                    💥 Xóa Sạch Tất Cả Tin Đăng
                </button>
            )}
            
            {/* GIAO DIỆN KHO HÀNG */}
            <h3 style={{ color: "#34495e" }}>🛍️ Vật phẩm đang rao trao đổi:</h3>
            
            {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "30px 0", color: "#999", fontStyle: "italic", border: "2px dashed #ccc", borderRadius: "6px" }}>
                    📭 Không có sản phẩm nào. Kho hàng trống rỗng!
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {items.map(item => (
                        <div key={item.id} style={{ 
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "12px 15px",
                            background: "#f8f9fa",
                            border: "1px solid #eef2f3",
                            borderRadius: "6px"
                        }}>
                            <span style={{ color: "#2c3e50", fontWeight: "500" }}>{item.name}</span>
                            <button 
                                onClick={() => handleDelete(item.id)} // Truyền ID vật phẩm vào hàm xóa
                                style={{ 
                                    background: "#ffebee", 
                                    color: "#c62828", 
                                    border: "1px solid #ffcdd2", 
                                    padding: "6px 12px",
                                    borderRadius: "4px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    transition: "all 0.2s"
                                }}
                                onMouseEnter={(e) => { e.target.style.background = "#ef9a9a" }}
                                onMouseLeave={(e) => { e.target.style.background = "#ffebee" }}
                            >
                                🗑️ Xóa tin
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DeleteItem;