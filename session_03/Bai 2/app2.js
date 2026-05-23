// LẤY CÁC PHẦN TỬ DOM CƠ BẢN
const vungDanhSachCv = document.getElementById('vung-danh-sach-cv');
const lblTong = document.getElementById('tong-cv');
const lblXong = document.getElementById('cv-xong');
const lblChuaXong = document.getElementById('cv-chua-xong');

// LUỒNG A: Đọc dữ liệu từ localStorage, nếu không có thì tạo mảng rỗng
let danhSachTask = JSON.parse(localStorage.getItem('data_congviec')) || [];

// LUỒNG A: Thống kê trạng thái trống ban đầu
function updateTaskSummary() {
    lblTong.innerText = danhSachTask.length;
    lblXong.innerText = "0";
    lblChuaXong.innerText = "0";
}

// LUỒNG A: Render dữ liệu mảng ra màn hình dưới dạng Card
function renderTasks() {
    vungDanhSachCv.innerHTML = ""; // Xóa sạch giao diện cũ

    // Nếu mảng chưa có dữ liệu, hiển thị trạng thái rỗng
    if (danhSachTask.length === 0) {
        vungDanhSachCv.innerHTML = `<p style="color:gray; text-align:center;">Danh sách công việc trống.</p>`;
        return;
    }

    // Duyệt mảng để tạo các thẻ div card công việc
    danhSachTask.forEach(function(task, index) {
        const card = document.createElement('div');
        card.className = "card-cong-viec";

        card.innerHTML = `
            <h4>
                <input type="checkbox">
                ${task.tieuDe} [Mức: ${task.uuTien}]
            </h4>
            <p>Mô tả: ${task.moTa}</p>
            <p>Hạn chót: <strong>${task.hanChot}</strong></p>
            <button onclick="suaTask(${index})">Sửa</button>
            <button onclick="xoaTask(${index})">Xóa</button>
        `;
        vungDanhSachCv.appendChild(card);
    });
}

// KHỞI CHẠY KHI MỞ TRANG
renderTasks();
updateTaskSummary();

// LẤY THÊM DOM CHO LUỒNG B
const btnThemCv = document.getElementById('nut-them-cv');
const btnHuyTask = document.getElementById('nut-huy-task');
const popupTask = document.getElementById('popup-task');
const formTask = document.getElementById('form-task');
const lblAlertBox = document.getElementById('alert-box');

const txtTaskIndex = document.getElementById('task-index');
const txtTieuDe = document.getElementById('inp-tieude');
const txtMoTa = document.getElementById('inp-mota');
const txtHan = document.getElementById('inp-han');
const txtUuTien = document.getElementById('inp-uutiendoc');

// Cập nhật hàm thống kê chạy thực tế
function updateTaskSummary() {
    let tong = danhSachTask.length;
    let xong = 0;
    for(let i = 0; i < danhSachTask.length; i++) {
        if(danhSachTask[i].trangThai === true) {
            xong++;
        }
    }
    lblTong.innerText = tong;
    lblXong.innerText = xong;
    lblChuaXong.innerText = tong - xong;
}

// Hàm lưu dữ liệu xuống bộ nhớ máy
function saveTasks() {
    localStorage.setItem('data_congviec', JSON.stringify(danhSachTask));
}

// Bấm nút thêm để mở popup
btnThemCv.addEventListener('click', function() {
    formTask.reset();
    txtTaskIndex.value = ""; // Để trống = Chế độ THÊM MỚI
    document.getElementById('form-title').innerText = "Tạo công việc mới";
    popupTask.classList.remove('hidden');
});

// Bấm nút đóng để ẩn popup
btnHuyTask.addEventListener('click', function() {
    popupTask.classList.add('hidden');
});

// Bắt sự kiện submit form để xử lý Thêm
formTask.addEventListener('submit', function(e) {
    e.preventDefault();

    if (txtTaskIndex.value !== "") return; // Nếu có index thì bỏ qua (để luồng C xử lý)

    // Tạo object công việc từ input
    const taskMoi = {
        tieuDe: txtTieuDe.value.trim(),
        moTa: txtMoTa.value.trim(),
        hanChot: txtHan.value,
        uuTien: txtUuTien.value,
        trangThai: false // Mặc định tạo mới là chưa hoàn thành
    };

    // Thêm object vào mảng
    danhSachTask.push(taskMoi);

    // Lưu localStorage, render lại danh sách và cập nhật thống kê
    saveTasks();
    renderTasks();
    updateTaskSummary();

    // Hiển thị thông báo thành công ngắn
    lblAlertBox.innerText = "Thêm công việc thành công!";
    setTimeout(function() { lblAlertBox.innerText = ""; }, 2000);

    // Đóng form
    popupTask.classList.add('hidden');
});

// Bấm nút sửa của một công việc bất kỳ
window.suaTask = function(index) {
    const taskCu = danhSachTask[index];

    // Đưa dữ liệu cũ lên form
    txtTaskIndex.value = index; // Lưu vị trí index vào ô ẩn để đánh dấu chế độ SỬA
    txtTieuDe.value = taskCu.tieuDe;
    txtMoTa.value = taskCu.moTa;
    txtHan.value = taskCu.hanChot;
    txtUuTien.value = taskCu.uuTien;

    // Đổi tiêu đề form sang trạng thái cập nhật
    document.getElementById('form-title').innerText = "Chỉnh sửa công việc";
    popupTask.classList.remove('hidden'); // Hiện form
}

// Bổ sung xử lý Cập nhật dữ liệu khi Submit form
formTask.addEventListener('submit', function(e) {
    if (txtTaskIndex.value === "") return; // Nếu trống tức là Thêm mới (Luồng B đã lo)

    const viTriSua = txtTaskIndex.value;

    // Tạo object chứa thông tin mới cập nhật
    const taskCapNhat = {
        tieuDe: txtTieuDe.value.trim(),
        moTa: txtMoTa.value.trim(),
        hanChot: txtHan.value,
        uuTien: txtUuTien.value,
        trangThai: danhSachTask[viTriSua].trangThai // Giữ nguyên trạng thái hoàn thành cũ
    };

    // Cập nhật lại vào mảng đúng vị trí
    danhSachTask[viTriSua] = taskCapNhat;

    // Lưu, render và cập nhật thống kê
    saveTasks();
    renderTasks();
    updateTaskSummary();

    lblAlertBox.innerText = "Cập nhật công việc thành công!";
    setTimeout(function() { lblAlertBox.innerText = ""; }, 2000);

    popupTask.classList.add('hidden');
});