import { createStore } from "vuex";

import users from "./modules/users"
// import plants from "./modules/plants"

export default createStore({
    modules: {
        users,
    }
});