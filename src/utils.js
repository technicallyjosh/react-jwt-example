export function checkHttpStatus(response, isLogin) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        return response.json().then(body => {
            if (!isLogin && response.status === 401) {
                location.href = `/?reason=${body.message}`;
            }

            throw body;
        });
    }
}
