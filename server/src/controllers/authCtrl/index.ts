import { register } from "./register";
import { login } from "./login";
import { logout } from "./logout";

const authCtrl = {
	register,
	login,
	logout,
};

export default authCtrl; //index 파일(default)
