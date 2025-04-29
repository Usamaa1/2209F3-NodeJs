
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { useRef } from 'react';


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



        } catch (e) {
            console.log(e);
        }
    }





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

    </>




}


export default CreatePost;