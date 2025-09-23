import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client";

const AddPlan = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [memberships, setMemberships] = useState([]);
  const [planId, setPlanId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Memberships
  useEffect(() => {
    apiClient.get("/memberships/").then((res) => {
      console.log(res.data);
      setMemberships(res.data);
    });
  }, []);

  // Submit Plan Details
  const handlePlanAdd = async (data) => {
    try {
      const planRes = await authApiClient.post("/plans/", data);
      setPlanId(planRes.data.id);
    } catch (error) {
      console.log("Error adding plan", error);
    }
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  // Handle Image Upload
  const handleUpload = async () => {
    if (!images.length) return alert("Please select images.");
    // [file, file]
    setLoading(true);
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);
        console.log(formData);
        await authApiClient.post(`/plans/${planId}/images/`, formData);
        setLoading(false);
      }
      alert("Images uploaded successfully");
    } catch (error) {
      console.log(("Error uploading image", error));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Plan</h2>
      {!planId ? (
        <form onSubmit={handleSubmit(handlePlanAdd)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Plan Name</label>
            <input
              {...register("name", { required: true })}
              className="input input-bordered w-full"
              placeholder="Plan Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="text"
              {...register("price", {
                required: "This Field is required",
                validate: (value) => {
                  const parsedValue = parseFloat(value);
                  return !isNaN(parsedValue) || "Please enter a valid number!";
                },
              })}
              className="input input-bordered w-full"
              placeholder="Price"
            />
            {errors.price && (
              <p className="text-red-500 text-xs">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">slot left</label>
            <input
              type="number"
              {...register("slot", { required: true })}
              className="input input-bordered w-full"
              placeholder="slot"
            />
            {errors.slot && (
              <p className="text-red-500 text-xs">This field is required</p>
            )}
          </div>

          {/* Dropdown for memberships */}
          <div>
            <label className="block text-sm font-medium">Membership</label>
            <select
              {...register("membership", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select a membership</option>
              {memberships.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.membership && (
              <p className="text-red-500 text-xs">This field is required</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Add Plan
          </button>
        </form>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-2">Upload Plan Images</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />
          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-2">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Preview"
                  className="w-16 h-16 rounded-md object-cover"
                />
              ))}
            </div>
          )}

          <button
            onClick={handleUpload}
            className="btn btn-primary w-full mt-2"
            disabled={loading}
          >
            {loading ? "Uploading images..." : "Upload Images"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPlan;
