function ConditionalDemo() {
    // --- DỮ LIỆU ĐỂ TEST ---
    const isOnline = true;          // Trạng thái hoạt động (Thử nghiệm 1)
    const isLoggedIn = false;       // Trạng thái đăng nhập (Thử nghiệm 2)
    const stock = 0;                // Số lượng hàng trong kho (Thử nghiệm 3)
    const notificationCount = 3;    // Số lượng thông báo

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Học Conditional Rendering</h1>
            <hr />

            {/* ====================================================
                THỬ NGHIỆM 1: Hiển thị chấm xanh/đỏ dựa trên trạng thái Online
                ==================================================== */}
            <div style={{ marginBottom: "20px" }}>
                <h3>Thử nghiệm 1: Trạng thái tài khoản</h3>
                <p>
                    Tài khoản: 
                    {isOnline ? (
                        <span style={{ color: "green", fontWeight: "bold" }}> 🟢 Đang hoạt động</span>
                    ) : (
                        <span style={{ color: "red", fontWeight: "bold" }}> 🔴 Ngoại tuyến</span>
                    )}
                </p>
            </div>

            {/* ====================================================
                THỬ NGHIỆM 2: Hiện/Ẩn Thanh Menu dựa trên Đăng nhập
                ==================================================== */}
            <div style={{ marginBottom: "20px", padding: "10px", background: "#f0f0f0", borderRadius: "5px" }}>
                <h3>Thử nghiệm 2: Menu Thanh Điều Hướng</h3>
                
                {isLoggedIn ? (
                    <div>
                        <button style={{ marginRight: "10px" }}>Trang cá nhân</button>
                        <button style={{ marginRight: "10px" }}>Đổi đồ (CampusSwap)</button>
                        <button style={{ backgroundColor: "#dc3545", color: "white" }}>Đăng xuất</button>
                    </div>
                ) : (
                    <div>
                        <p style={{ color: "#666" }}>⚠️ Bạn đang duyệt web với tư cách Khách.</p>
                        <button style={{ backgroundColor: "#007bff", color: "white" }}>Đăng nhập ngay</button>
                    </div>
                )}
            </div>

            {/* ====================================================
                THỬ NGHIỆM 3: Hiển thị "Hết hàng" bằng toán tử && và !
                ==================================================== */}
            <div style={{ marginBottom: "20px" }}>
                <h3>Thử nghiệm 3: Trạng thái Kho hàng iPhone 15</h3>
                <p>Số lượng còn lại: {stock} sản phẩm</p>
                
                {/* Cách dùng &&: Nếu stock > 0 THÌ hiện nút mua */}
                {stock > 0 && <button style={{ backgroundColor: "green", color: "white", padding: "5px 15px" }}>Mua ngay</button>}
                
                {/* Cách dùng && hoặc !: Nếu stock bằng 0 THÌ hiện chữ Hết hàng màu đỏ */}
                {stock === 0 && (
                    <span style={{ color: "white", backgroundColor: "red", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold" }}>
                        ❌ HẾT HÀNG
                    </span>
                )}
            </div>

            {/* ====================================================
                BỔ SUNG: Ứng dụng toán tử && làm Badge thông báo xịn sò
                ==================================================== */}
            <div>
                <h3>Ứng dụng thực tế: Badge thông báo</h3>
                <button style={{ position: "relative", padding: "10px 20px", fontSize: "16px" }}>
                    🔔 Hộp thư
                    {/* Chỉ hiển thị vòng tròn đỏ đếm số khi số thông báo lớn hơn 0 */}
                    {notificationCount > 0 && (
                        <span style={{ position: "absolute", top: "-10px", right: "-10px", background: "red", color: "white", borderRadius: "50%", padding: "2px 7px", fontSize: "12px", fontWeight: "bold" }}>
                            {notificationCount}
                        </span>
                    )}
                </button>
            </div>

        </div>
    );
}

export default ConditionalDemo;