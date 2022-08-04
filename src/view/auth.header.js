export default function authHeader() {
    const funcionario = JSON.parse(localStorage.getItem('funcionario'));
    if (funcionario && funcionario.token) {
    return { Authorization: 'Bearer' + funcionario.token };
    } else {
    return {};
    }
    }