import { register } from "./register";
import { login } from "./login";
import { logout } from "./logout";
import { refresh } from "./refresh";

const authCtrl = {
	register,
	login,
	refresh,
	logout,
};

export default authCtrl;
