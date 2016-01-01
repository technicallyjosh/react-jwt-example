import { getRoles, logout } from './actions';

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

export function stateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        profileImage: state.user.profileImage,
        userName: state.auth.isLoggedIn ? `${state.user.firstName} ${state.user.lastName}` : null
    };
}

export function dispatchToProps(dispatch) {
    return {
        getRoles: () => dispatch(getRoles()).roles,
        isInRole: role => {
            const roles = dispatch(getRoles()).roles;
            return roles.some(r => r === role);
        },
        isInRoles: roles => {
            const userRoles = dispatch(getRoles()).roles;
            return userRoles.some(ur => ur === roles.find(r => r === ur));
        },
        logout: () => dispatch(logout())
    };
}
