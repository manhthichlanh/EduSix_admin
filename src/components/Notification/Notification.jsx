import { useEffect, useState } from 'react';
function Notification({ type, title_close, title_continue, autoClose, message, onClose, onContinue, autoCloseTime }) {
    const [isZoomed, setIsZoomed] = useState(true);
    const colors = {
        success: {
            bg: 'bg-green-100',
            bg_icon: 'bg-green-300',
            text: 'text-green-700',

        },
        error: {
            bg: 'bg-red-100',
            bg_icon: 'bg-red-300',
            text: 'text-red-700',

        },
        warning: {
            bg: 'bg-yellow-100',
            bg_icon: 'bg-yellow-300',
            text: 'text-yellow-700',

        },

    };
    const [countdown, setCountdown] = useState(autoClose ? (autoCloseTime ? autoCloseTime : 10) : 0);

    useEffect(() => {
        let timer;
        if (autoClose && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (autoClose && countdown === 0) {
            onClose();
        }
        return () => clearTimeout(timer);
    }, [autoClose, countdown, onClose]);


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setIsZoomed(false);
              observer.disconnect();
            }
          });
        });
        observer.observe(document.querySelector('.zoom-box'));
      }, []);

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className={`inline-block align-middle bg-white rounded-lg zoom-box text-left overflow-hidden shadow-xl  transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full  transition-transform duration-500 ease-in-out transform ${isZoomed && 'scale-[0.3]'}`}>
                    <div className={`${colors[type].bg} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                        <div className="sm:flex sm:items-start">
                            <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${colors[type].bg_icon} sm:mx-0 sm:h-10 sm:w-10`}>
                                {type === 'success' && (
                                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                                {type === 'error' && (
                                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                                {type === 'warning' && (
                                    <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-.01 4h-.01M12 5v.01m6 6v6H6v-6m6-6V5v-.01M12 5v2m0 4h.01m-.01 4h-.01" />
                                    </svg>
                                )}
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className={`text-lg leading-6 font-medium ${colors[type].text} id="modal-title`}>
                                    {type === 'success' && 'Thành công'}
                                    {type === 'error' && 'Thất bại'}
                                    {type === 'warning' && 'Cảnh báo'}
                                </h3>
                                {message && (
                                <div className="mt-2">
                                    <p className={`${colors[type].text}`}>{message}</p>
                                </div>
                              )}
                            </div>
                           
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    
                        {onContinue && (
                            <button onClick={onContinue} type="button" className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}>
                                {title_continue}
                            </button>
                        )}
                        <button onClick={onClose} type="button" className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}>
                            {title_close}
                            {(autoClose) &&  (
                            <strong className='ml-[5px] text-[red]'>{countdown}s</strong>
                            )}
                        </button>

                        {/* {autoClose && (
                            <div className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}>
                                <p>Đóng sau: {countdown} giây</p>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notification;
