export function stateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        profileImage: state.user.profileImage,
        userId: state.auth.isLoggedIn ? state.user.id : null,
        userName: state.auth.isLoggedIn ? `${state.user.firstName} ${state.user.lastName}` : null
    };
}
