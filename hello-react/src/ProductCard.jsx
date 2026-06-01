function ProductCard() {
    return (
        <div style={{ 
            border: "1px solid #ddd", 
            borderRadius: "8px", 
            padding: "15px", 
            width: "200px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }}>
            <div style={{ width: "100%", height: "120px", background: "#eee", borderRadius: "4px", marginBottom: "10px" }}></div>
            <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>Giáo trình Triết học Mác-Lênin</h3>
            <p style={{ color: "#e44d26", fontWeight: "bold", margin: "0 0 10px 0" }}>0 đ (Tặng lại)</p>
            <button style={{ 
                width: "100%", 
                padding: "8px", 
                background: "#28a745", 
                color: "white", 
                border: "none", 
                borderRadius: "4px",
                cursor: "pointer"
            }}>
                📩 Liên hệ lấy đồ
            </button>
        </div>
    );
}
export default ProductCard;