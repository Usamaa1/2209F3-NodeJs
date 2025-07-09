import { Container, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useRef, useEffect, useState } from 'react';


function CreatePost() {

    const titleFeild = useRef();
    const descriptionFeild = useRef();
    const likesFeild = useRef();


    const postAdd = async (e) => {
        e.preventDefault();
        try {

            const { data } = await axios.post('http://localhost:3000/api/v1/post', {
                title: titleFeild.current.value,
                description: descriptionFeild.current.value,
                likes: likesFeild.current.value,

            },
            )
            console.log(data)

            postGet();

        } catch (e) {
            console.log(e);
        }
    }

    let [postArray, setPostArray] = useState([]);


    const postGet = async (e) => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/post');
            console.log(response);
            const { data } = response;

            setPostArray(data);

            console.log(data)
        } catch (error) {
            console.error(error);
        }
    }


    const postDelete = async (delId)=>{
        try {


            if(confirm("Are you sure to Delete this?")){
                const response = await axios.delete(`http://localhost:3000/api/v1/post/${delId}`);
                console.log(response);
                postGet();
            }

         
         

            
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        postGet();
    },[])





    return <>

        <h1 className="text-center">Add Post</h1>
        <Container>
            <Form onSubmit={(e) => postAdd(e)}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control ref={titleFeild} type="text" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={descriptionFeild} type="text" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Likes</Form.Label>
                    <Form.Control ref={likesFeild} type="text" />
                </Form.Group>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </Form>
        </Container>


        <Container>


            {postArray.map((singlePost) => (

                <Card key={singlePost._id}>
                    <Card.Header as="h5">{singlePost.title}</Card.Header>
                    <Card.Body>
                        <Card.Title>{singlePost.description}</Card.Title>
                        <Card.Text>
                           {singlePost.likes}
                        </Card.Text>
                        <Button variant="danger" onClick={()=>postDelete(singlePost._id)}>Delete</Button>
                    </Card.Body>
                </Card>

            ))}


        </Container>

    </>




}


export default CreatePost;