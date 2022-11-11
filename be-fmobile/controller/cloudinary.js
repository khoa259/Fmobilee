import cloudinary from "cloudinary";

// config
cloudinary.config({
  cloud_name: "dgo2betkv",
  api_key: "142211326741412",
  api_secret: "P0okXukU74ik0nAZiZhw5up3y5I",
});

export const upload = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.body.image,
    {
      public_id: `${Date.now()}`,
      resource_type: "auto", // jpeg, png
    },
    { folder: "dev-upload" }
  );
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

export const remove = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });
};
