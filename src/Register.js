import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';


const name_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX=/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
const PHN_REGEX=/^(\+\d{1,3}[- ]?)?\d{10}$/;
const API_URL = "https://api.shilpimultiplex.com/api/Auth/";

const Register = () => {
    const nameRef = useRef();
    const errRef = useRef();

    const [name, setname] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setnameFocus] = useState(false);

    const [email,setEmail] = useState('');
    const [validemail, setValidEmail] = useState(false);
    const [EmailFocus, setEmailFocus] = useState(false);

    const [phone,setphone] = useState('');
    const [validphone, setValidphone] = useState(false);
    const [phoneFocus, setphoneFocus] = useState(false);
    
    const [password, setpassword] = useState('');
    const [validpassword, setValidpassword] = useState(false);
    const [passwordFocus, setpasswordFocus] = useState(false);

    const [matchpassword, setMatchpassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(name_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidphone(PHN_REGEX.test(phone));
    }, [phone])

    useEffect(() => {
        setValidpassword(password_REGEX.test(password));
        setValidMatch(password === matchpassword);
    }, [password, matchpassword])

    useEffect(() => {
        setErrMsg('');
    }, [name, password, matchpassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const v1 = name_REGEX.test(name);
        const v2 = password_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            let a={name,phone,email,password}
            const response = await axios.post('https://api.shilpimultiplex.com/api/Auth/CreateUser',a)
            //      JSON.stringify({ name,phone, email,password }),
            //      {
            //          headers: { 'Content-Type': 'application/json' },
            //         withCredentials: true
                    
            //     }
                
            // );
            
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            
            setname('');
            setpassword('');
            setEmail(' ');
            setphone(' ');
            setMatchpassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('namename Taken');
            } else {
                console.log(name);
                console.log(phone);
                console.log(email);
                console.log(password);
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="namename">
                            username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="namename"
                            ref={nameRef}
                            autoComplete="off"
                            onChange={(e) => setname(e.target.value)}
                            value={name}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setnameFocus(true)}
                            onBlur={() => setnameFocus(false)}
                        />
                        <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, phonebers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validpassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validpassword || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setpassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validpassword ? "false" : "true"}
                            aria-describedby="passwordnote"
                            onFocus={() => setpasswordFocus(true)}
                            onBlur={() => setpasswordFocus(false)}
                        />
                        <p id="passwordnote" className={passwordFocus && !validpassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a phoneber and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_password">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchpassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchpassword ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            onChange={(e) => setMatchpassword(e.target.value)}
                            value={matchpassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <label htmlFor="email">Email:
                        <FontAwesomeIcon icon={faCheck} className={validemail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validemail || !email ? "hide" : "invalid"} /></label>
                        <input type="text" 
                            id="email" 
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validemail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}     
                        />
                        <p id="uidnote" className={EmailFocus && email && !validemail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <br />
                            Enter Valid Email id
                        </p>

                          <label htmlFor="phn">phonenumber:
                        <FontAwesomeIcon icon={faCheck} className={validphone ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validphone || !phone ? "hide" : "invalid"} /></label>
                        <input type="text" 
                            id="phone" 
                            autoComplete="off"
                            onChange={(e) => setphone(e.target.value)}
                            value={phone}
                            required
                            aria-invalid={validphone ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setphoneFocus(true)}
                            onBlur={() => setphoneFocus(false)}
                        />
                        <p id="uidnote" className={phoneFocus && phone && !validphone ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <br />
                            Enter 10 digit Valid phoneber
                        </p>
                        

                        <button disabled={!validName||!validemail||!validphone|| !validpassword || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register