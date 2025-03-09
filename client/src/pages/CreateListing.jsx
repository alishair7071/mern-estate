import { useState } from "react";
import { uploadImage } from "../utills/uploadImage";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imagesUrls: [],
  });
  const [uploadImageError, setUploadImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  //upload images by calling a function 'uploadImage' that is in separate file
  const uploadImages = async (files) => {
    let imagesUrlsArrayFromSupabase = [];

    if (files.length > 0 && files.length < 7) {
        setIsLoading(true);
      for (let file of files) {
        const result = await uploadImage(file);
        if (result.error) {
          alert("Upload failed: " + result.error);
          setIsLoading(false);
        setUploadImageError(false);
        } else {
          imagesUrlsArrayFromSupabase.push(result.publicData.publicUrl);
        }
      }
      setFormData({
        ...formData,
        imagesUrls: formData.imagesUrls.concat(imagesUrlsArrayFromSupabase),
      });
      setUploadImageError(false);
      setIsLoading(false);
    } else {
      setUploadImageError("You can only upload 6 images at once");
    }
  };

  //delete images from formData actually this function will delete image from formData,
  //not from supabase

  const deleteImage= (index)=>{

    setFormData({

        ...formData,
        imagesUrls : formData.imagesUrls.filter((url,i)=> i !== index)
  });


  }

  return (
    <main className="mx-auto max-w-3xl p-3">
      <h1 className="text-3xl font-semibold text-center my-6">
        Create a listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="shadow-md bg-white p-2 rounded-lg"
            required
            maxLength={62}
            minLength={10}
            id="name"
          />

          <textarea
            type="text"
            placeholder="Description"
            className="shadow-md bg-white p-2 rounded-lg"
            required
            id="description"
          />

          <input
            type="text"
            placeholder="Address"
            className="shadow-md bg-white p-2 rounded-lg"
            required
            maxLength={62}
            minLength={10}
            id="address"
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedRooms"
                min={1}
                max={10}
                required
                className="shadow-md bg-white rounded-lg p-2"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathRooms"
                min={1}
                max={10}
                required
                className="shadow-md bg-white rounded-lg p-2"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                required
                className="shadow-md bg-white rounded-lg p-2 max-w-20"
              />
              <div className="flex flex-col justify-center items-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                required
                className="shadow-md bg-white rounded-lg p-2 max-w-20"
              />
              <div className="flex flex-col justify-center items-center">
                <p>Discount Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-3">
          <p className="font-semibold">
            Images
            <span className="font-normal ml-2">
              :The first image will be the cover (max 6)
            </span>
          </p>

          <div className="flex gap-3">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              max={6}
              id="images"
              accept="image/*"
              multiple
              className="border border-gray-500 rounded-lg p-2 w-full"
            />

            <button
              onClick={() => uploadImages(files)}
              type="button"
              className="uppercase rounded
             p-3 text-green-500 border border-green-500 hover:shadow-xl"
            >
              {isLoading ? 'uploading...' : 'upload'}
            </button>

          </div>
          <p className="text-red-600">{uploadImageError && uploadImageError}</p>

          {formData.imagesUrls.length > 0 && formData.imagesUrls.map ((url, index)=>(
            <div key={index} className="flex justify-between items-center p-3">
                <img src={url} alt="listing Images" className="w-20 h-20"/>
                <button onClick={()=>deleteImage(index)} type="button" className="text-red-500 uppercase">delete</button>
            </div>
          ))}

          <button
            onClick={print}
            type="button"
            className="uppercase bg-slate-700 text-white shadow-lg rounded-lg p-2"
          >
            Create listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
