import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    Container,
    CssBaseline,
    Grid,
    Link,
    TextField,
    Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./style/cardStyle";
import {AuthService} from "../../../services/services";
import AuthContext from "../AuthContext";


export default function SignUp() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [name, setname] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [error, setError] = useState({});
    const [animate, setAnimate] = useState(0);


    //------hàm sự kiệm lấy dữ liệu------------------
    const changeEmail = (e) => {
        setemail(e.target.value);
    };

    const changeUsername = (e) => {
        setusername(e.target.value);
    };

    const changeName = (e) => {
        setname(e.target.value);
    };

    const changePhone = (e) => {
        setphoneNumber(e.target.value);
    };

    const changePassword = (e) => {
        setpassword(e.target.value);
    };
    //------------------------


    //------hàm kiểm tra SignUP------------------
    const validate = () => {
        let isError = false;
        if (!RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
            setError((prevError) => ({...prevError, email: "Invalid email."}));
            isError = true;
        } else {
            setError((prevError) => ({...prevError, email: ""}));
        }

        if (email === "") {
            setError((prevError) => ({...prevError, email: "Email is required."}));
            isError = true;
        }

        if (name === "") {
            setError((prevError) => ({
                ...prevError,
                name: "Name is required.",
            }));
            isError = true;
        }
        if (name !== "") {
            setError((prevError) => ({
                ...prevError,
                name: "",
            }));
        }
        if (name === "") {
            setError((prevError) => ({
                ...prevError,
                phone: "Phone number is required.",
            }));
            isError = true;
        }
        if (name !== "") {
            setError((prevError) => ({
                ...prevError,
                phone: "",
            }));
        }
        if (username === "") {
            setError((prevError) => ({
                ...prevError,
                username: "Username is required.",
            }));
            isError = true;
        }

        if (username !== "") {
            if (username.length < 6) {
                setError((prevError) => ({
                    ...prevError,
                    username: "Username cant be less than 6 characters.",
                }));
                isError = true;
            } else
                setError((prevError) => ({
                    ...prevError,
                    username: "",
                }));
        }
        if (!RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})").test(password)) {
            setError((prevError) => ({
                ...prevError,
                password:
                    "Password must be six charaters and contain at least lowercase character, uppercase character, numeric character.",
            }));
            isError = true;
        } else {
            setError((prevError) => ({
                ...prevError,
                password: "",
            }));
        }
        if (password === "") {
            setError((prevError) => ({
                ...prevError,
                password: "Password is required.",
            }));
            isError = true;
        }

        return isError;
    };
    //----------------------------------


    //------hàm gọi Sự kiện SignUP------------------

    const signup = (e) => {
        e.preventDefault();
        if (!validate()) {
            SignUp();
        }
    }
    //----------------------------------


    //------hàm gọi SignUP------------------

    async function SignUp() {
        await AuthService.register(username, password, email, name, phoneNumber).then((response) => {
            if (response.status === 200) {
                alert("Signup Success.");
            } else {
                setError((prevError) => ({
                    ...prevError,
                    email: response.data.emailError,
                    username: response.data.usernameError,
                }));
                if (response.data.emailError !== "")
                    alert(response.data.emailError);
                else  alert(response.data.usernameError);
            }
        });;
    }


    const classes = useStyles();

    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }
    const { switchToSignin } = useContext(AuthContext);
    useEffect(() => {
        document.title = "Sign Up";
    }, []);
    return (<>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Card className={classes.cardSignup} animate={animate}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="UserName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="UserName"
                                    label="UserName"
                                    autoFocus
                                    helperText={error.username}
                                    onChange={changeUsername}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    helperText={error.email}
                                    onChange={changeEmail}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    helperText={error.password}
                                    onChange={changePassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="Name"
                                    autoComplete="Name"
                                    helperText={error.name}
                                    onChange={changeName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="PhoneNumber"
                                    autoComplete="Phone Number"
                                    helperText={error.phone}
                                    onChange={changePhone}
                                />
                            </Grid>
                        </Grid>
                        <CardActions className={classes.cardAction}>
                            <Button variant="outlined" className={classes.submit} onClick={(e)=> signup(e) }>
                                Sign up
                            </Button>
                            <Typography className={classes.link} style={{ padding: "0 40px" }}>
                                By signing up, you agree to our Terms, Data Policy and Cookies Policy
                            </Typography>
                        </CardActions>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2"
                                onClick={() => {
                                    switchToSignin();
                                    setAnimate(1);
                                }}>
                                    Already have an account?
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
                <Box mt={5}>
                    <Copyright/>
                </Box>
            </Container>
        </>
    );
}

