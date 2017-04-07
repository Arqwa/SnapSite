SnapAPI.relogin = function () {
    var myself = this;
    return new Promise(function (resolve, reject) {
        if (localStorage['username']) {
            myself.setUser(localStorage['username'], localStorage['password'])
                .then(resolve)
                .catch(reject);
        } else {
            reject();
        }
    });
};

SnapAPI.logout = function () {
    this.clearUser();
    localStorage['username'] = null;
    localStorage['password'] = null;
    location.href = 'index.html';
};

SnapAPI.confirmResetPassword = function (username) {
    confirm(
        'Are you sure you want to reset your password?',
        function (result) {
            SnapAPI.resetPassword(username || SnapAPI.currentUser())
                .then(function () {
                    alert(
                        'An email with a password reset link has been sent to you.<br/>Please check your inbox.',
                        { title: 'Password Reset'}
                    );
                })
                .catch(function (err) {
                    genericError(err.ResultMessage, 'Could not reset password');
                });
        },
        { title: 'Reset Password'}
    );
};
