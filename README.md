# React + Vite

Mô tả các file 
- src/component: Chứa các component (kit) nhỏ là các thành phần cấu tạo nên 1 trang;
- src/Layout: Chứa các vùng giao diện (ui component) bao quanh <Outlet/> (Phần nội dung chính giữa các trang). Ví dụ như thanh menu (navbar), sidebar, header, footer;
- src/pages: Chứa các trang đã được ghép lại từ những component nhỏ
- src/utils: Chứa các các hàm xử lý thời gian, chuỗi... Sử dụng dụng nhiều lần, nhiều nơi. Api hepers (Liên quan đến gọi API);
- src/store: Nơi chứa các configture các reducer để cung cấp data cho provider (Redux ToolKit) -> Comming soon.
- src/slice: Nơi chứa các slice để xử lý các dispatch các action, async action -> Comming soon.

- Lệnh git cơ bản:

//Cập nhật code mới nhất
git branch develop
git checkout develop
// Trỏ đến nhánh dvevelop
git pull origin develop: lấy source code về;

//Cập nhật code mới nhất

//Trước khi đẩy code lên
git add .
git commit -m "Làm gì thi ghi đó"
git push origin develop: đẩy code lên;

git checkout ngothuyyeah 
git branch ngothuyyeah   
git add .  
git commit -m
git push origin ngothuyyeah
git checkout develop
git merge ngothuyyeah
git push origin develop --force

Lệnh chạy code : npm run dev