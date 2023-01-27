import './PopupWindow.css';

function PopupWindow({
    className,
    onClose,
    children,
}: {
    className?: string;
    onClose: () => void;
    children: JSX.Element;
}) {
    return (
        <div className="popup">
            <button
                type="button"
                className={`popup-close ${className}`}
                onClick={onClose}
            >
                X
            </button>
            {children}
        </div>
    );
}

PopupWindow.defaultProps = {
    className: '',
};

export default PopupWindow;
