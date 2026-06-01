function ListDemo() {
    // --- DỮ LIỆU THỬ NGHIỆM: Danh sách 5 sản phẩm ---
    const products = [
        { id: "sp01", name: "Chuột Gaming Logitech", price: 450000 },
        { id: "sp02", name: "Bàn phím cơ AKKO", price: 1250000 },
        { id: "sp03", name: "Tai nghe Sony WH-1000XM4", price: 4800000 },
        { id: "sp04", name: "Lót chuột cỡ lớn TLU", price: 850000 },
        { id: "sp05", name: "Đèn LED màn hình", price: 1500000 }
    ];

    // --- LOGIC: Tính tổng giá tiền của tất cả sản phẩm ---
    // Dùng hàm .reduce() của JS để cộng dồn giá tiền
    const totalCartPrice = products.reduce((accumulator, currentProduct) => {
        return accumulator + currentProduct.price;
    }, 0);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "500px", margin: "0 auto" }}>
            <h2>🛒 Danh sách sản phẩm (CampusSwap)</h2>
            <hr />

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Dùng .map() để duyệt mảng và trả về cấu trúc JSX */}
                {products.map((product) => (
                    <div 
                        key={product.id} // Thẻ cha ngoài cùng của mỗi phần tử BẮT BUỘC phải có thuộc tính key độc nhất!
                        style={{ 
                            padding: "12px", 
                            border: "1px solid #eee", 
                            borderRadius: "6px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                        }}
                    >
                        {/* Hiển thị tên sản phẩm */}
                        <span style={{ fontWeight: "500" }}>{product.name}</span>
                        
                        {/* Thử nghiệm: Hiển thị giá sản phẩm > 1 triệu (1.000.000đ) màu đỏ bằng toán tử 3 ngôi */}
                        <span style={{ 
                            fontWeight: "bold", 
                            color: product.price > 1000000 ? "#dc3545" : "#28a745" 
                        }}>
                            {product.price.toLocaleString('vi-VN')} đ
                        </span>
                    </div>
                ))}
            </div>

            <hr style={{ marginTop: "20px" }} />
            
            {/* Thử nghiệm: Hiển thị tổng giá tiền */}
            <div style={{ 
                marginTop: "15px", 
                padding: "12px", 
                background: "#e8f4fd", 
                borderRadius: "6px", 
                display: "flex", 
                justifyContent: "space-between",
                fontWeight: "bold"
            }}>
                <span>Tổng giá trị giỏ hàng:</span>
                <span style={{ color: "#0056b3", fontSize: "18px" }}>
                    {totalCartPrice.toLocaleString('vi-VN')} đ
                </span>
            </div>
        </div>
    );
}

export default ListDemo;