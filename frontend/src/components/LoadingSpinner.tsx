const LoadingSpinner = ({ size = 24, colour = "--grey-600" }) => {
    const spinnerStyle = {
        border: '3px solid rgba(0,0,0,0.1)',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        borderLeftColor: `var(${colour})`,
        animation: 'spin 1.2s linear infinite',
    };

    return (
        <div data-testid="loading-spinner" style={spinnerStyle} />
    );
}

export default LoadingSpinner;