function PriceTag({ originalPrice, salePrice }) {
    // Logic tính toán phần trăm giảm giá ngay trong component
    const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

    return (
        <div style={{
            padding: "10px 15px",
            border: "1px dashed #e67e22",
            borderRadius: "6px",
            backgroundColor: "#fff5e6",
            display: "inline-block",
            fontFamily: "Arial, sans-serif"
        }}>
            {/* Hiển thị giá khuyến mãi */}
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "#e74c3c", marginRight: "10px" }}>
                {salePrice.toLocaleString('vi-VN')}đ
            </span>

            {/* Hiển thị giá gốc (gạch ngang) nếu có giảm giá */}
            {originalPrice > salePrice && (
                <>
                    <span style={{ fontSize: "14px", color: "#95a5a6", textDecoration: "line-through", marginRight: "10px" }}>
                        {originalPrice.toLocaleString('vi-VN')}đ
                    </span>
                    <span style={{ fontSize: "12px", backgroundColor: "#e74c3c", color: "#fff", padding: "2px 5px", borderRadius: "4px", fontWeight: "bold" }}>
                        -{discount}%
                    </span>
                </>
            )}
        </div>
    );
}

export default PriceTag;