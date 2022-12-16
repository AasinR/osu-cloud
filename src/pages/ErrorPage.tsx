function ErrorPage({ message }: { message?: string }) {
    return (
        <div className="page">
            <h1>Error Page</h1>
            <h2>{message}</h2>
        </div>
    );
}

ErrorPage.defaultProps = {
    message: 'Something went wrong',
};

export default ErrorPage;
