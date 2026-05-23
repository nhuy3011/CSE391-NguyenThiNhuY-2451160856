// LẤY CÁC PHẦN TỬ DOM CƠ BẢN
const danhSachSvBody = document.getElementById('danh-sach-sv');
const lblTongSv = document.getElementById('tong-sv');
const lblDiemTbLop = document.getElementById('diem-tb-lop');

// LUỒNG A: Đọc dữ liệu từ localStorage khi tải trang, nếu chưa có thì gán mảng rỗng
let danhSachSinhVien = JSON.parse(localStorage.getItem('data_sinhvien')) || [];

// LUỒNG A: Thống kê cơ bản
function updateStatistics() {
    lblTongSv.innerText = danhSachSinhVien.length;
    lblDiemTbLop.innerText = "0"; // Luồng B, C tính toán sau
}

// LUỒNG A: Duyệt mảng và render từng sinh viên lên bảng
function renderStudents() {
    danhSachSvBody.innerHTML = ""; // Xóa sạch dữ liệu giao diện cũ

    // Nếu mảng trống, hiển thị dòng thông báo trống
    if (danhSachSinhVien.length === 0) {
        danhSachSvBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Chưa có dữ liệu sinh viên</td></tr>`;
        return;
    }

    // Duyệt mảng bằng forEach để render dữ liệu
    danhSachSinhVien.forEach(function(sv) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sv.ma}</td>
            <td>${sv.ten}</td>
            <td>${sv.ngaySinh}</td>
            <td>${sv.lop}</td>
            <td>${sv.email}</td>
            <td>${sv.diem}</td>
            <td>
                <button>Sửa</button>
                <button>Xóa</button>
            </td>
        `;
        danhSachSvBody.appendChild(row);
    });
}

// KHỞI CHẠY KHI TẢI TRANG
renderStudents();
updateStatistics();