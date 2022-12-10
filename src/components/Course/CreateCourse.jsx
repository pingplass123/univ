import React, { useState, useEffect } from "react";
// import "../Course/CourseComponents/";
import Select from "react-select";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

const CreateCourse = () => {
  const navigate = useNavigate();
  //mediaform
  const [videoList, setVideoList] = useState([]);

  //get name
  const getName = localStorage.getItem("user");
  const name = getName.slice(0, 2);
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();

  //state show preview
  const [isShow, setIsShow] = useState(false);

  //state post APi..
  const [title, setTitle] = useState();
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetch("https://univelear.herokuapp.com/api/subcategory")
      .then((res) => res.json())
      .then((json) => {
        const data = [];
        json.data.forEach((element) => {
          data.push({
            label: element.sub_name,
            value: element.id,
          });
        });

        setOptions(data);

        setTimeout(() => {}, 3000);
      });
  }, []);

  const token = localStorage.getItem("token");
  async function CreateCourse(credentials) {
    return fetch("https://univelear.herokuapp.com/api/course/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected) {
      const response = await CreateCourse({
        title,
        body,
        sub_id: selected?.value,
        hastag: [selected?.label],
        image,
        videoList: videoList,
      });
      // RESPONSE SUBMIT
      if (response.success) {
        const { value: accept } = await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Create course successfully.",
        });

        if (accept) {
          localStorage.setItem("course_id", response.data.id);
          navigate(`/Timeline/${selected.label}/Course/${response.data.id}`);
        }
      } else {
        Swal("Failed....", "Please provide complete information", "error");
      }
    }
  };

  // convert file Img to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
    localStorage.setItem("cover_image", base64);
  };

  //handle state show for preview
  const handleOnClick = () => {
    if (image.length !== 0) {
      setIsShow(true);
    } else {
    }
  };

  //remove image
  const removeImage = () => {
    setImage();
  };

  const Create = () => {
    return (
      <>
        {" "}
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4  ">
          <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
            <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center ">
              {/* ----------navigation tab---------- */}
              <span
                style={{ color: "#37a6fb" }}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600 text-blue-500 "
              >
                Create Course
              </span>
              <span className="pl-5">/</span>

              <span className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600 ">
                Previews
              </span>

              {/* ----------Select Category---------- */}
              <br />
              <hr className="mt-4" />
              <Form.Label
                controlId="formBasicTitle"
                style={{ color: "#37a6fb", marginTop: "10px" }}
              >
                Select your hashtag!
              </Form.Label>

              <form onSubmit={handleOnClick}>
                <div>
                  <Select
                    className="basic-single "
                    defaultValue={selected}
                    options={options}
                    onChange={setSelected}
                    placeholder="Select Category..."
                  />
                </div>

                {/* ----------NameCourse---------- */}
                <div className="mt-3 mb-6">
                  <Form.Label style={{ color: "#37a6fb" }}>
                    What's your course title?
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="Enter title"
                    defaultValue={title}
                    type="text"
                    id="default-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* ----------Description ----------*/}
                <div className="mt-3 mb-6">
                  <Form.Label style={{ color: "#37a6fb" }}>
                    What's your course description?
                  </Form.Label>
                  <Form.Control
                    required
                    defaultValue={body}
                    type="text"
                    id="default-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setBody(e.target.value)}
                  />
                </div>

                {/* ----------Lesson-------------- */}
                <Form.Label style={{ color: "#37a6fb" }}>
                  Add your lesson!
                </Form.Label>
                <TodoForm addTodo={addTodo} />
                {/* <TodoList videoList={videoList} deleteTodo={deleteTodo} /> */}
                {videoList.map((items, id) => (
                  <>
                    <div
                      key={id}
                      className="mt-2 flex items-center py-2 px-3 rounded-lg border border-gray-200 "
                    >
                      <div className="border-r-2 flex items-center  space-x-1 sm:pr-4 px-3">
                        <h5>{id + 1}</h5>
                      </div>
                      <div
                        className="d-inline-block border-r-2 flex items-center  space-x-1 sm:pr-4 px-3 text-truncate"
                        style={{ width: "400px" }}
                      >
                        {items.videoname}
                      </div>

                      <div class="d-inline-block text-truncate mx-4 p-2.5 w-full text-sm text-gray-900  ">
                        {items.videolink}
                      </div>

                      <div
                        onClick={() => handleDelete(id)}
                        type="button"
                        className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </>
                ))}

                {/* ----------Imgage Course---------- */}
                <div className="mt-4">
                  <Form.Label style={{ color: "#37a6fb" }}>
                    Select your image course!
                  </Form.Label>
                  {!image && (
                    <div className="mt-2 flex justify-center items-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="mb-3 w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload Image
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 500x373px)
                          </p>
                        </div>
                        <input
                          required
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e)}
                        />
                      </label>
                    </div>
                  )}
                  {image && (
                    <div className="mt-2 flex justify-center items-center w-full">
                      <img
                        className="object-fill h-64 w-full  rounded-lg hover:border-2  border-dashed cursor-pointer "
                        src={image}
                        alt="preview"
                        onClick={removeImage}
                      />
                    </div>
                  )}
                </div>
                {/* ----------Button SubmitForm---------- */}
                <div className="mt-5  grid justify-items-end">
                  <button className="btn btn-primary ml-5">Previews</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };
  //Previews
  const Preview = () => {
    const body_length = body.slice(0, 400) + " ...";
    return (
      <>
        <div
          className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 "
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
            <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
              <div className="text-left" onClick={() => setIsShow(false)}>
                <span className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600 hover:text-blue-500 ">
                  Create Course
                </span>
                <span className="pl-5">/</span>
                <span
                  style={{ color: "#37a6fb" }}
                  className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600  text-blue-500 "
                >
                  Preview
                </span>
              </div>
              <h2
                style={{ color: "#37a6fb" }}
                className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4 "
              >
                Preview
              </h2>

              <div class="card mb-3">
                <img
                  style={{ height: "300px" }}
                  src={image}
                  class="card-img-top"
                  alt="..."
                />

                <div class="card-body bg-slate-100">
                  <div className="grid grid-cols-2 mt-2">
                    <div className="text-gray-600  text-xl font-medium font-bold">
                      {title}
                    </div>
                    <div className="text-gray-600 text-xs place-self-end ">
                      {date}
                    </div>
                  </div>

                  <div>
                    <p className="md:text-clip text-gray-400 text-base  mb-10 ">
                      {body_length}
                    </p>
                  </div>
                  <div className="grid grid-flow-col grid grid-cols-2 mt-20 w-full self-end">
                    <div className="flex items-center w-50 ">
                      <div className="avatar placeholder w-10 h-10 rounded-full mr-5">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-12 uppercase px-2.5 py-2">
                          <span style={{ color: "white" }}>{name}</span>
                        </div>
                      </div>

                      <div className="space-y-1 font-medium dark:text-white">
                        <div className="text-xs font-bold ">{getName}</div>
                        <div className="text-gray-600 text-xs ">{time}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid justify-items-end">
                <div>
                  <button
                    className="btn btn-dark"
                    onClick={() => setIsShow(false)}
                  >
                    EDIT
                  </button>
                  <button
                    className="btn btn-primary ml-3 "
                    onClick={handleSubmit}
                  >
                    POST
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  //Todo lesson
  const TodoForm = ({ addTodo }) => {
    const [input, setInput] = useState("");
    const [url, setUrls] = useState("");

    const changeHandler = (event) => {
      setInput(event.target.value);
    };
    const changeHandler2 = (event) => {
      setUrls(event.target.value);
    };

    const submitHandler = () => {
      if (input.length !== 0 && url.length !== 0) {
        addTodo(input, url);
        setInput("");
      } else {
        Swal(
          "Missing information",
          "Please enter your name and media url ",
          "error"
        );
      }
    };

    return (
      <div className="flex items-center py-2 px-3 rounded-lg border border-gray-200 ">
        <div className="border-r-2 flex items-center  space-x-1 sm:pr-4 ">
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Name
          </label>
        </div>
        <textarea
          id="form__input"
          type="text"
          value={input}
          onChange={changeHandler}
          rows="1"
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Your Name..."
        ></textarea>
        <div
          type="button"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg "
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            ></path>
          </svg>
        </div>
        <textarea
          id="form__input_url"
          type="text"
          // value={url}
          onChange={changeHandler2}
          rows="1"
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Media URL..."
        ></textarea>

        <button
          onClick={submitHandler}
          type="button"
          class="btn btn-dark btn-circle btn-xl"
        >
          ADD
        </button>
      </div>
    );
  };
  const addTodo = (message, url) => {
    setVideoList([...videoList, { videoname: message, videolink: url }]);
  };

  const handleDelete = (id) => {
    setVideoList([...videoList.slice(0, id), ...videoList.slice(id + 1)]);
  };

  return <>{isShow ? Preview() : Create()}</>;
};

export default CreateCourse;
