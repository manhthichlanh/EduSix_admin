<!-- 


// Cấu trúc của thông báo
// Gắn này vào code
const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//Gắn vào trong return
<Notification
type="success" //trạng thái thông báo
message="Nội dung"
onClose={() => setShowSuccessMessage(false)} //đóng thông báo
onContinue={handleContinue} //phần này xử lý cho nút tiếp tục
title_close="nội dung nút đóng"
title_continue="Nội dung nút tiếp tục"
autoClose={true} //bật tự động tắt thông báo, mặc định 10s
autoCloseTime={10} //thời gian thông báo tắt
/>  





-->
