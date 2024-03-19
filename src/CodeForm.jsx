import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Form.css'; // Your custom CSS for styling

const CodeForm = () => {
    const [username, setUsername] = useState('');
    const [language, setLanguage] = useState('C++');
    const [stdin, setStdin] = useState('');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Get the current timestamp
        const timestamp = new Date().toISOString();

        try {
            // Make a POST request to submit the code along with output and timestamp
            const requestBody = {
                username:username,
                language:language,
                stdin:stdin,
                code:code,
                stdout:output,
                timestamp:timestamp
            };
            console.log(requestBody);
            const response = await axios.post('https://tuf-task-backend.onrender.com/submit', requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200 || response.status === 201) {
                console.log('Code submitted successfully');
                alert('Code submitted successfully pls wait some time for it to reflect in histoy window');
                // Handle successful submission (if needed)
            } else {
                alert('Failed to submit code');
                console.error('Failed to submit code');
                // Handle failed submission (if needed)
            }
        
    
            // Handle success response
            console.log(response.data);
            // You can perform any additional actions based on the response if needed
        } catch (error) {
            // Handle error response
            alert('Error submitting code pls provide all the fields');
            console.error('Error submitting code:', error);
            // You can display an error message to the user or perform any other error handling
        }
    };
    


    const handleRun = async (e) => {
        e.preventDefault();
        setLoading(true);
        const encodedCode = btoa(code);
        const encodedInput = btoa(stdin);
        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
              base64_encoded: 'true',
              fields: '*'
            },
            headers: {
              'content-type': 'application/json',
              'Content-Type': 'application/json',
            //   'X-RapidAPI-Key': '27d422e36emsh30afd854392ea10p106f90jsn5403683beaf1',
            //   'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            'X-RapidAPI-Key': '94c9ad7b6amsh6bda81b69b58d25p126c9djsn3c9322c58994',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            data: JSON.stringify({
                source_code: encodedCode,
                language_id: getLanguageId(language),
                stdin: encodedInput
            })
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              
                   await checkSubmissionStatus(response.data.token);
                    console.log("done");
               
          } catch (error) {
              console.error(error);
              setLoading(false);
          }
    };


   
    const checkSubmissionStatus = async (token) => {
        const makeurl='https://judge0-ce.p.rapidapi.com/submissions/'+token;
        const options = {
            method: 'GET',
            url: makeurl,
            params: {
              base64_encoded: 'true'
            },
            headers: {
            //   'X-RapidAPI-Key': '27d422e36emsh30afd854392ea10p106f90jsn5403683beaf1',
            //   'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                 'X-RapidAPI-Key': '94c9ad7b6amsh6bda81b69b58d25p126c9djsn3c9322c58994',
                 'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              if(response.data.status.id==3)
              {
                setOutput(atob(response.data.stdout));
                
                setLoading(false);
              }
            else if(response.data.status.id==6)
             {
                   setOutput(response.data.status.description);
                   
                   setLoading(false);
             }
            else if(response.data.status.id==4)
            {

              setOutput(response.data.compile_output);
              
              setLoading(false);
            }
            else if(response.data.status.id==2)
            {    setTimeout(async () => {
                    try {
                        let outp = await checkSubmissionStatus(token);
                        console.log(outp);
                    } catch (error) {
                        console.error(error);
                    setLoading(false);
                    }
                }, 6000);
            }
                else
                {
                    setOutput('Error executing code. Please try again later.');
                    
                    setLoading(false);
                }
          } catch (error) {
              console.error(error);
          }
    };
    const getLanguageId = (lang) => {
        switch (lang) {
            case 'C++': return 54;
            case 'Java': return 62;
            case 'JavaScript': return 63;
            case 'Python': return 71;
            default: return 0;
        }
    };

    return (
        <>
        {loading && 
            <div id="loader">
                <h1>Your code is running...</h1>
                <h1>NEVER GIVE UP, like a striver...</h1>
                <h1>Channeling your inner striver..</h1>
                <h1>Coding with striver spirit..</h1>
                <h1>Embracing the striver mindset...</h1>
                <h1>GENIUS! like a striver...</h1>
                <h1>Transforming into a coding striver...</h1>
            </div>
        }
        <div className="container">
        <Form onSubmit={handleSubmit}>
            
            {!loading &&
            <>
            <Form.Group as={Row} controlId="formUsername">
                <Form.Label column sm={2}>Username</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Col>
            </Form.Group>
                
            <Form.Group as={Row} controlId="formLanguage">
                <Form.Label column sm={2}>Language</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        as="select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option>C++</option>
                        <option>Java</option>
                        <option>JavaScript</option>
                        <option>Python</option>
                    </Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formStdin">
                <Form.Label column sm={2}>Standard Input (stdin)</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter standard input"
                        value={stdin}
                        onChange={(e) => setStdin(e.target.value)}
                        className="dark-theme"
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCode">
                <Form.Label column sm={2}>Source Code</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        placeholder="Enter source code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="dark-theme"
                    />
                </Col>
            </Form.Group>

            <Button variant="success" onClick={handleRun}>Run</Button>
</>
}
            {output && (
                <div>
                    <Form.Group as={Row} controlId="formOutput">
                        <Form.Label column sm={2}>Output</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={output}
                                readOnly
                                className="dark-theme"
                            />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </div>
            )}
            
            {!loading && <p>
                <h2>Just a note!</h2>
                Firstly, the redis server will get updated every 1 minute so the code you submit will reflect in the history window after 1 minute.
                <br />
                I could've done a lot more modifications like improving the UI and many more features like Google login and storing personal codes but I have kept it simple for the purpose of this project as I'm not sure whether those extra work is supposed to be done or not.
                <br/> 
                <br/>
                I'm really grateful for what TakeUforward is doing for the student community and will love to be a part of it. 
                <br/>
                <br/>
                <Button variant="primary" href="https://github.com/7twik">Github</Button> 
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button variant="primary" href="https://www.linkedin.com/in/sattwik-das-90aa75249/">LinkedIn</Button> 
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button variant="primary" href="https://leetcode.com/user1896js/">Leetcode</Button>
            </p>}
        </Form>
    </div>
    </>
    );
};

export default CodeForm;
