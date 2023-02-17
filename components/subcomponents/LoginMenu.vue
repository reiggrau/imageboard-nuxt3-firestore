<script setup>
import add_image_pic from "../../assets/add-image.png";

const props = defineProps({
    userData: {
        type: [Object],
    },
});

// const { registerUser } = useFirebaseAuth(); // auto-imported

const draft = reactive({
    email: "",
    password: "",
});

async function handleRegistration() {
    console.log("handleRegistration() draft :", draft);
    // await registerUser(draft.email, draft.password);
}
</script>

<script>
export default {
    data() {
        return {
            loginMenu: false,
            registrationMenu: false,
            // draft: {
            //     id: "",
            //     username: "",
            //     email: "",
            //     password: "",
            //     picture: add_image_pic,
            //     created_at: "",
            //     file: undefined,
            // },
        };
    },
    methods: {
        toggleLoginMenu() {
            this.loginMenu ? (this.loginMenu = false) : (this.loginMenu = true);
        },

        toggleRegistrationMenu() {
            this.registrationMenu ? (this.registrationMenu = false) : (this.registrationMenu = true);
        },

        logIn() {
            const { email, password } = this.draft;

            if (!email || !password) {
                alert("Incomplete form");
                return;
            }

            const formData = new FormData();

            formData.append("email", email);
            formData.append("password", password);

            fetch("/login", {
                method: "POST",
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data) {
                        // this.user = data;
                        this.draft = {
                            id: "",
                            username: "",
                            email: "",
                            password: "",
                            picture: add_image_pic,
                            created_at: "",
                            file: undefined,
                        };
                    }
                    this.toggleLoginMenu();
                })
                .catch((err) => {
                    console.log("err :", err);
                    alert("Wrong email or password");
                });
        },

        // signIn() {
        //     const { file, username, email, password } = this.draft;

        //     if (!username || !email || !password) {
        //         alert("Incomplete form");
        //         return;
        //     }

        //     const formData = new FormData();

        //     formData.append("file", file);
        //     formData.append("username", username);
        //     formData.append("email", email);
        //     formData.append("password", password);

        //     fetch("/registration", {
        //         method: "POST",
        //         body: formData,
        //     })
        //         .then((res) => {
        //             return res.json();
        //         })
        //         .then((data) => {
        //             if (data) {
        //                 // this.user = data;
        //             }
        //             this.toggleRegistrationMenu();
        //         })
        //         .catch((err) => {
        //             console.log("err :", err);
        //             alert("Email already in use");
        //         });
        // },

        setUserPreview(e) {
            if (e.target.files && e.target.files[0]) {
                this.draft.file = e.target.files[0];

                var reader = new FileReader();

                reader.onload = function (e) {
                    this.draft.picture = e.target.result;
                }.bind(this);

                reader.readAsDataURL(e.target.files[0]);
            }
        },
    },
};
</script>

<template>
    <div>
        <div v-if:="!userData.id" class="logMenu">
            <h3 @click="toggleLoginMenu" class="button">Log in</h3>
            <h3 style="color: grey">/</h3>
            <h3 @click="toggleRegistrationMenu" class="button">Sign up</h3>
        </div>

        <div v-if:="userData.id" class="logMenu">
            <img v-bind:src="userData.picture" id="headerUserPicture" alt="user picture" />
            <h3 class="username">{{ userData.username }}</h3>
            <h3 @click="$emit('logOut')" class="button">Log out</h3>
        </div>

        <!-- LOGIN MENU -->
        <div v-if="loginMenu" id="overlay">
            <div class="menu">
                <h4 @click="toggleLoginMenu" id="xBtn">X</h4>
                <form id="form" action="/login" method="post" enctype="multipart/form-data">
                    <input v-model="draft.email" type="email" name="email" placeholder="Email" required />
                    <input v-model="draft.password" type="password" name="password" placeholder="Password" required />
                    <input type="button" value="Log in" @click="logIn" />
                </form>
            </div>
        </div>

        <!-- REGISTRATION MENU OLD-->
        <!-- <div v-if="registrationMenu" id="overlay">
            <div class="menu">
                <h4 @click="toggleRegistrationMenu" id="xBtn">X</h4>
                <img id="picture" v-bind:src="draft.picture" alt="picture preview" />
                <form id="form" action="/registration" method="post" enctype="multipart/form-data">
                    <input @change="setUserPreview" type="file" name="picture" required />

                    <input v-model="draft.username" type="text" name="username" placeholder="User name" required />
                    <input v-model="draft.email" type="email" name="email" placeholder="FAKE Email" required />
                    <input v-model="draft.password" type="password" name="password" placeholder="FAKE Password" required />
                    <input type="button" value="Sign In" @click="signIn" />
                </form>
            </div>
        </div> -->

        <!-- REGISTRATION MENU NEW-->
        <div v-if="registrationMenu" id="overlay">
            <div class="menu">
                <h4 @click="toggleRegistrationMenu" id="xBtn">X</h4>
                <form id="form" action="/registration" method="post" enctype="multipart/form-data">
                    <input v-model="draft.email" type="email" name="email" placeholder="FAKE Email" required />
                    <input v-model="draft.password" type="password" name="password" placeholder="FAKE Password" required />
                    <input type="button" value="Sign In" @click="handleRegistration()" />
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.logMenu {
    margin: 10px 26px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.username {
    cursor: pointer;
}

.button {
    cursor: pointer;
    color: grey;
}

.button:hover {
    color: black;
}

/* REGISTRATION */
#picture {
    margin: 0 26px;
    width: 252px;
    height: 252px;
    object-fit: cover;
    background-color: silver;
}

#headerUserPicture {
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
}

#form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 0 26px 26px 26px;
}
</style>
