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

// LẤY THÊM CÁC DOM PHỤC VỤ LUỒNG B
const nutMoForm = document.getElementById('nut-mo-form');
const nutDongForm = document.getElementById('nut-dong-form');
const popupForm = document.getElementById('popup-form');
const formSinhVien = document.getElementById('form-sinh-vien');
const lblThongBao = document.getElementById('thong-bao');

const txtTrangThai = document.getElementById('form-trang-thai');
const txtMa = document.getElementById('inp-ma');
const txtTen = document.getElementById('inp-ten');
const txtNgaySinh = document.getElementById('inp-ngaysinh');
const txtLop = document.getElementById('inp-lop');
const txtEmail = document.getElementById('inp-email');
const txtDiem = document.getElementById('inp-diem');

// Cập nhật lại hàm thống kê (Tính tổng và điểm trung bình thật)
function updateStatistics() {
    lblTongSv.innerText = danhSachSinhVien.length;
    if (danhSachSinhVien.length === 0) {
        lblDiemTbLop.innerText = "0";
        return;
    }
    let tongDiem = 0;
    for (let i = 0; i < danhSachSinhVien.length; i++) {
        tongDiem += parseFloat(danhSachSinhVien[i].diem);
    }
    lblDiemTbLop.innerText = (tongDiem / danhSachSinhVien.length).toFixed(1);
}

// Hàm lưu mảng xuống localStorage
function saveStudents() {
    localStorage.setItem('data_sinhvien', JSON.stringify(danhSachSinhVien));
}

// Bấm nút thêm để mở popup
nutMoForm.addEventListener('click', function() {
    formSinhVien.reset(); // Xóa sạch dữ liệu cũ trong form
    txtTrangThai.value = ""; // Để trống nghĩa là chế độ THÊM MỚI
    txtMa.disabled = false;
    document.getElementById('tieude-form').innerText = "Thêm sinh viên mới";
    popupForm.classList.remove('hidden');
});

// Bấm nút Đóng/Hủy để ẩn popup
nutDongForm.addEventListener('click', function() {
    popupForm.classList.add('hidden');
});

// Bắt sự kiện submit của form để thêm mới
formSinhVien.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn form làm tải lại trang

    // Chỉ thực hiện Thêm Mới nếu ô trạng thái đang rỗng
    if (txtTrangThai.value !== "") return; 

    // Bấm lưu để lấy dữ liệu từ các input và Tạo object sinh viên
    const sinhVienMoi = {
        ma: txtMa.value.trim(),
        ten: txtTen.value.trim(),
        ngaySinh: txtNgaySinh.value,
        lop: txtLop.value.trim(),
        email: txtEmail.value.trim(),
        diem: txtDiem.value
    };

    // Kiểm tra trùng mã sinh viên cơ bản
    let biTrung = false;
    for(let i = 0; i < danhSachSinhVien.length; i++) {
        if(danhSachSinhVien[i].ma === sinhVienMoi.ma) {
            biTrung = true;
            break;
        }
    }
    if (biTrung) { alert("Mã sinh viên này đã tồn tại!"); return; }

    // Thêm object vào mảng
    danhSachSinhVien.push(sinhVienMoi);

    // Lưu mảng xuống localStorage
    saveStudents();

    // Render lại bảng & Cập nhật khu vực thống kê
    renderStudents();
    updateStatistics();

    // Hiển thị thông báo
    lblThongBao.innerText = "Thêm sinh viên thành công!";
    setTimeout(function() { lblThongBao.innerText = ""; }, 2000);

    // Đóng popup
    popupForm.classList.add('hidden');
});