function SimpleVariables() {
    // 1. Biến thông tin cá nhân
    const ten = "Nguyễn Thị Như Ý";
    const tuoi = 20;
    const queQuan = "Hà Nội";

    // 2. Logic xử lý lời chào dựa trên giờ hiện tại của hệ thống
    const gioHienTai = new Date().getHours(); // Lấy ra số giờ (từ 0 đến 23)
    const loiChao = gioHienTai < 12 ? "🌅 Chào buổi sáng!" : (gioHienTai < 18 ? "☀️ Chào buổi chiều!" : "🌙 Chào buổi tối!");

    // 3. Biến tính toán chỉ số BMI cá nhân
    const canNang = 50; // đơn vị: kg
    const chieuCao = 1.58; // đơn vị: mét
    const chiSoBMI = canNang / (chieuCao * chieuCao);

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "20px auto", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            {/* Thử nghiệm 2: Hiện lời chào động */}
            <h2 style={{ color: "#007bff" }}>{loiChao}</h2>
            <hr />

            {/* Thử nghiệm 1: Hiển thị thông tin cá nhân */}
            <h3>Thông tin cá nhân</h3>
            <p><strong>Họ và tên:</strong> {ten}</p>
            <p><strong>Tuổi:</strong> {tuoi} (Sinh năm {new Date().getFullYear() - tuoi})</p>
            <p><strong>Quê quán:</strong> {queQuan}</p>
            <hr />

            {/* Thử nghiệm 3: Tính toán và hiển thị BMI */}
            <h3>Chỉ số sức khỏe (BMI)</h3>
            <p>Cân nặng: {canNang} kg | Chiều cao: {chieuCao} m</p>
            <p><strong>Chỉ số BMI của bạn:</strong> {chiSoBMI.toFixed(2)}</p> 
            {/* .toFixed(2) giúp làm tròn lấy 2 chữ số sau dấu phẩy */}
            
            <p>Trạng thái: <strong>{chiSoBMI < 18.5 ? "Hơi gầy đó nha" : (chiSoBMI < 24.9 ? "Cân đối tuyệt vời!" : "Hơi béo rồi nè")}</strong></p>
        </div>
    );
}

export default SimpleVariables;