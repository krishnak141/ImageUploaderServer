import Axios from 'axios';
import './App.css'
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Jumbotron } from 'react-bootstrap';
import { uuid } from 'uuidv4';
import { baseUrl } from './constants';
function App() {
  const [images, setImages] = useState([])
  useEffect(() => {
    Axios.get(`${baseUrl}/files`)
      .then((res) => {
        setImages(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const renameFile = (originalFile, newName) => {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }
  const uploadFile = (e) => {
    let file = e.target.files && e.target.files[0]
    if (file) {
      let filename = file.name
      filename = uuid() + '.' + filename.split('.').pop()
      let updatedFile = renameFile(file, filename)
      const data = new FormData()
      data.append('imageFile', updatedFile)
      Axios.post(baseUrl, data)
        .then((res) => {
          Axios.post(`${baseUrl}/files`, { title: filename, original_name: file.name })
            .then((res) => {
              setImages([...images, res.data])
              document.getElementById("file").value = "";
              alert("Upload Success")
            })
            .catch((err) => {
              console.log(err)
              document.getElementById("file").value = "";
              alert("Upload Failed")
            })
        })
        .catch((err) => {
          document.getElementById("file").value = "";
          alert("Upload Failed")
        })
    }
  }
  return (
    <Container className="app-container" fluid>
      <Jumbotron fluid className="jumboclass">
          <h3>Gallery</h3>
      </Jumbotron>
      <Row className="justify-content-center">
        <Button variant="outline-primary" className="buttonClass" onClick={e => document.getElementById("file").click()}>Upload</Button>
        <input type="file" style={{ display: "none" }} id="file" onChange={e => uploadFile(e)}></input>
      </Row>
      <Row className="justify-content-center">
        {
          images.slice(0).reverse().map((item, index) =>
            <Card className="col-sm-12 col-md-3 col-lg-3 col-xl-3 mx-3 my-1 align-items-center fill">
              <img variant="top" id={item.original_name} src={`${baseUrl}/images/${item.title}`} className='preview-image' />
              <Card.Body>
                <Card.Title>{item.original_name}</Card.Title>
              </Card.Body>
            </Card>
          )
        }
      </Row>
    </Container>
  );
}
export default App;
