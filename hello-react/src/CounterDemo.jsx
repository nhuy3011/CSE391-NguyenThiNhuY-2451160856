import { useState } from "react";

// ==========================================
// 1. PHẦN CỦA COUNTER TỆ (BIẾN THƯỜNG)
// ==========================================
function BadCounter() {
    let count = 0;  // ❌ Biến bình thường!
    
    function handleClick() {
        count = count + 1;
        console.log("❌ Bad Counter biến thường tăng lên:", count);
    }
    
    return (
        <div style={{ padding: "15px", border: "2px dashed red", marginBottom: "20px" }}>
            <h2>❌ Counter "tệ" (dùng biến thường)</h2>
            <p>Bộ đếm hiện tại: <strong style={{ fontSize: "20px" }}>{count}</strong></p>
            <button onClick={handleClick} style={{ padding: "5px 10px", cursor: "pointer" }}>Tăng (+1)</button>
            <p style={{ color: "red" }}>⚠️ Nhìn F12 thấy biến có tăng, nhưng số ở trên KHÔNG ĐỔI!</p>
        </div>
    );
}

// ==========================================
// 2. PHẦN CỦA COUNTER TỐT (USESTATE)
// ==========================================
function GoodCounter() {
    // ✅ Khai báo biến đặc biệt (State)
    const [count, setCount] = useState(0);  
    
    console.log("🔄 [HÀM GOODCOUNTER ĐANG ĐƯỢC GỌI LẠI ĐỂ VẼ GIAO DIỆN!]");

    function handleClick() {
        setCount(count + 1);  // Báo cho React biết: "Dữ liệu đổi rồi, vẽ lại màn hình đi!"
    }
    
    return (
        <div style={{ padding: "15px", border: "2px solid green" }}>
            <h2>✅ Counter "tốt" (dùng useState)</h2>
            <p>Bộ đếm hiện tại: <strong style={{ fontSize: "20px", color: "green" }}>{count}</strong></p>
            <button onClick={handleClick} style={{ padding: "5px 10px", cursor: "pointer", backgroundColor: "green", color: "white" }}>Tăng (+1)</button>
            <p style={{ color: "green" }}>✅ Số trên màn hình CẬP NHẬT NGAY LẬP TỨC!</p>
        </div>
    );
}

// ==========================================
// 3. HÀM CHÍNH ĐỂ XUẤT BẢN RA MÀN HÌNH
// ==========================================
function CounterDemo() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Thí nghiệm: Biến thường vs State</h1>
            <BadCounter />
            <GoodCounter />
        </div>
    );
}

export default CounterDemo;