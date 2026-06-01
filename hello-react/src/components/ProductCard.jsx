// Nhận vào 3 tham số (Props): name, price, image từ cha truyền xuống
function ProductCard({ name, price, image }) {
    return (
        <div style={{ 
            border: "1px solid #ddd", 
            borderRadius: "8px",
            padding: "15px",
            margin: "10px",
            width: "200px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            textAlign: "center"
        }}>
            <img src={image} alt={name} style={{ width: "100%", borderRadius: "4px" }} />
            <h3 style={{ fontSize: "18px", margin: "10px 0" }}>{name}</h3>
            <p style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "16px" }}>{price} đ</p>
            <button style={{ 
                background: "#3498db", 
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%",
                fontWeight: "bold"
            }}>
                Thêm vào giỏ
            </button>
        </div>
    );
}

export default ProductCard;