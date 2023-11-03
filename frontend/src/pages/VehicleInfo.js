import React, { useState } from "react";
import Main from "../components/Main";
import Form from "../components/Form";
import Input from "../components/Input";
import { vehicleRegister } from "../https/index";
import { uploadMultipleImages } from "../https/imageUpload";
import toast from "react-hot-toast";
import { vehicleInputs } from "../Data";
import { useNavigate } from "react-router-dom";

function numberCheck(value) {
  let contactCheck = /^((0)?)(3)([0-9]{9})$/;
  if (contactCheck.test(value)) {
    return true;
  } else {
    return false;
  }
}

const VehicleInfo = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState({
    model: "",
    price: 0,
    phoneNumber: "",
    pictureCount: null,
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files.length <= vehicleInfo.pictureCount) {
      // If the number of selected images is 10 or fewer, update the state
      setSelectedImages([...selectedImages, ...files]);
    } else {
      // Handle the case when more than 10 images are selected
      setError("Couldnot select more images");
    }
  };

  async function hanldeSubmit(e) {
    e.preventDefault();
    if (!numberCheck(vehicleInfo.phoneNumber)) {
      setError("Incorrect phone numnber format");
    } else {
      setLoading(true);
      try {
        const response = await uploadMultipleImages(
          selectedImages,
          "vehicleImages"
        );
        if (response.length === selectedImages.length) {
          const register = await vehicleRegister({
            vehicleInfo: vehicleInfo,
            images: response,
          });
          toast.success("Vehicle Info added successfullt");
          setVehicleInfo({
            model: "",
            price: null,
            phoneNumber: "",
            pictureCount: null,
          });
          setSelectedImages([]);
          setStep(0);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            localStorage.clear();
            setError("Unauthorized. Redirecting to login in 2 seconds...");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            setError(error.response.data.message);
          }
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }
  }
  function handleInputChange(e) {
    setError(" ");
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const isNumeric = /^\d+$/.test(value);
      if (isNumeric) {
        setVehicleInfo((pre) => {
          return {
            ...pre,
            [name]: value,
          };
        });
      }
    } else {
      setVehicleInfo((pre) => {
        return {
          ...pre,
          [name]: value,
        };
      });
    }
  }
  return (
    <Main>
      {step > 0 ? (
        <Form
          headerText={"Add Vehicle Info"}
          onSubmit={hanldeSubmit}
          loading={loading}
          error={error}
        >
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <div className="flex justify-center items-center gap-2 flex-wrap mt-2">
              {selectedImages.map((image, index) => (
                <img
                  className="h-16 w-16 border border-black"
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Selected Image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {loading ? (
            ""
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                setStep(0);
              }}
              className="w-full bg-blue-600 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
            >
              Back
            </button>
          )}
        </Form>
      ) : (
        <Form
          headerText={"Add Vehicle Info"}
          onSubmit={(e) => {
            e.preventDefault();
            if (vehicleInfo.model.length < 3) {
              setError("Model name must be atleast 3 characters");
            } else {
              if (!numberCheck(vehicleInfo.phoneNumber)) {
                setError("Incorrect phone numnber format");
              } else {
                setError("");
                setStep(1);
              }
            }
          }}
          btnText={"Next"}
          loading={loading}
          error={error}
        >
          {vehicleInputs.map((inputfield, index) => {
            return (
              <Input
                key={index}
                id={inputfield.id}
                type={inputfield.type}
                label={inputfield.label}
                name={inputfield.name}
                value={vehicleInfo[inputfield.name]}
                onChange={handleInputChange}
                placeholder={inputfield.placeholder}
              />
            );
          })}

          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Picture Count
            </label>
            <input
              id="pictureCount"
              type="number"
              name="pictureCount"
              value={vehicleInfo.pictureCount}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              placeholder="Car Pictures count"
              max={10}
              onChange={handleInputChange}
              required
            />
          </div>
        </Form>
      )}
    </Main>
  );
};

export default VehicleInfo;
