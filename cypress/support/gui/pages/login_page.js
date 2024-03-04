/// <reference types = 'Cypress'/>

class LoginPageElements{
    login_field = () => {return "[id = user_login]"};
    password_field = () => {return "[id = user_password]"};
    sign_in_button = () => {return "[value = 'Sign in']"};
    failed_login = () => {return "[class= 'flash-alert mb-2'] > span"};
    login_required = () => {return "[id = 'user_login']~[class= 'gl-field-error']"};
    password_required = () => {return "[id = 'user_password']~[class= 'gl-field-error']"};
    user_avatar = () => {return ".qa-user-avatar"};
}

export default LoginPageElements;