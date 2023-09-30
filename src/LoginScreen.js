import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Form } from 'semantic-ui-react'
import { Container, Col, Row } from 'react-bootstrap';


function LoginScreen() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Retrieve auth status
    const auth = getAuth();

    // Bypass login screen if user logged in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            // User initial sign in
            if (user) {
                navigate('/main');
            }
        })

        return unsubscribe
    }, [auth, navigate])


    // Handle login process
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                //const user = userCredentials.user;
            })
            .catch(error => alert(error.message));
    }


    return (
        <div className='LoginContainer'>
            <Container>
                <Row>
                    <Col>
                        <Form className='LoginFormContainer'>
                            <Form.Field>
                                <label>Email</label>
                                <input 
                                placeholder='Email'
                                type='email'
                                onChange={(event) => setEmail(event.target.value)} 
                                autoComplete='username'
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input 
                                type='password' 
                                placeholder='Password'
                                onChange={(event) => setPassword(event.target.value)} 
                                autoComplete='current-password'
                                />
                            </Form.Field>
                            <Button onClick={handleLogin} type='submit'>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginScreen